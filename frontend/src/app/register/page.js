'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await register(name, email, password);
    if (result.success) {
      router.push('/');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Create Account</h1>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Your Name</label>
            <input 
              type="text" 
              placeholder="First and last name"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          <div className="auth-field">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="At least 6 characters"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? 'Processing...' : 'Verify Email'}
          </button>
        </form>
        <p className="auth-disclaimer">
          By creating an account, you agree to Amazon's Conditions of Use and Privacy Notice.
        </p>
        <hr className="auth-divider" />
        <p className="auth-footer">
          Already have an account? <Link href="/login">Sign-In</Link>
        </p>
      </div>

      <style jsx>{`
        .auth-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          min-height: 80vh;
          background: #fff;
        }
        .auth-box {
          border: 1px solid #ddd;
          padding: 20px 25px;
          width: 350px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        h1 {
          font-size: 28px;
          font-weight: 500;
          margin-bottom: 20px;
        }
        .auth-field {
          margin-bottom: 15px;
        }
        label {
          display: block;
          font-weight: 700;
          font-size: 13px;
          margin-bottom: 5px;
        }
        input {
          width: 100%;
          padding: 8px;
          border: 1px solid #a6a6a6;
          border-radius: 3px;
          font-size: 13px;
        }
        input:focus {
          outline: none;
          box-shadow: 0 0 3px 2px rgba(228, 121, 17, 0.5);
          border-color: #e77600;
        }
        .auth-btn {
          width: 100%;
          background: linear-gradient(to bottom, #f7dfa5, #f0c14b);
          border: 1px solid #a88734;
          padding: 8px;
          border-radius: 3px;
          cursor: pointer;
          font-size: 13px;
          margin-top: 5px;
        }
        .auth-btn:hover {
          background: linear-gradient(to bottom, #f5d78e, #eeb933);
        }
        .auth-disclaimer {
          font-size: 12px;
          margin-top: 15px;
          line-height: 1.5;
        }
        .auth-error {
          padding: 10px;
          background: #fdf0f0;
          border: 1px solid #c40000;
          border-radius: 4px;
          color: #c40000;
          font-size: 13px;
          margin-bottom: 15px;
        }
        .auth-divider {
          border: 0;
          border-top: 1px solid #e7e7e7;
          margin: 20px 0;
        }
        .auth-footer {
          font-size: 13px;
        }
        .auth-footer a {
          color: #0066c0;
          text-decoration: none;
        }
        .auth-footer a:hover {
          text-decoration: underline;
          color: #c45500;
        }
      `}</style>
    </div>
  );
}
