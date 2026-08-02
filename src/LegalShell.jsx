export function LegalShell({ children, navLabel, navHref }) {
  return (
    <main className="legal-shell">
      <nav className="legal-nav" aria-label="Legal pages">
        <a className="legal-brand" href="/">
          <img src="/logo-boba.png" alt="" />
          <span>
            <strong>Chinese Character Combiner</strong>
            <small>by Brown Sugar Boba</small>
          </span>
        </a>
        <a href={navHref}>{navLabel}</a>
      </nav>
      {children}
    </main>
  )
}
