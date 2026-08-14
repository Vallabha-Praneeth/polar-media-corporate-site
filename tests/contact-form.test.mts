import assert from "node:assert/strict";
import test from "node:test";

import {
  handleContactRequest,
  type ContactConfig,
  type ContactSender,
} from "../src/lib/contact-form.ts";
import { CONTACT_LIMITS } from "../src/config/contact-form.ts";

const enabledConfig: ContactConfig = {
  enabled: true,
  apiKey: "re_test_key",
  fromEmail: "Polar Media Website <website@notifications.thepolarmedia.com>",
  toEmail: "receiver@example.test",
};

function makeRequest(body: unknown, origin = "https://thepolarmedia.com"): Request {
  return new Request("https://thepolarmedia.com/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: origin,
    },
    body: JSON.stringify(body),
  });
}

const validBody = {
  name: "Asha Kumar",
  email: "asha@example.test",
  subject: "Campaign planning",
  message: "Please contact me about a campaign for our new product.",
  website: "",
};

test("a valid submission is sent without exposing the receiving address", async () => {
  let sendCount = 0;
  const sender: ContactSender = async (config, submission) => {
    sendCount += 1;
    assert.equal(config.toEmail, enabledConfig.toEmail);
    assert.equal(submission.email, validBody.email);
    return true;
  };

  const response = await handleContactRequest(
    makeRequest(validBody),
    enabledConfig,
    sender,
  );
  const responseText = await response.text();

  assert.equal(response.status, 200);
  assert.equal(sendCount, 1);
  assert.doesNotMatch(responseText, /receiver@example\.test/u);
  assert.deepEqual(JSON.parse(responseText), {
    ok: true,
    message: "Thanks. Your message has been sent.",
  });
});

test("validation rejects malformed, oversized, unexpected, and cross-origin input", async (t) => {
  const sender: ContactSender = async () => {
    assert.fail("invalid input must not be sent");
  };

  const cases: Array<[string, unknown, string?]> = [
    ["malformed email", { ...validBody, email: "not-an-email" }],
    ["oversized name", { ...validBody, name: "x".repeat(CONTACT_LIMITS.name + 1) }],
    ["short message", { ...validBody, message: "too short" }],
    ["unexpected field", { ...validBody, recipient: "somebody@example.test" }],
    ["cross-origin request", validBody, "https://attacker.example"],
    ["UTF-8 byte limit", { ...validBody, message: "ह".repeat(4000) }],
  ];

  for (const [name, body, origin] of cases) {
    await t.test(name, async () => {
      const response = await handleContactRequest(
        makeRequest(body, origin),
        enabledConfig,
        sender,
      );
      assert.equal(response.status, 400);
      assert.deepEqual(await response.json(), {
        ok: false,
        message: "Please check your details and try again.",
      });
    });
  }
});

test("requests require JSON and a same-origin Origin header", async (t) => {
  const sender: ContactSender = async () => {
    assert.fail("an invalid request must not be sent");
  };

  await t.test("wrong content type", async () => {
    const response = await handleContactRequest(
      new Request("https://thepolarmedia.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
          Origin: "https://thepolarmedia.com",
        },
        body: JSON.stringify(validBody),
      }),
      enabledConfig,
      sender,
    );
    assert.equal(response.status, 400);
  });

  await t.test("missing origin", async () => {
    const response = await handleContactRequest(
      new Request("https://thepolarmedia.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validBody),
      }),
      enabledConfig,
      sender,
    );
    assert.equal(response.status, 400);
  });
});

test("the honeypot returns generic success without sending", async () => {
  let sendCount = 0;
  const response = await handleContactRequest(
    makeRequest({ ...validBody, website: "https://spam.example" }),
    enabledConfig,
    async () => {
      sendCount += 1;
      return true;
    },
  );

  assert.equal(response.status, 200);
  assert.equal(sendCount, 0);
});

test("provider failures and exceptions return the same generic response", async (t) => {
  for (const [name, sender] of [
    ["provider rejection", async () => false],
    ["provider exception", async () => Promise.reject(new Error("provider detail"))],
  ] satisfies Array<[string, ContactSender]>) {
    await t.test(name, async () => {
      const response = await handleContactRequest(
        makeRequest(validBody),
        enabledConfig,
        sender,
      );
      assert.equal(response.status, 503);
      assert.deepEqual(await response.json(), {
        ok: false,
        message: "We couldn't send your message right now. Please try again later.",
      });
    });
  }
});

test("the form is disabled by default when configuration is absent", async () => {
  const response = await handleContactRequest(
    makeRequest(validBody),
    {
      enabled: false,
      apiKey: "",
      fromEmail: "",
      toEmail: "",
    },
    async () => {
      assert.fail("disabled configuration must stop before delivery");
    },
  );

  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), {
    ok: false,
    message: "We couldn't send your message right now. Please try again later.",
  });
});

test("the unpublished corporate inbox cannot be configured as the sender", async () => {
  const response = await handleContactRequest(makeRequest(validBody), {
    ...enabledConfig,
    fromEmail: "Polar Media Website <info@thepolarmedia.com>",
  });

  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), {
    ok: false,
    message: "We couldn't send your message right now. Please try again later.",
  });
});

test("Resend's controlled-test sender is accepted without exposing configuration", async () => {
  const response = await handleContactRequest(
    makeRequest(validBody),
    {
      ...enabledConfig,
      fromEmail: "onboarding@resend.dev",
    },
    async () => true,
  );

  assert.equal(response.status, 200);
  assert.doesNotMatch(await response.text(), /onboarding@resend\.dev/u);
});
