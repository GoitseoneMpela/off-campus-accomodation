import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { auth } from "../config/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"

export const StudentDetails = ({ onComplete, onBack }) => {
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [course, setCourse] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const redirectTimeout = useRef(null);

  useEffect(() => {
    return () => {
      if (redirectTimeout.current) {
        clearTimeout(redirectTimeout.current);
      }
    };
  }, []);

  const handleSubmit = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password || !confirmPassword || !fullName.trim() || !studentId.trim() || !course.trim()) {
      setError('Please complete all signup fields.');
      return;
    }
    if (!trimmedEmail.toLowerCase().endsWith("@gmail.com")) {
      setError("Email must be a valid @gmail.com address.");
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setSuccess('');
    setIsSaving(true);

    try {
      await createUserWithEmailAndPassword(auth, trimmedEmail, password);
      setSuccess('Account created successfully. Redirecting to sign in...');
      redirectTimeout.current = setTimeout(() => {
        onComplete({
          email: trimmedEmail,
          fullName: fullName.trim(),
          studentId: studentId.trim(),
          course: course.trim(),
        });
      }, 1500);
    } catch (err) {
      console.error('Signup error:', err);
      const code = err?.code || '';
      const message = err?.message || '';
      if (code === 'auth/email-already-in-use' || message.includes('email-already-in-use')) {
        setError('This email is already registered. Please sign in instead.');
      } else if (code === 'auth/weak-password' || message.includes('weak-password')) {
        setError('Password is too weak. Use at least 6 characters.');
      } else if (code === 'auth/too-many-requests' || message.includes('too-many-requests')) {
        setError('Too many requests. Please wait a few minutes and try again.');
      } else {
        setError(message || 'Sign up failed');
      }
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Complete your student profile</p>
        </div>

        <div className="auth-form-content">
          <div className="input-wrapper">
            <input className="auth-input-full-width" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>

          <div className="input-wrapper">
            <input className="auth-input-full-width" placeholder="Student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
          </div>

          <div className="input-wrapper">
            <input className="auth-input-full-width" placeholder="Course" value={course} onChange={(e) => setCourse(e.target.value)} />
          </div>

          <div className="input-wrapper">
            <input className="auth-input-full-width" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="password-input-wrapper">
            <input className="auth-input-full-width" type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="password-toggle-btn">
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>

          <div className="password-input-wrapper">
            <input className="auth-input-full-width" type={showConfirmPassword ? "text" : "password"} placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="password-toggle-btn">
              {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>

          {success && <p style={{color: '#10b981', fontSize: '0.9rem', textAlign: 'center', margin: '0.5rem 0'}}>{success}</p>}
          {error && <p style={{color: '#ef4444', fontSize: '0.9rem', textAlign: 'center', margin: '0.5rem 0'}}>{error}</p>}

          <button onClick={handleSubmit} className="auth-button" disabled={isSaving}>
            {isSaving ? 'Creating account...' : 'Create account'}
          </button>

          <div className="auth-links">
            <button type="button" className="auth-link" onClick={onBack}>
              Back to login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
