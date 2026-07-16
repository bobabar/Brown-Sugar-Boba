import { useEffect, useState } from 'react'

const products = [
  {
    name: 'Apply to China',
    description: 'A clearer path through university applications in China.',
    status: 'Coming soon',
    icon: 'graduation',
  },
  {
    name: 'China City Maps',
    description:
      'Explore where to live and stay with neighborhood context for housing, transit, parks, work, and schools.',
    label: 'Visit chinacitymaps.com',
    href: 'https://chinacitymaps.com',
    icon: 'pin',
  },
  {
    name: 'Mandarin Trainer',
    description:
      'Adaptive Mandarin practice for vocabulary, grammar, pronunciation, HSK exams, geography, and sentence building.',
    label: 'Visit mandarintrainer.com',
    href: 'https://mandarintrainer.com',
    icon: 'language',
  },
  {
    name: 'Live Lecture Translator',
    description: 'Private lecture transcription and translation across 22 languages.',
    label: 'Visit livelecturetranslator.com',
    href: 'https://livelecturetranslator.com',
    icon: 'waveform',
  },
]

const principles = [
  { label: 'Useful by default', icon: 'check' },
  { label: 'Culturally aware', icon: 'people' },
  { label: 'Made with care', icon: 'care' },
]

function ArrowIcon({ diagonal = false }) {
  return (
    <svg viewBox="0 0 28 18" aria-hidden="true" focusable="false">
      {diagonal ? (
        <>
          <path d="M6 15 21 3" />
          <path d="M12 3h9v9" />
        </>
      ) : (
        <>
          <path d="M2 9h22" />
          <path d="m17 2 7 7-7 7" />
        </>
      )}
    </svg>
  )
}

function MenuIcon({ open }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {open ? (
        <>
          <path d="M5 5 19 19" />
          <path d="M19 5 5 19" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  )
}

function LeafMark() {
  return (
    <svg className="leaf-mark" viewBox="0 0 58 48" aria-hidden="true">
      <path d="M27 35C10 33 4 22 5 7c14 2 25 11 22 28Z" />
      <path d="M31 42c1-15 10-24 24-25 0 14-8 24-24 25Z" />
    </svg>
  )
}

function ContourLines({ variant = 'hero' }) {
  return (
    <svg
      className={`contours contours--${variant}`}
      viewBox="0 0 900 540"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g>
        <path d="M20 320C66 238 125 246 168 184c46-67 110-92 186-61 77 31 125-8 198-25 98-23 207 13 286 91" />
        <path d="M18 354c67-86 133-59 186-137 43-64 99-73 164-42 80 39 130-4 211-24 93-23 190 8 267 72" />
        <path d="M28 392c66-68 137-51 198-131 47-61 97-53 157-21 75 41 130 4 204-24 84-32 177-5 242 43" />
        <path d="M68 423c63-47 128-40 193-111 49-54 94-42 145-10 72 45 124 17 191-12 77-34 153-15 213 20" />
        <path d="M126 448c54-28 105-33 166-85 61-52 101-27 148 9 58 44 105 27 158 3 63-29 131-24 188 2" />
        <path d="M230 465c48-15 84-28 124-55 54-36 87-10 126 14 45 27 88 26 128 8 45-20 95-22 139-7" />
        <path d="M380 110c31-51 73-71 125-48 48 21 65 64 116 71 60 8 96-23 154-20" />
        <path d="M422 125c22-29 49-39 83-27 39 14 55 55 100 61 48 6 77-16 123-16" />
        <path d="M460 143c15-13 32-17 53-8 29 13 43 43 78 49 36 6 59-8 91-7" />
      </g>
      <path className="contour-route" d="M240 355c69-77 132-84 208-48 76 36 143 20 210-42" />
      <circle cx="240" cy="355" r="5" />
      <circle cx="449" cy="307" r="5" />
      <circle cx="658" cy="265" r="5" />
    </svg>
  )
}

function ProductIcon({ type }) {
  const content = {
    graduation: (
      <>
        <path d="m4 10 8-4 8 4-8 4-8-4Z" />
        <path d="M7 12v5c3 2 7 2 10 0v-5" />
        <path d="M20 10v6" />
      </>
    ),
    pin: (
      <>
        <path d="M12 21s6-6.3 6-12a6 6 0 1 0-12 0c0 5.7 6 12 6 12Z" />
        <circle cx="12" cy="9" r="2.2" />
      </>
    ),
    language: (
      <>
        <path d="M5 6h9" />
        <path d="M9.5 3v3c0 5-2.2 8-5.5 10" />
        <path d="M7 11c1.5 2 3.2 3.4 5 4.2" />
        <path d="m14 20 3.5-9 3.5 9" />
        <path d="M15.4 17h4.2" />
      </>
    ),
    waveform: (
      <>
        <path d="M4 10v4" />
        <path d="M8 7v10" />
        <path d="M12 3v18" />
        <path d="M16 6v12" />
        <path d="M20 9v6" />
      </>
    ),
  }

  return (
    <span className="product-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24">{content[type]}</svg>
    </span>
  )
}

function PrincipleIcon({ type }) {
  const content = {
    check: <path d="m7 12 3.2 3.2L17.5 8" />,
    people: (
      <>
        <circle cx="9" cy="9" r="3" />
        <circle cx="16.5" cy="10" r="2.5" />
        <path d="M3.5 19c.6-3.6 2.5-5.5 5.5-5.5s5 1.9 5.5 5.5" />
        <path d="M14.5 14.2c3.4-.4 5.4 1.2 6 4.8" />
      </>
    ),
    care: (
      <>
        <path d="M12 9.5S8.2 7 8.2 4.8c0-2.5 3.1-3.5 3.8-1.2.7-2.3 3.8-1.3 3.8 1.2 0 2.2-3.8 4.7-3.8 4.7Z" />
        <path d="M4 15.5h3l3 3h5.5l4.5-4c-1.2-1-2.4-.8-3.5 0l-2 1.5" />
        <path d="M7 15.5 10 13h3.5c1.2 0 2 .8 2 2H11" />
      </>
    ),
  }

  return (
    <span className="principle-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24">{content[type]}</svg>
    </span>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 760) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#top" aria-label="Brown Sugar Boba home" onClick={closeMenu}>
          <img src="/logo-boba.png" alt="" />
          <span>Brown Sugar Boba</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <MenuIcon open={menuOpen} />
        </button>

        <nav
          className={`primary-nav${menuOpen ? ' is-open' : ''}`}
          id="primary-navigation"
          aria-label="Primary navigation"
        >
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#approach" onClick={closeMenu}>Approach</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <a className="header-cta" href="#work" onClick={closeMenu}>
            <span>Explore our work</span>
            <ArrowIcon />
          </a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <ContourLines />
      <div className="hero-inner">
        <div className="hero-copy">
          <h1>Useful software for life between languages.</h1>
          <p>
            Brown Sugar Boba builds thoughtful tools for learning, navigating, and understanding
            across cultures.
          </p>
          <div className="hero-actions">
            <a className="button button--primary" href="#work">
              <span>Explore our work</span>
              <ArrowIcon />
            </a>
            <a className="button button--secondary" href="#contact">
              <span>Talk to us</span>
              <ArrowIcon />
            </a>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <span className="hero-orbit hero-orbit--one" />
          <span className="hero-orbit hero-orbit--two" />
          <img src="/logo-boba.png" alt="" />
        </div>
      </div>
    </section>
  )
}

