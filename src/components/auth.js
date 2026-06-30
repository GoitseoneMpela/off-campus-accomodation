
import { auth } from "../config/firebase"
import { signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword } from "firebase/auth"
import { useState, useEffect } from 'react';

export const Auth = ({ onSignIn, onAccountCreated, successMessage = '', defaultEmail = '' }) => {
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState(defaultEmail);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [studentNumber, setStudentNumber] = useState("");
    const [yearOfPlacement, setYearOfPlacement] = useState("");
    const [bursary, setBursary] = useState("");
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [signUpSuccess, setSignUpSuccess] = useState(false);
    const [registeredEmail, setRegisteredEmail] = useState("");

    useEffect(() => {
        setEmail(defaultEmail);
    }, [defaultEmail]);

    const resetFields = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setFullName('');
        setStudentNumber('');
        setYearOfPlacement('');
        setBursary('');
        setError('');
        setInfo('');
        setSignUpSuccess(false);
        setRegisteredEmail('');
    };

    const handleLogin = async () => {
        setError('');
        setInfo('');
        const trimmedEmail = email.trim();
        if (!trimmedEmail) { setError("Please enter your email address."); return; }
        if (!password) { setError("Please enter your password."); return; }
        if (password.length < 6) { setError("Password must be at least 6 characters."); return; }

        try {
            await signInWithEmailAndPassword(auth, trimmedEmail, password);
            setError('');
            onSignIn(trimmedEmail);
        } catch (err) {
            const code = err?.code || '';
            if (code === 'auth/user-not-found') setError("No account found with this email.");
            else if (code === 'auth/wrong-password') setError("Incorrect password. Please try again.");
            else if (code === 'auth/too-many-requests') setError("Too many login attempts. Please wait.");
            else if (code === 'auth/invalid-credential') setError("Invalid email or password.");
            else setError("Sign in failed. Please try again.");
        }
    };

    const handleSignUp = async () => {
        setError('');
        setInfo('');
        const trimmedEmail = email.trim();
        if (!fullName) { setError("Please enter your full name."); return; }
        if (!studentNumber) { setError("Please enter your student number."); return; }
        if (!yearOfPlacement) { setError("Please select your year of placement."); return; }
        if (!bursary) { setError("Please select your bursary status."); return; }
        if (!trimmedEmail) { setError("Please enter your email address."); return; }
        if (!password) { setError("Please enter a password."); return; }
        if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
        if (password !== confirmPassword) { setError("Passwords do not match."); return; }

        try {
            // Still create the Firebase auth user so login works,
            // but we do NOT read student details back from Firestore anywhere.
            await createUserWithEmailAndPassword(auth, trimmedEmail, password);
            await auth.signOut();

            setRegisteredEmail(trimmedEmail);
            setSignUpSuccess(true);
            setError('');
        } catch (err) {
            const code = err?.code || '';
            if (code === 'auth/email-already-in-use') setError("An account with this email already exists.");
            else if (code === 'auth/invalid-email') setError("Please enter a valid email address.");
            else if (code === 'auth/weak-password') setError("Password is too weak. Use at least 6 characters.");
            else setError("Sign up failed. Please try again.");
        }
    };

    const handleForgot = async () => {
        setError('');
        setInfo('');
        const trimmedEmail = email.trim();
        if (!trimmedEmail) { setError("Please enter your email address."); return; }
        try {
            await sendPasswordResetEmail(auth, trimmedEmail);
            setInfo("Password reset email sent. Check your inbox.");
            setMode('login');
            setPassword('');
        } catch (err) {
            const code = err?.code || '';
            if (code === 'auth/user-not-found') setError("No account found with this email.");
            else if (code === 'auth/too-many-requests') setError("Too many requests. Please wait a few minutes.");
            else setError("Failed to send reset email.");
        }
    };

    const LogoSVG = () => (
        <svg width="100%" viewBox="0 0 300 110" role="img" style={{ display: 'block' }}>
            <title>Biggy Housing logo</title>
            <defs>
                <linearGradient id="purpleGradAuth" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#667eea' }} />
                    <stop offset="100%" style={{ stopColor: '#764ba2' }} />
                </linearGradient>
                <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#764ba2' }} />
                    <stop offset="100%" style={{ stopColor: '#667eea' }} />
                </linearGradient>
            </defs>
            <rect x="4" y="12" width="72" height="86" rx="14" fill="url(#badgeGrad)" />
            <rect x="8" y="16" width="64" height="78" rx="11" fill="none" stroke="white" strokeWidth="1.5" opacity="0.3" />
            <text x="40" y="70" fontFamily="Georgia, serif" fontSize="62" fontWeight="900" fill="white" textAnchor="middle" letterSpacing="-2">B</text>
            <circle cx="66" cy="86" r="5" fill="white" opacity="0.5" />
            <text x="90" y="52" fontFamily="Arial, sans-serif" fontSize="34" fontWeight="800" fill="url(#purpleGradAuth)" letterSpacing="1">BIGGY</text>
            <text x="92" y="78" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="500" fill="#764ba2" letterSpacing="5">HOUSING</text>
            <rect x="90" y="84" width="194" height="2" rx="1" fill="url(#purpleGradAuth)" opacity="0.4" />
            <text x="90" y="100" fontFamily="Arial, sans-serif" fontSize="9" fill="#9ca3af" letterSpacing="1">Student Accommodation · Mahikeng</text>
        </svg>
    );

    if (signUpSuccess) {
        return (
            <div className="auth-container">
                <div className="auth-form-wrapper" style={{ maxWidth: '420px', textAlign: 'center' }}>
                    <div style={{
                        marginBottom: '1.5rem', padding: '1rem',
                        background: 'linear-gradient(135deg, #667eea10 0%, #764ba210 100%)',
                        borderRadius: '14px', border: '1px solid #667eea25',
                    }}>
                        <LogoSVG />
                    </div>

                    <div style={{
                        width: '72px', height: '72px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 1.25rem', fontSize: '2rem',
                        boxShadow: '0 8px 24px #10b98130',
                    }}>✓</div>

                    <h2 style={{ margin: '0 0 0.5rem', color: '#1f2937', fontSize: '1.5rem', fontWeight: 700 }}>
                        Account Created!
                    </h2>
                    <p style={{ margin: '0 0 0.25rem', color: '#6b7280', fontSize: '0.95rem' }}>
                        Welcome to Biggy Housing, <strong style={{ color: '#764ba2' }}>{fullName}</strong>.
                    </p>
                    <p style={{ margin: '0 0 1.75rem', color: '#9ca3af', fontSize: '0.85rem' }}>
                        Your account has been registered successfully. Sign in to start browsing accommodation.
                    </p>

                    <div style={{
                        background: 'linear-gradient(135deg, #667eea08, #764ba208)',
                        border: '1px solid #667eea20', borderRadius: '12px',
                        padding: '1rem 1.25rem', marginBottom: '1.5rem', textAlign: 'left',
                    }}>
                        <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                            Registration Summary
                        </div>
                        {[
                            ['Full Name', fullName],
                            ['Student Number', studentNumber],
                            ['Year of Placement', yearOfPlacement],
                            ['Bursary', bursary],
                            ['Email', registeredEmail],
                        ].map(([label, value]) => (
                            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', borderBottom: '1px solid #f3f4f6' }}>
                                <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>{label}</span>
                                <span style={{ fontSize: '0.85rem', color: '#1f2937', fontWeight: 600 }}>{value}</span>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => {
                            // ✅ Hand the typed sign-up data up to App.jsx (saved to localStorage there)
                            onAccountCreated?.({
                                fullName,
                                studentNumber,
                                yearOfPlacement,
                                Bursary: bursary,
                                Email: registeredEmail,
                            });
                            resetFields();
                            setEmail(registeredEmail);
                            setMode('login');
                        }}
                        className="auth-button"
                    >
                        Sign In Now
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="auth-form-wrapper" style={{ maxWidth: mode === 'signup' ? '480px' : '400px' }}>

                <div style={{
                    marginBottom: '1.5rem', padding: '1rem',
                    background: 'linear-gradient(135deg, #667eea10 0%, #764ba210 100%)',
                    borderRadius: '14px', border: '1px solid #667eea25',
                }}>
                    <LogoSVG />
                </div>

                <div className="auth-header">
                    <h2 style={{ margin: '0 0 0.25rem', color: '#1f2937', fontSize: '1.5rem', fontWeight: 700 }}>
                        {mode === 'login' && 'Student Login'}
                        {mode === 'signup' && 'Create Account'}
                        {mode === 'forgot' && 'Reset Password'}
                    </h2>
                    <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>
                        {mode === 'login' && 'Sign in to find your accommodation'}
                        {mode === 'signup' && 'Register as an NWU student'}
                        {mode === 'forgot' && 'Enter your email to reset your password'}
                    </p>
                </div>

                <div className="auth-form-content">

                    {mode === 'signup' && (
                        <>
                            <div className="input-wrapper">
                                <input className="auth-input-full-width" placeholder="Full name"
                                    value={fullName} onChange={(e) => setFullName(e.target.value)} />
                            </div>
                            <div className="input-wrapper">
                                <input className="auth-input-full-width" placeholder="Student number (e.g. 40123456)"
                                    value={studentNumber} onChange={(e) => setStudentNumber(e.target.value)} />
                            </div>
                            <div className="input-wrapper">
                                <select className="auth-input-full-width" value={yearOfPlacement}
                                    onChange={(e) => setYearOfPlacement(e.target.value)}
                                    style={{ color: yearOfPlacement ? '#333' : '#9ca3af' }}>
                                    <option value="" disabled>Year of placement</option>
                                    <option value="2027">2027</option>
                                    <option value="2028">2028</option>
                                    <option value="2029">2029</option>
                                    <option value="2030">2030</option>
                                </select>
                            </div>
                            <div className="input-wrapper">
                                <select className="auth-input-full-width" value={bursary}
                                    onChange={(e) => setBursary(e.target.value)}
                                    style={{ color: bursary ? '#333' : '#9ca3af' }}>
                                    <option value="" disabled>Bursary / funding status</option>
                                    <option value="NSFAS">NSFAS</option>
                                    <option value="Funza Lushaka">Funza Lushaka</option>
                                    <option value="Private Bursary">Private Bursary</option>
                                    <option value="Self-Funded">Self-Funded</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </>
                    )}

                    <div className="input-wrapper">
                        <input className="auth-input-full-width" placeholder="Email address"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (mode === 'login' ? handleLogin() : mode === 'forgot' ? handleForgot() : handleSignUp())} />
                    </div>

                    {mode !== 'forgot' && (
                        <div className="password-input-wrapper">
                            <input className="auth-input-full-width"
                                type={showPassword ? "text" : "password"} placeholder="Password"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && (mode === 'login' ? handleLogin() : handleSignUp())} />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="password-toggle-btn">
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>
                    )}

                    {mode === 'signup' && (
                        <div className="password-input-wrapper">
                            <input className="auth-input-full-width"
                                type={showPassword ? "text" : "password"} placeholder="Confirm password"
                                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                    )}

                    {successMessage && <p style={{ color: '#10b981', fontSize: '0.9rem', textAlign: 'center', margin: '0.5rem 0' }}>{successMessage}</p>}
                    {info && <p style={{ color: '#3b82f6', fontSize: '0.9rem', textAlign: 'center', margin: '0.5rem 0' }}>{info}</p>}
                    {error && <p style={{ color: '#ef4444', fontSize: '0.9rem', textAlign: 'center', margin: '0.5rem 0' }}>{error}</p>}

                    <button onClick={mode === 'login' ? handleLogin : mode === 'signup' ? handleSignUp : handleForgot} className="auth-button">
                        {mode === 'login' && 'Sign In'}
                        {mode === 'signup' && 'Create Account'}
                        {mode === 'forgot' && 'Send Reset Email'}
                    </button>

                    <div className="auth-links">
                        {mode === 'login' && (
                            <>
                                <button type="button" className="auth-link" onClick={() => { setMode('forgot'); setError(''); setInfo(''); }}>Forgot password?</button>
                                <button type="button" className="auth-link" onClick={() => { resetFields(); setMode('signup'); }}>Don't have an account? Sign up</button>
                            </>
                        )}
                        {mode === 'signup' && (
                            <button type="button" className="auth-link" onClick={() => { resetFields(); setMode('login'); }}>Already have an account? Sign in</button>
                        )}
                        {mode === 'forgot' && (
                            <button type="button" className="auth-link" onClick={() => { setMode('login'); setError(''); setInfo(''); }}>Back to sign in</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};