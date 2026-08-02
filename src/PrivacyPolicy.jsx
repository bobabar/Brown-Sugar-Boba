import { LegalShell } from './LegalShell.jsx'

export default function PrivacyPolicy() {
  return (
    <LegalShell navLabel="Delete account" navHref="/account-deletion.html">
      <article className="legal-card">
        <header className="legal-hero">
          <span className="legal-kicker">Your game, your data</span>
          <h1>Privacy Policy</h1>
          <p>Effective July 27, 2026</p>
        </header>

        <section>
          <h2>Who operates the game</h2>
          <p>
            Chinese Character Combiner is operated by Brown Sugar Boba. Questions about this policy or your data can be sent to <a href="mailto:support@brownsugarboba.com">support@brownsugarboba.com</a>.
          </p>
        </section>

        <section>
          <h2>What the game stores</h2>
          <p>
            You can play without an account. Guest progress—including your score, dictionary, unlocked characters, achievements, milestones, and preferences—is stored locally on your device.
          </p>
          <p>
            If you choose to create an account, the game stores your email address, an internal account identifier, and a copy of that game progress so it can be restored across devices.
          </p>
        </section>

        <section>
          <h2>How information is used</h2>
          <p>
            Account information is used only to authenticate you, synchronize your game, provide support, and manage your account. The app does not sell personal data, serve advertising, build advertising profiles, or use third-party marketing analytics.
          </p>
        </section>

        <section>
          <h2>Service provider and security</h2>
          <p>
            Supabase provides account authentication, database hosting, and cloud synchronization on Brown Sugar Boba's behalf. Data is encrypted in transit, and database access rules restrict each signed-in player to their own save.
          </p>
        </section>

        <section>
          <h2>Retention and deletion</h2>
          <p>
            Guest progress remains until you reset the game, clear the app's data, or uninstall it. Account data remains until you delete the account. You can delete it from Settings inside the game or use the <a href="/account-deletion.html">online account-deletion page</a>. Deletion permanently removes the account and its cloud save.
          </p>
        </section>

        <section>
          <h2>Children</h2>
          <p>
            The game is intended for a general audience aged 13 and older and is not directed to children under 13. Brown Sugar Boba does not knowingly collect personal information from children under 13.
          </p>
        </section>

        <section>
          <h2>Your choices</h2>
          <p>
            Account creation is optional. You can sign out, reset local progress, or delete the account at any time. Vocabulary attribution and open-source license information are available inside the game.
          </p>
        </section>
      </article>
    </LegalShell>
  )
}
