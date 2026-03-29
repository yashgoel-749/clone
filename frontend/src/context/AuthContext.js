'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('amazon_clone_user');
    const storedToken = localStorage.getItem('amazon_clone_token');
    if (storedToken && storedUser && storedUser !== "undefined") {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const saveAuth = (data) => {
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('amazon_clone_token', data.token);
    localStorage.setItem('amazon_clone_user', JSON.stringify(data.user));
  };

  const register = async (name, email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        saveAuth(data);
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (err) {
      return { success: false, message: "Registration failed" };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        saveAuth(data);
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (err) {
      return { success: false, message: "Connection failed" };
    }
  };

  // --- NEW: OTP & GOOGLE AUTH ---
  const sendOtp = async (email) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      return { success: response.ok, message: data.message };
    } catch (err) {
      return { success: false, message: "Failed to send OTP" };
    }
  };

  const verifyRegister = async (name, email, password, otp) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, otp }),
      });
      const data = await response.json();
      if (response.ok) {
        saveAuth(data);
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (err) {
      return { success: false, message: "Verification failed" };
    }
  };

  const googleAuth = async (googleToken) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/google-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: googleToken }),
      });
      const data = await response.json();
      if (response.ok) {
        saveAuth(data);
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (err) {
      return { success: false, message: "Google login failed" };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('amazon_clone_token');
    localStorage.removeItem('amazon_clone_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, sendOtp, verifyRegister, googleAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
