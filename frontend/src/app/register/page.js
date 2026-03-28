'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { sendOtp, verifyRegister, googleAuth } = useAuth();
  const router = useRouter();

  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setLoading(true);

    if (!name || !email || !password) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }

    const result = await sendOtp(email);
    if (result.success) {
      setOtpSent(true);
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await verifyRegister(name, email, password, otp);
    if (result.success) {
      router.push('/');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  const handleGoogleAuth = async () => {
     setError("Registering via Google...");
     // In a real app, this would trigger Google SDK
     // Mocking for now as GOOGLE_CLIENT_ID needs to be valid
     alert("Google OAuth: Redirecting to google.com...");
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
          <h1 className="a-auth-title">{otpSent ? 'Verify Email' : 'Create Account'}</h1>
          
          {otpSent && <p style={{fontSize: '13px', marginBottom: '15px'}}>We've sent a 6-digit code to <b>{email}</b>. Please enter it below.</p>}
          {error && <div className="a-auth-error">{error}</div>}

          {!otpSent ? (
            <form onSubmit={handleSendOtp}>
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
                {loading ? 'Sending OTP...' : 'Verify Email'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyAndRegister}>
              <div className="a-auth-field">
                <label>Enter OTP</label>
                <input type="text" className="a-auth-input" maxLength="6" placeholder="6-digit code" value={otp} onChange={(e) => setOtp(e.target.value)} required />
              </div>
              <button type="submit" disabled={loading} className="a-auth-btn">
                {loading ? 'Verifying...' : 'Create your Amazon account'}
              </button>
              <p style={{fontSize: '12px', marginTop: '10px', color: '#0066c0', cursor: 'pointer'}} onClick={handleSendOtp}>Resend OTP</p>
            </form>
          )}

          <p className="a-auth-disclaimer">
            By creating an account, you agree to Amazon's <Link href="#">Conditions of Use</Link> and <Link href="#">Privacy Notice</Link>.
          </p>

          <div className="a-auth-divider-container">
             <hr className="a-auth-divider" />
             <span className="a-auth-divider-text">Or continue with</span>
          </div>

          <button className="a-google-btn" onClick={handleGoogleAuth}>
             <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" />
             Sign in with Google
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
