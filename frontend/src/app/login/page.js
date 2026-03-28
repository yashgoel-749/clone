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
          <h1 className="a-auth-title">Sign in or create account</h1>
          
          {error && <div className="a-auth-error">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="a-auth-field">
              <label>Enter mobile number or email</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="a-auth-input"
                required 
              />
            </div>

            <div className="a-auth-field password-field">
              <label>Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="a-auth-input"
                required 
              />
            </div>

            <button type="submit" disabled={loading} className="a-auth-continue-btn">
              {loading ? 'Please wait...' : 'Continue'}
            </button>
          </form>

          <p className="a-auth-disclaimer">
            By continuing, you agree to Amazon's <Link href="#">Conditions of Use</Link> and <Link href="#">Privacy Notice</Link>.
          </p>

          <div className="a-auth-divider-small"></div>
          
          <div className="a-auth-work-section">
            <span className="a-auth-work-title">Buying for work?</span>
            <Link href="#" className="a-auth-work-link">Create a free business account</Link>
          </div>
        </div>

        <div className="a-auth-divider">
          <h5>New to Amazon?</h5>
        </div>
        
        <Link href="/register" className="a-auth-register-link">
          Create your Amazon account
        </Link>
      </div>

      <div className="a-auth-footer">
        <div className="a-auth-footer-links">
          <Link href="#">Conditions of Use</Link>
          <Link href="#">Privacy Notice</Link>
          <Link href="#">Help</Link>
        </div>
        <div className="a-auth-footer-copyright">
          © 1996–2026, Amazon.com, Inc. or its affiliates
        </div>
      </div>
    </div>
  );
}