function ProductRow({ product, index }) {
  const content = (
    <>
      <span className="product-number">{String(index + 1).padStart(2, '0')}</span>
      <ProductIcon type={product.icon} />
      <span className="product-copy">
        <span className="product-name">{product.name}</span>
        <span className="product-description">{product.description}</span>
      </span>
      <span className={product.status ? 'product-status' : 'product-link'}>
        {product.status ?? product.label}
      </span>
      <span className="product-arrow" aria-hidden="true">
        <ArrowIcon />
      </span>
    </>
  )

  if (!product.href) {
    return <div className="product-row product-row--soon">{content}</div>
  }

  return (
    <a className="product-row" href={product.href} target="_blank" rel="noreferrer">
      {content}
    </a>
  )
}

function Products() {
  return (
    <section className="products section-pad" id="work" aria-labelledby="products-title">
      <div className="products-inner">
        <div className="section-heading">
          <h2 id="products-title">Our products</h2>
          <LeafMark />
        </div>
        <div className="product-list">
          {products.map((product, index) => (
            <ProductRow key={product.name} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Approach() {
  return (
    <section className="approach section-pad" id="approach" aria-labelledby="approach-title">
      <ContourLines variant="approach" />
      <div className="approach-inner">
        <h2 id="approach-title">Built for real life, across borders.</h2>
        <p>
          We turn complex, cross-cultural moments into products that feel clear, calm, and genuinely
          useful.
        </p>
        <div className="principles">
          {principles.map((principle) => (
            <div className="principle" key={principle.label}>
              <PrincipleIcon type={principle.icon} />
              <span>{principle.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const year = new Date().getFullYear()

  return (
    <section className="contact section-pad" id="contact" aria-labelledby="contact-title">
      <div className="contact-inner">
        <h2 id="contact-title">Have something useful in mind?</h2>
        <p>We design and build focused software products and digital services.</p>
        <a className="email-link" href="mailto:hello@brownsugarboba.com">
          <span className="email-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <rect x="3" y="5" width="18" height="14" rx="1" />
              <path d="m4 7 8 6 8-6" />
            </svg>
          </span>
          <span>hello@brownsugarboba.com</span>
          <span className="email-arrow" aria-hidden="true">
            <ArrowIcon />
          </span>
        </a>
      </div>

      <footer className="footer">
        <span className="footer-brand">Brown Sugar Boba</span>
        <span>Software and services</span>
        <span>© {year} Brown Sugar Boba</span>
      </footer>
    </section>
  )
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#work">Skip to our work</a>
      <Header />
      <main>
        <Hero />
        <Products />
        <Approach />
        <Contact />
      </main>
    </>
  )
}
