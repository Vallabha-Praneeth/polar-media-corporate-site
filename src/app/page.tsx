import Image from "next/image";
import Link from "next/link";

import { ContactPanel } from "@/components/contact-panel";
import { HomeHeroGallery } from "@/components/home-hero-gallery";
import { HomeHeroThreads } from "@/components/home-hero-threads";
import { company, serviceSlug } from "@/config/company";

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <HomeHeroThreads />
        <div className="container home-hero__grid">
          <div className="home-hero__content">
            <p className="eyebrow">Media, made considered</p>
            <h1>Clear thinking.<br /><span>Purposeful media.</span></h1>
            <p className="home-hero__lede">{company.heroLede}</p>
            <div className="button-row">
              <Link className="button" href="/contact">Talk to us <span aria-hidden="true">→</span></Link>
              <Link className="text-link" href="/about">Discover our company <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <aside className="hero-composition" aria-label="Work in physical media">
            <HomeHeroGallery />
            <div className="hero-card">
              <div className="hero-card__top">
                <span>Registered identity</span>
                <span className="hero-signal"><i aria-hidden="true" /> Registered company</span>
              </div>
              <div className="hero-card__brand">
                <Image
                  className="hero-logo"
                  src={company.logo.mark}
                  alt=""
                  width={354}
                  height={290}
                  priority
                />
                <div>
                  <strong>{company.brandName}</strong>
                  <small>{company.legalName}</small>
                </div>
              </div>
              <dl className="hero-card__data">
                <div><dt>Incorporated</dt><dd>{company.country}</dd></div>
                <div><dt>State</dt><dd>{company.state}</dd></div>
                <div><dt>CIN</dt><dd>{company.cin}</dd></div>
              </dl>
              <p className="hero-card__note">Company details sourced from reviewed government records</p>
            </div>
            <div className="hero-index">01 / Corporate profile</div>
          </aside>
        </div>
        <div className="container hero-footnote">
          <span>Media, technology and production</span>
          <span aria-hidden="true">↘</span>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container intro-grid">
          <p className="eyebrow">Who we are</p>
          <div>
            <h2>A company built around thoughtful communication.</h2>
            <p className="large-copy">
              {company.introCopy}
            </p>
            <div className="legal-note">
              <span className="legal-note__mark" aria-hidden="true">i</span>
              <p><strong>Clear by design.</strong> The Polar Media is the public-facing brand of {company.legalName}, a company incorporated in {company.country}.</p>
            </div>
            <Link className="text-link" href="/about">About the company <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="section section--mist">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Our services</p>
              <h2>What we do</h2>
            </div>
            <p>Digital, out-of-home, display, analytics, music and AI-enabled advertising capabilities.</p>
          </div>
          <div className="service-grid">
            {company.services.map((service, index) => (
              <article className="service-card" key={service.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>
                  <Link href={`/services#${serviceSlug(service.title)}`}>{service.title}</Link>
                </h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section values-section">
        <div className="container values-grid">
          <div className="values-heading">
            <p className="eyebrow eyebrow--light">Our approach</p>
            <h2>Credibility begins with clarity.</h2>
          </div>
          <div className="value-list">
            <article><span>01</span><div><h3>Factual</h3><p>Company information is presented plainly, with no invented claims or credentials.</p></div></article>
            <article><span>02</span><div><h3>Accessible</h3><p>Clear language, strong contrast, and considered navigation for every visitor.</p></div></article>
            <article><span>03</span><div><h3>Responsible</h3><p>Privacy-conscious by default, with no advertising trackers or data-collection forms.</p></div></article>
          </div>
        </div>
      </section>

      <ContactPanel />
    </>
  );
}
