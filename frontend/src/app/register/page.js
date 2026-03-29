'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useGoogleLogin } from '@react-oauth/google';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register, googleAuth } = useAuth();
  const router = useRouter();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      setError('');
      const result = await googleAuth(tokenResponse.access_token);
      if (result.success) {
        router.push('/');
      } else {
        setError(result.message);
      }
      setLoading(false);
    },
    onError: () => setError("Google login failed")
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!name || !email || !password) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }

    const result = await register(name, email, password);
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
          <h1 className="a-auth-title">Create Account</h1>
          
          {error && <div className="a-auth-error">{error}</div>}

          <form onSubmit={handleRegister}>
            <div className="a-auth-field">
              <label>Your Name</label>
              <input type="text" className="a-auth-input" placeholder="First and last name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="a-auth-field">
              <label>Email</label>
              <input type="email" className="a-auth-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="a-auth-field">
              <label>Password</label>
              <input type="password" className="a-auth-input" placeholder="At least 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" disabled={loading} className="a-auth-btn">
              {loading ? 'Creating account...' : 'Create your Amazon account'}
            </button>
          </form>

          <p className="a-auth-disclaimer">
            By creating an account, you agree to Amazon's <Link href="#">Conditions of Use</Link> and <Link href="#">Privacy Notice</Link>.
          </p>

          <div className="a-auth-divider-container">
             <span className="a-auth-divider-text">Or continue with</span>
          </div>

          <button className="a-google-auth-btn-custom" onClick={() => handleGoogleLogin()}>
             <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" />
             <span>Sign in with Google</span>
          </button>
        </div>

        <div className="a-auth-divider-small"></div>
        <p style={{fontSize: '13px', textAlign: 'center'}}>
          Already have an account? <Link href="/login" style={{color: '#0066c0', textDecoration: 'none'}}>Sign-In ❯</Link>
        </p>
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
