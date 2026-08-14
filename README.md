# The Polar Media corporate website

Production corporate website for **The Polar Media**, operated by **POLAR MEDIA PRIVATE LIMITED**. Built with Next.js App Router, TypeScript, and Tailwind CSS for deployment on Vercel.

## Before production launch

Create and test the company-controlled `info@thepolarmedia.com` mailbox or group, provide an approved public telephone number in `+91` format, and obtain qualified legal review of the Privacy Policy and Terms of Use.

The legal name, CIN, GSTIN, registered-office address, state, and country in `src/config/company.ts` were cross-checked against the Certificate of Incorporation and GST REG-06. No private source documents are stored in this repository.

## Local development

Requires a current Node.js LTS release.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run test
npm run lint
npm run typecheck
npm run build
```

## Deploy to Vercel

1. Import the GitHub repository into Vercel.
2. Keep the detected framework preset as **Next.js**.
3. Leave `CONTACT_FORM_ENABLED` missing or set to `false` for Development and Preview.
4. Deploy and review the Vercel preview URL.
5. Confirm the public mailbox, public-telephone decision, and legal review before assigning the production domain.
6. Add `thepolarmedia.com` and, if desired, `www.thepolarmedia.com` under **Project Settings → Domains**.
7. Configure only the A or CNAME records Vercel currently instructs you to add. Vercel will show the exact records for the domain.

## DNS safety for Google Workspace

The domain uses Google Workspace for email. When connecting the website to Vercel:

- Change only website-related A, AAAA, ALIAS/ANAME, or CNAME records explicitly requested by Vercel.
- **Do not delete, replace, or overwrite any MX, SPF, DKIM, DMARC, Google verification, or other email-related DNS records.**
- In particular, preserve MX records that route mail to Google, SPF TXT records, DKIM TXT records (often under a selector such as `google._domainkey`), and the `_dmarc` TXT record.
- Take a complete DNS-zone export or screenshot before making changes.
- After DNS changes, confirm both the website and inbound/outbound Google Workspace email still work.

DNS values can change, so copy the current A/CNAME values from the Vercel domain screen at deployment time rather than hard-coding values from an old guide.

## Architecture

- `src/config/company.ts`: single typed source for public company information
- `src/config/contact-form.ts`: client-safe form length limits only; no delivery configuration
- `src/lib/contact-form.ts`: server-side validation and Resend delivery helper
- `src/app/api/contact/route.ts`: server-only contact endpoint
- `src/app`: pages, metadata, route handlers, robots, and sitemap
- `src/components`: shared site chrome and interface elements
- `docs/meta-business-verification-checklist.md`: launch and Meta verification checklist

The website has no database, authentication, analytics, advertising trackers, third-party fonts, or remote images. The intended `info@thepolarmedia.com` address is displayed as plain text while mailbox activation is pending; no `mailto:` fallback is active. The contact form and API route are present but remain disabled unless the server receives a valid, complete configuration.

## Contact form and deferred Resend activation

The contact form is disabled by default. No Resend account credentials, recipient address, or DNS values are stored in the repository. `.env.example` contains empty server-only placeholders.

Production activation requires all four server-side variables:

```text
RESEND_API_KEY
RESEND_FROM_EMAIL
CONTACT_TO_EMAIL
CONTACT_FORM_ENABLED=true
```

Do not prefix these values with `NEXT_PUBLIC_`. Until the mailbox, recipient workflow, Resend sending domain, and privacy settings are approved and tested, keep `CONTACT_FORM_ENABLED=false`. Before enabling publicly:

1. Create and test `info@thepolarmedia.com` for inbound and outbound mail.
2. Verify the approved Resend sending subdomain without disturbing Google Workspace records.
3. Disable Resend open and click tracking for the sending domain.
4. Add rate limiting or an equivalent abuse-control layer appropriate to the deployment.
5. Configure Production-only environment variables and redeploy because the contact page is statically generated.
6. Complete one controlled delivery test and re-check the Privacy Policy before public activation.
