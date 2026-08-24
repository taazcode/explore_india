import React from 'react';
import { Sparkles, Map, MessageCircle, Heart, ArrowRight } from 'lucide-react';
import { useLanguage } from './components/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <main className="content">
      <section
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: '55px 34px 80px',
          color: '#4a2b20',
        }}
      >
        {/* Hero */}
        <div
          style={{
            textAlign: 'center',
            padding: '45px 30px',
            border: '1px solid #ead7c1',
            borderRadius: 28,
            background: 'linear-gradient(135deg, #fff8ec, #f8ead5)',
          }}
        >
          <span className="eyebrow">{t("ABOUT BHARAT CONNECT")}</span>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 6vw, 64px)',
              lineHeight: 1.05,
              margin: '14px 0',
              color: '#43271e',
            }}
          >
            {t("Connecting India,")}
            <br />
            <span style={{ color: '#c95b25' }}>{t("One Culture at a Time")}</span>
          </h1>

          <p
            style={{
              maxWidth: 760,
              margin: '0 auto',
              fontSize: 17,
              lineHeight: 1.8,
              color: '#76594c',
            }}
          >
            {t("Bharat Connect is our vision for a smarter and more engaging way to discover India.")}
          </p>
        </div>

        {/* Prototype message */}
        <div
          style={{
            marginTop: 28,
            padding: '32px',
            borderRadius: 22,
            border: '1px solid #ead7c1',
            background: '#fffaf2',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              color: '#c95b25',
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            <Sparkles size={20} />
            {t("OUR HACKATHON PROTOTYPE")}
          </div>

          <p
            style={{
              fontSize: 17,
              lineHeight: 1.8,
              margin: 0,
              color: '#5f4539',
            }}
          >
            {t("Built as a hackathon prototype, Bharat Connect is our vision for a smarter and more engaging way to discover India.")}
          </p>

          <p
            style={{
              fontSize: 17,
              lineHeight: 1.8,
              margin: '14px 0 0',
              color: '#5f4539',
            }}
          >
            {t("We are continuously developing the platform — expanding state coverage, improving our AI cultural guides, adding richer cultural experiences, and making travel planning more useful.")}
          </p>

          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 22,
              margin: '22px 0 0',
              color: '#43271e',
            }}
          >
            {t("This is only the beginning of our journey.")} 🇮🇳
          </p>
        </div>

        {/* What Bharat Connect does */}
        <div style={{ marginTop: 42 }}>
          <div style={{ textAlign: 'center', marginBottom: 25 }}>
            <span className="eyebrow">{t("OUR VISION")}</span>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 36,
                margin: '10px 0',
                color: '#43271e',
              }}
            >
              {t("Explore. Learn. Connect.")}
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 18,
            }}
          >
            <article
              style={{
                padding: 24,
                borderRadius: 20,
                background: '#f5dfc5',
                border: '1px solid #ead7c1',
              }}
            >
              <Map size={30} color="#c95b25" />

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 21,
                  margin: '15px 0 8px',
                }}
              >
                {t("Discover India")}
              </h3>

              <p style={{ lineHeight: 1.6, color: '#76594c' }}>
                {t("Explore India’s states, destinations, traditions, food, festivals and stories.")}
              </p>
            </article>

            <article
              style={{
                padding: 24,
                borderRadius: 20,
                background: '#e5efd9',
                border: '1px solid #d1dfc2',
              }}
            >
              <MessageCircle size={30} color="#55783b" />

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 21,
                  margin: '15px 0 8px',
                }}
              >
                {t("Meet Your Guide")}
              </h3>

              <p style={{ lineHeight: 1.6, color: '#76594c' }}>
                {t("Chat with regional AI guides and learn about the culture of each destination.")}
              </p>
            </article>

            <article
              style={{
                padding: 24,
                borderRadius: 20,
                background: '#e8dcef',
                border: '1px solid #dacbe5',
              }}
            >
              <Heart size={30} color="#76508b" />

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 21,
                  margin: '15px 0 8px',
                }}
              >
                {t("Connect With Culture")}
              </h3>

              <p style={{ lineHeight: 1.6, color: '#76594c' }}>
                {t("Experience India through local languages, traditions, stories and regional perspectives.")}
              </p>
            </article>
          </div>
        </div>

        {/* Closing */}
        <div
          style={{
            marginTop: 42,
            textAlign: 'center',
            padding: '30px',
            borderTop: '1px solid #ead7c1',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 25,
              color: '#43271e',
              margin: '0 0 15px',
            }}
          >
            {t("India has thousands of stories.")}
          </p>

          <p style={{ color: '#76594c', marginBottom: 20 }}>
            {t("Bharat Connect is our attempt to help people discover them.")}
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              border: 'none',
              background: '#c95b25',
              color: '#fff',
              borderRadius: 999,
              padding: '12px 20px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            {t("Explore Bharat Connect")}
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </main>
  );
}