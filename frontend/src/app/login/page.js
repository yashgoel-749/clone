'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    if (result.success) {
      router.push('/');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="a-auth-page">
      <div className="a-auth-header">
        <Link href="/">
          <div className="a-logo-auth">amazon<span>.in</span></div>
        </Link>
      </div>

      <div className="a-auth-container">
        <div className="a-auth-box">
          <h1 className="a-auth-title">Sign in</h1>
          
          {error && <div className="a-auth-error">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="a-auth-field">
              <label>Email or mobile phone number</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="a-auth-input"
                required 
              />
            </div>

            <div className="a-auth-field">
              <label>Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="a-auth-input"
                required 
              />
            </div>

            <button type="submit" disabled={loading} className="a-auth-btn">
              {loading ? 'Please wait...' : 'Continue'}
            </button>
          </form>

          <p className="a-auth-disclaimer">
            By continuing, you agree to Amazon's <Link href="#" style={{color: '#0066c0', textDecoration: 'none'}}>Conditions of Use</Link> and <Link href="#" style={{color: '#0066c0', textDecoration: 'none'}}>Privacy Notice</Link>.
          </p>

          <div className="a-auth-divider-small"></div>
          
          <div style={{fontSize: '13px'}}>
            <span style={{fontWeight: '700'}}>Buying for work?</span><br/>
            <Link href="#" style={{color: '#0066c0', textDecoration: 'none'}}>Shop on Amazon Business</Link>
          </div>
        </div>

        <div className="a-auth-new-divider">
          <span>New to Amazon?</span>
        </div>
        
        <Link href="/register" className="a-auth-register-link">
          Create your Amazon account
        </Link>
      </div>

      <div className="a-auth-footer">
        <div className="a-auth-footer-links">
          <Link href="#" style={{color: '#0066c0', textDecoration: 'none', fontSize: '11px'}}>Conditions of Use</Link>
          <Link href="#" style={{color: '#0066c0', textDecoration: 'none', fontSize: '11px'}}>Privacy Notice</Link>
          <Link href="#" style={{color: '#0066c0', textDecoration: 'none', fontSize: '11px'}}>Help</Link>
        </div>
        <div className="a-auth-footer-copyright">
          © 1996–2026, Amazon.com, Inc. or its affiliates
        </div>
      </div>
    </div>
  );
}

