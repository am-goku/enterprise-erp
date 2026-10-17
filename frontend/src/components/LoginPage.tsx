import { useState, type FormEvent } from 'react';
import { ArrowRight, Command, ShieldCheck } from 'lucide-react';

export const demoCredentials = { email: 'demo@northstar.co', password: 'northstar123' };

export function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email.trim().toLowerCase() !== demoCredentials.email || password !== demoCredentials.password) {
      setError('Those demo credentials do not match. Try the account shown below.');
      return;
    }
    onLogin();
  }

  return <main className="login-page"><section className="login-card"><div className="login-brand"><div className="brand-mark"><Command size={19} strokeWidth={2.4} /></div><span className="brand-name">northstar<span>.</span></span></div><div className="login-heading"><div className="login-icon"><ShieldCheck size={18} /></div><p className="eyebrow">SECURE WORKSPACE</p><h1>Welcome back</h1><p>Sign in to continue to your Northstar workspace.</p></div><form className="login-form" onSubmit={submit}><label>Work email<input type="email" autoComplete="username" placeholder="you@company.com" value={email} onChange={(event) => setEmail(event.target.value)} required /></label><label>Password<input type="password" autoComplete="current-password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>{error && <p className="login-error" role="alert">{error}</p>}<button className="primary-button" type="submit">Sign in <ArrowRight size={15} /></button></form><div className="demo-credentials"><div><strong>Demo access</strong><small>Use this sample account to explore the prototype.</small></div><dl><div><dt>Email</dt><dd>{demoCredentials.email}</dd></div><div><dt>Password</dt><dd>{demoCredentials.password}</dd></div></dl></div><p className="login-footnote">This demo sign-in is stored in this browser only. Connect a server-side identity provider before production use.</p></section><footer className="login-footer">© 2026 Northstar Inc. <span>·</span> Enterprise resource planning</footer></main>;
}
