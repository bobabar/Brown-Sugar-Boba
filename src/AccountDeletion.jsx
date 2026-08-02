import { useEffect, useState } from 'react'
import { LegalShell } from './LegalShell.jsx'
import { isCloudSyncConfigured, supabase } from './supabase.js'

function messageFrom(error) {
  return error instanceof Error ? error.message : 'Something went wrong. Please try again.'
}

export default function AccountDeletion() {
  const [session, setSession] = useState(null)
  const [email, setEmail] = useState('')
  const [armed, setArmed] = useState(false)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('Sign in with the email used for your game account.')

  useEffect(() => {
    if (!supabase) return undefined
    let disposed = false

    supabase.auth.getSession().then(({ data, error }) => {
      if (disposed) return
      if (error) {
        setStatus('error')
        setMessage(error.message)
      } else {
        setSession(data.session)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!disposed) setSession(nextSession)
    })

    return () => {
      disposed = true
      subscription.unsubscribe()
    }
  }, [])

  const sendLink = async (event) => {
    event.preventDefault()
    if (!supabase || !email.trim()) return
    const normalizedEmail = email.trim().toLocaleLowerCase()
    setStatus('sending')
    setMessage('Sending your secure sign-in link…')

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: normalizedEmail,
        options: { emailRedirectTo: `${window.location.origin}/account-deletion.html` },
      })
      if (error) throw error
      setStatus('sent')
      setMessage(`Check ${normalizedEmail} for your sign-in link.`)
    } catch (error) {
      setStatus('error')
      setMessage(messageFrom(error))
    }
  }

  const deleteAccount = async () => {
    if (!supabase || !session) return
    setStatus('deleting')
    setMessage('Permanently deleting your account and cloud save…')

    try {
      const { error } = await supabase.functions.invoke('delete-account', {
        body: { confirmation: 'DELETE' },
      })
      if (error) throw error
      await supabase.auth.signOut({ scope: 'local' })
      setSession(null)
      setArmed(false)
      setStatus('deleted')
      setMessage('Your account and synchronized game progress have been permanently deleted.')
    } catch (error) {
      setStatus('error')
      setMessage(messageFrom(error))
    }
  }

  let content
  if (status === 'deleted') {
    content = (
      <section className="deletion-success" role="status">
        <div className="legal-symbol legal-symbol--success" aria-hidden="true">✓</div>
        <h2>Account deleted</h2>
        <p>{message}</p>
        <a className="legal-button" href="/">Return to Brown Sugar Boba</a>
      </section>
    )
  } else if (!isCloudSyncConfigured) {
    content = (
      <section className="deletion-notice" role="alert">
        <div className="legal-symbol legal-symbol--danger" aria-hidden="true">!</div>
        <h2>Account service unavailable</h2>
        <p>Please try again from Settings inside the game or email <a href="mailto:support@brownsugarboba.com">support@brownsugarboba.com</a>.</p>
      </section>
    )
  } else if (session) {
    content = (
      <section className="deletion-panel">
        <div className="deletion-identity">
          <span>
            <small>Signed in as</small>
            <strong>{session.user.email ?? 'Current player'}</strong>
          </span>
        </div>
        <h2>What will be deleted</h2>
        <ul>
          <li>Your sign-in account and email association</li>
          <li>Your synchronized score, dictionary, and achievements</li>
          <li>Your unlocked characters and milestone progress</li>
        </ul>
        <p>Local data on other devices is removed when the app is reset, uninstalled, or its storage is cleared.</p>

        {armed ? (
          <div className="deletion-confirm" role="alert">
            <strong>This cannot be undone.</strong>
            <div>
              <button type="button" disabled={status === 'deleting'} onClick={() => setArmed(false)}>Cancel</button>
              <button type="button" className="legal-button legal-button--danger" disabled={status === 'deleting'} onClick={deleteAccount}>
                {status === 'deleting' ? 'Deleting…' : 'Delete permanently'}
              </button>
            </div>
          </div>
        ) : (
          <button type="button" className="legal-button legal-button--danger" onClick={() => setArmed(true)}>Delete account</button>
        )}
        {status === 'error' && <p className="legal-status legal-status--error" role="alert">{message}</p>}
      </section>
    )
  } else {
    content = (
      <section className="deletion-panel">
        <h2>Verify your account</h2>
        <p>We will email a one-time sign-in link before showing the permanent deletion control.</p>
        <form className="legal-form" onSubmit={sendLink}>
          <label>
            <span>Email address</span>
            <input type="email" inputMode="email" autoComplete="email" required value={email} placeholder="you@example.com" onChange={(event) => setEmail(event.target.value)} />
          </label>
          <button type="submit" className="legal-button" disabled={status === 'sending' || !email.trim()}>
            {status === 'sending' ? 'Sending…' : 'Email me a sign-in link'}
          </button>
        </form>
        <p className={`legal-status legal-status--${status}`} role="status">{message}</p>
      </section>
    )
  }

  return (
    <LegalShell navLabel="Privacy" navHref="/privacy.html">
      <article className="legal-card legal-card--action">
        <header className="legal-hero">
          <span className="legal-kicker">Account controls</span>
          <h1>Delete your account</h1>
          <p>Permanently erase your Chinese Character Combiner account and synchronized game progress.</p>
        </header>
        <section className="deletion-panel">
          <h2>Delete game data but keep your account</h2>
          <p>
            In the game, open Settings, choose <strong>Reset progress</strong>, then confirm <strong>Reset everything</strong>. This permanently clears your score, dictionary, unlocked characters, milestones, and achievements. If you are signed in, the fresh state replaces your synchronized cloud save across devices. Your account, email association, and display preferences remain.
          </p>
        </section>
        {content}
      </article>
    </LegalShell>
  )
}
