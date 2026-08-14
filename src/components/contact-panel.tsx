import Link from "next/link";

export function ContactPanel() {
  return (
    <section className="contact-panel">
      <div className="container contact-panel__inner">
        <div>
          <p className="eyebrow eyebrow--light">Start a conversation</p>
          <h2>Let’s discuss your enquiry.</h2>
        </div>
        <div className="contact-panel__action">
          <p>For company and service enquiries, contact our team directly.</p>
          <div className="button-row">
            <Link className="button button--light" href="/contact">
              Contact us <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
