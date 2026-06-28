// import React from 'react'
// import { auth } from "../config/firebase"
// import { signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword } from "firebase/auth"
// import { useState, useEffect } from 'react';
// import { doc, setDoc } from 'firebase/firestore';
// import { db } from '../config/firebase';

// export const Auth = ({ onSignIn, successMessage = '', defaultEmail = '' }) => {
//     const [mode, setMode] = useState('login'); // 'login' | 'signup' | 'forgot'
//     const [email, setEmail] = useState(defaultEmail);
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [fullName, setFullName] = useState("");
//     const [studentNumber, setStudentNumber] = useState("");
//     const [course, setCourse] = useState("");
//     const [faculty, setFaculty] = useState("");
//     const [yearOfStudy, setYearOfStudy] = useState("");
//     const [bursary, setBursary] = useState("");
//     const [error, setError] = useState("");
//     const [info, setInfo] = useState("");
//     const [showPassword, setShowPassword] = useState(false);

//     useEffect(() => {
//         setEmail(defaultEmail);
//     }, [defaultEmail]);

//     const resetFields = () => {
//         setEmail('');
//         setPassword('');
//         setConfirmPassword('');
//         setFullName('');
//         setStudentNumber('');
//         setCourse('');
//         setFaculty('');
//         setYearOfStudy('');
//         setBursary('');
//         setError('');
//         setInfo('');
//     };

//     const handleLogin = async () => {
//         setError('');
//         setInfo('');
//         const trimmedEmail = email.trim();
//         if (!trimmedEmail) { setError("Please enter your email address."); return; }
//         if (!password) { setError("Please enter your password."); return; }
//         if (password.length < 6) { setError("Password must be at least 6 characters."); return; }

//         try {
//             await signInWithEmailAndPassword(auth, trimmedEmail, password);
//             setError('');
//             onSignIn(trimmedEmail);
//         } catch (err) {
//             const code = err?.code || '';
//             if (code === 'auth/user-not-found') setError("No account found with this email.");
//             else if (code === 'auth/wrong-password') setError("Incorrect password. Please try again.");
//             else if (code === 'auth/too-many-requests') setError("Too many login attempts. Please wait.");
//             else if (code === 'auth/invalid-credential') setError("Invalid email or password.");
//             else setError("Sign in failed. Please try again.");
//         }
//     };

//     const handleSignUp = async () => {
//         setError('');
//         setInfo('');
//         const trimmedEmail = email.trim();
//         if (!fullName) { setError("Please enter your full name."); return; }
//         if (!studentNumber) { setError("Please enter your student number."); return; }
//         if (!course) { setError("Please enter your course."); return; }
//         if (!faculty) { setError("Please enter your faculty."); return; }
//         if (!yearOfStudy) { setError("Please select your year of study."); return; }
//         if (!bursary) { setError("Please select your bursary status."); return; }
//         if (!trimmedEmail) { setError("Please enter your email address."); return; }
//         if (!password) { setError("Please enter a password."); return; }
//         if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
//         if (password !== confirmPassword) { setError("Passwords do not match."); return; }

//         try {
//             const userCredential = await createUserWithEmailAndPassword(auth, trimmedEmail, password);
//             const user = userCredential.user;

//             // Save student data to Firestore
//             await setDoc(doc(db, 'users', user.uid), {
//                 fullName,
//                 studentNumber,
//                 course,
//                 faculty,
//                 yearOfStudy,
//                 bursary,
//                 email: trimmedEmail,
//                 createdAt: new Date().toISOString(),
//             });

//             setError('');
//             onSignIn(trimmedEmail);
//         } catch (err) {
//             const code = err?.code || '';
//             if (code === 'auth/email-already-in-use') setError("An account with this email already exists.");
//             else if (code === 'auth/invalid-email') setError("Please enter a valid email address.");
//             else if (code === 'auth/weak-password') setError("Password is too weak. Use at least 6 characters.");
//             else setError("Sign up failed. Please try again.");
//         }
//     };

//     const handleForgot = async () => {
//         setError('');
//         setInfo('');
//         const trimmedEmail = email.trim();
//         if (!trimmedEmail) { setError("Please enter your email address."); return; }
//         try {
//             await sendPasswordResetEmail(auth, trimmedEmail);
//             setInfo("Password reset email sent. Check your inbox.");
//             setMode('login');
//             setPassword('');
//         } catch (err) {
//             const code = err?.code || '';
//             if (code === 'auth/user-not-found') setError("No account found with this email.");
//             else if (code === 'auth/too-many-requests') setError("Too many requests. Please wait a few minutes.");
//             else setError("Failed to send reset email.");
//         }
//     };

//     const LogoSVG = () => (
//         <svg width="100%" viewBox="0 0 280 110" role="img" style={{ display: 'block' }}>
//             <title>Biggy Housing logo</title>
//             <defs>
//                 <linearGradient id="purpleGradAuth" x1="0%" y1="0%" x2="100%" y2="100%">
//                     <stop offset="0%" style={{ stopColor: '#667eea' }} />
//                     <stop offset="100%" style={{ stopColor: '#764ba2' }} />
//                 </linearGradient>
//             </defs>
//             <circle cx="46" cy="55" r="40" fill="url(#purpleGradAuth)" />
//             <polygon points="46,20 72,46 20,46" fill="white" opacity="0.95" />
//             <rect x="22" y="46" width="48" height="34" rx="2" fill="white" opacity="0.95" />
//             <rect x="37" y="60" width="18" height="20" rx="2" fill="url(#purpleGradAuth)" />
//             <rect x="26" y="52" width="12" height="10" rx="2" fill="url(#purpleGradAuth)" opacity="0.7" />
//             <rect x="52" y="52" width="12" height="10" rx="2" fill="url(#purpleGradAuth)" opacity="0.7" />
//             <text x="96" y="52" fontFamily="Arial, sans-serif" fontSize="34" fontWeight="800" fill="url(#purpleGradAuth)" letterSpacing="1">BIGGY</text>
//             <text x="98" y="78" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="500" fill="#764ba2" letterSpacing="5">HOUSING</text>
//             <rect x="96" y="84" width="178" height="2" rx="1" fill="url(#purpleGradAuth)" opacity="0.4" />
//             <text x="96" y="100" fontFamily="Arial, sans-serif" fontSize="9" fill="#9ca3af" letterSpacing="1">Student Accommodation · Mahikeng</text>
//         </svg>
//     );

//     return (
//         <div className="auth-container">
//             <div className="auth-form-wrapper" style={{ maxWidth: mode === 'signup' ? '480px' : '400px' }}>

//                 {/* Logo */}
//                 <div style={{
//                     marginBottom: '1.5rem',
//                     padding: '1rem',
//                     background: 'linear-gradient(135deg, #667eea10 0%, #764ba210 100%)',
//                     borderRadius: '14px',
//                     border: '1px solid #667eea25',
//                 }}>
//                     <LogoSVG />
//                 </div>

//                 {/* Header */}
//                 <div className="auth-header">
//                     <h2 style={{ margin: '0 0 0.25rem', color: '#1f2937', fontSize: '1.5rem', fontWeight: 700 }}>
//                         {mode === 'login' && 'Student Login'}
//                         {mode === 'signup' && 'Create Account'}
//                         {mode === 'forgot' && 'Reset Password'}
//                     </h2>
//                     <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>
//                         {mode === 'login' && 'Sign in to find your accommodation'}
//                         {mode === 'signup' && 'Register as an NWU student'}
//                         {mode === 'forgot' && 'Enter your email to reset your password'}
//                     </p>
//                 </div>

//                 <div className="auth-form-content">

//                     {/* SIGN UP FIELDS */}
//                     {mode === 'signup' && (
//                         <>
//                             <div className="input-wrapper">
//                                 <input
//                                     className="auth-input-full-width"
//                                     placeholder="Full name"
//                                     value={fullName}
//                                     onChange={(e) => setFullName(e.target.value)}
//                                 />
//                             </div>
//                             <div className="input-wrapper">
//                                 <input
//                                     className="auth-input-full-width"
//                                     placeholder="Student number (e.g. 40123456)"
//                                     value={studentNumber}
//                                     onChange={(e) => setStudentNumber(e.target.value)}
//                                 />
//                             </div>
//                             <div className="input-wrapper">
//                                 <input
//                                     className="auth-input-full-width"
//                                     placeholder="Course (e.g. BSc Honours Information Systems)"
//                                     value={course}
//                                     onChange={(e) => setCourse(e.target.value)}
//                                 />
//                             </div>
//                             <div className="input-wrapper">
//                                 <input
//                                     className="auth-input-full-width"
//                                     placeholder="Faculty (e.g. Natural & Agricultural Sciences)"
//                                     value={faculty}
//                                     onChange={(e) => setFaculty(e.target.value)}
//                                 />
//                             </div>
//                             <div className="input-wrapper">
//                                 <select
//                                     className="auth-input-full-width"
//                                     value={yearOfStudy}
//                                     onChange={(e) => setYearOfStudy(e.target.value)}
//                                     style={{ color: yearOfStudy ? '#333' : '#9ca3af' }}
//                                 >
//                                     <option value="" disabled>Year of study</option>
//                                     <option value="1st Year">1st Year</option>
//                                     <option value="2nd Year">2nd Year</option>
//                                     <option value="3rd Year">3rd Year</option>
//                                     <option value="Honours">Honours</option>
//                                     <option value="Masters">Masters</option>
//                                     <option value="PhD">PhD</option>
//                                 </select>
//                             </div>
//                             <div className="input-wrapper">
//                                 <select
//                                     className="auth-input-full-width"
//                                     value={bursary}
//                                     onChange={(e) => setBursary(e.target.value)}
//                                     style={{ color: bursary ? '#333' : '#9ca3af' }}
//                                 >
//                                     <option value="" disabled>Bursary / funding status</option>
//                                     <option value="NSFAS">NSFAS</option>
//                                     <option value="Funza Lushaka">Funza Lushaka</option>
//                                     <option value="Private Bursary">Private Bursary</option>
//                                     <option value="Self-Funded">Self-Funded</option>
//                                     <option value="Other">Other</option>
//                                 </select>
//                             </div>
//                         </>
//                     )}

//                     {/* EMAIL — shown on all modes */}
//                     <div className="input-wrapper">
//                         <input
//                             className="auth-input-full-width"
//                             placeholder="Email address"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             onKeyDown={(e) => e.key === 'Enter' && (mode === 'login' ? handleLogin() : mode === 'forgot' ? handleForgot() : handleSignUp())}
//                         />
//                     </div>

//                     {/* PASSWORD — login and signup only */}
//                     {mode !== 'forgot' && (
//                         <div className="password-input-wrapper">
//                             <input
//                                 className="auth-input-full-width"
//                                 type={showPassword ? "text" : "password"}
//                                 placeholder="Password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 onKeyDown={(e) => e.key === 'Enter' && (mode === 'login' ? handleLogin() : handleSignUp())}
//                             />
//                             <button
//                                 type="button"
//                                 onClick={() => setShowPassword(!showPassword)}
//                                 className="password-toggle-btn"
//                             >
//                                 {showPassword ? '👁️' : '👁️‍🗨️'}
//                             </button>
//                         </div>
//                     )}

//                     {/* CONFIRM PASSWORD — signup only */}
//                     {mode === 'signup' && (
//                         <div className="password-input-wrapper">
//                             <input
//                                 className="auth-input-full-width"
//                                 type={showPassword ? "text" : "password"}
//                                 placeholder="Confirm password"
//                                 value={confirmPassword}
//                                 onChange={(e) => setConfirmPassword(e.target.value)}
//                             />
//                         </div>
//                     )}

//                     {/* Messages */}
//                     {successMessage && (
//                         <p style={{ color: '#10b981', fontSize: '0.9rem', textAlign: 'center', margin: '0.5rem 0' }}>
//                             {successMessage}
//                         </p>
//                     )}
//                     {info && (
//                         <p style={{ color: '#3b82f6', fontSize: '0.9rem', textAlign: 'center', margin: '0.5rem 0' }}>
//                             {info}
//                         </p>
//                     )}
//                     {error && (
//                         <p style={{ color: '#ef4444', fontSize: '0.9rem', textAlign: 'center', margin: '0.5rem 0' }}>
//                             {error}
//                         </p>
//                     )}

//                     {/* Submit Button */}
//                     <button
//                         onClick={mode === 'login' ? handleLogin : mode === 'signup' ? handleSignUp : handleForgot}
//                         className="auth-button"
//                     >
//                         {mode === 'login' && 'Sign In'}
//                         {mode === 'signup' && 'Create Account'}
//                         {mode === 'forgot' && 'Send Reset Email'}
//                     </button>

//                     {/* Links */}
//                     <div className="auth-links">
//                         {mode === 'login' && (
//                             <>
//                                 <button type="button" className="auth-link"
//                                     onClick={() => { setMode('forgot'); setError(''); setInfo(''); }}>
//                                     Forgot password?
//                                 </button>
//                                 <button type="button" className="auth-link"
//                                     onClick={() => { resetFields(); setMode('signup'); }}>
//                                     Don't have an account? Sign up
//                                 </button>
//                             </>
//                         )}
//                         {mode === 'signup' && (
//                             <button type="button" className="auth-link"
//                                 onClick={() => { resetFields(); setMode('login'); }}>
//                                 Already have an account? Sign in
//                             </button>
//                         )}
//                         {mode === 'forgot' && (
//                             <button type="button" className="auth-link"
//                                 onClick={() => { setMode('login'); setError(''); setInfo(''); }}>
//                                 Back to sign in
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };---
import { auth } from "../config/firebase"
import { signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword } from "firebase/auth"
import { useState, useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const Auth = ({ onSignIn, successMessage = '', defaultEmail = '' }) => {
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState(defaultEmail);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [studentNumber, setStudentNumber] = useState("");
    const [course, setCourse] = useState("");
    const [faculty, setFaculty] = useState("");
    const [yearOfStudy, setYearOfStudy] = useState("");
    const [bursary, setBursary] = useState("");
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setEmail(defaultEmail);
    }, [defaultEmail]);

    const resetFields = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setFullName('');
        setStudentNumber('');
        setCourse('');
        setFaculty('');
        setYearOfStudy('');
        setBursary('');
        setError('');
        setInfo('');
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
        if (!course) { setError("Please enter your course."); return; }
        if (!faculty) { setError("Please enter your faculty."); return; }
        if (!yearOfStudy) { setError("Please select your year of study."); return; }
        if (!bursary) { setError("Please select your bursary status."); return; }
        if (!trimmedEmail) { setError("Please enter your email address."); return; }
        if (!password) { setError("Please enter a password."); return; }
        if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
        if (password !== confirmPassword) { setError("Passwords do not match."); return; }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, trimmedEmail, password);
            const user = userCredential.user;

            // ✅ Field names match exactly what's in your Firestore 'users' collection
            await setDoc(doc(db, 'users', user.uid), {
                fullName,
                studentNumber,
                course,
                faculty,
                yearOfStudy,
                Bursary: bursary,
                Email: trimmedEmail,
                createdAt: new Date().toISOString(),
            });

            setError('');
            onSignIn(trimmedEmail);
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
        <svg width="100%" viewBox="0 0 280 110" role="img" style={{ display: 'block' }}>
            <title>Biggy Housing logo</title>
            <defs>
                <linearGradient id="purpleGradAuth" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#667eea' }} />
                    <stop offset="100%" style={{ stopColor: '#764ba2' }} />
                </linearGradient>
            </defs>
            <circle cx="46" cy="55" r="40" fill="url(#purpleGradAuth)" />
            <polygon points="46,20 72,46 20,46" fill="white" opacity="0.95" />
            <rect x="22" y="46" width="48" height="34" rx="2" fill="white" opacity="0.95" />
            <rect x="37" y="60" width="18" height="20" rx="2" fill="url(#purpleGradAuth)" />
            <rect x="26" y="52" width="12" height="10" rx="2" fill="url(#purpleGradAuth)" opacity="0.7" />
            <rect x="52" y="52" width="12" height="10" rx="2" fill="url(#purpleGradAuth)" opacity="0.7" />
            <text x="96" y="52" fontFamily="Arial, sans-serif" fontSize="34" fontWeight="800" fill="url(#purpleGradAuth)" letterSpacing="1">BIGGY</text>
            <text x="98" y="78" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="500" fill="#764ba2" letterSpacing="5">HOUSING</text>
            <rect x="96" y="84" width="178" height="2" rx="1" fill="url(#purpleGradAuth)" opacity="0.4" />
            <text x="96" y="100" fontFamily="Arial, sans-serif" fontSize="9" fill="#9ca3af" letterSpacing="1">Student Accommodation · Mahikeng</text>
        </svg>
    );

    return (
        <div className="auth-container">
            <div className="auth-form-wrapper" style={{ maxWidth: mode === 'signup' ? '480px' : '400px' }}>

                {/* Logo */}
                <div style={{
                    marginBottom: '1.5rem',
                    padding: '1rem',
                    background: 'linear-gradient(135deg, #667eea10 0%, #764ba210 100%)',
                    borderRadius: '14px',
                    border: '1px solid #667eea25',
                }}>
                    <LogoSVG />
                </div>

                {/* Header */}
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

                    {/* SIGN UP FIELDS */}
                    {mode === 'signup' && (
                        <>
                            <div className="input-wrapper">
                                <input
                                    className="auth-input-full-width"
                                    placeholder="Full name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                            <div className="input-wrapper">
                                <input
                                    className="auth-input-full-width"
                                    placeholder="Student number (e.g. 40123456)"
                                    value={studentNumber}
                                    onChange={(e) => setStudentNumber(e.target.value)}
                                />
                            </div>
                            <div className="input-wrapper">
                                <input
                                    className="auth-input-full-width"
                                    placeholder="Course (e.g. BSc Honours Information Systems)"
                                    value={course}
                                    onChange={(e) => setCourse(e.target.value)}
                                />
                            </div>
                            <div className="input-wrapper">
                                <input
                                    className="auth-input-full-width"
                                    placeholder="Faculty (e.g. Natural & Agricultural Sciences)"
                                    value={faculty}
                                    onChange={(e) => setFaculty(e.target.value)}
                                />
                            </div>
                            <div className="input-wrapper">
                                <select
                                    className="auth-input-full-width"
                                    value={yearOfStudy}
                                    onChange={(e) => setYearOfStudy(e.target.value)}
                                    style={{ color: yearOfStudy ? '#333' : '#9ca3af' }}
                                >
                                    <option value="" disabled>Year of study</option>
                                    <option value="1st Year">1st Year</option>
                                    <option value="2nd Year">2nd Year</option>
                                    <option value="3rd Year">3rd Year</option>
                                    <option value="Honours">Honours</option>
                                    <option value="Masters">Masters</option>
                                    <option value="PhD">PhD</option>
                                </select>
                            </div>
                            <div className="input-wrapper">
                                <select
                                    className="auth-input-full-width"
                                    value={bursary}
                                    onChange={(e) => setBursary(e.target.value)}
                                    style={{ color: bursary ? '#333' : '#9ca3af' }}
                                >
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

                    {/* EMAIL */}
                    <div className="input-wrapper">
                        <input
                            className="auth-input-full-width"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (mode === 'login' ? handleLogin() : mode === 'forgot' ? handleForgot() : handleSignUp())}
                        />
                    </div>

                    {/* PASSWORD */}
                    {mode !== 'forgot' && (
                        <div className="password-input-wrapper">
                            <input
                                className="auth-input-full-width"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && (mode === 'login' ? handleLogin() : handleSignUp())}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="password-toggle-btn"
                            >
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>
                    )}

                    {/* CONFIRM PASSWORD */}
                    {mode === 'signup' && (
                        <div className="password-input-wrapper">
                            <input
                                className="auth-input-full-width"
                                type={showPassword ? "text" : "password"}
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    )}

                    {/* Messages */}
                    {successMessage && (
                        <p style={{ color: '#10b981', fontSize: '0.9rem', textAlign: 'center', margin: '0.5rem 0' }}>
                            {successMessage}
                        </p>
                    )}
                    {info && (
                        <p style={{ color: '#3b82f6', fontSize: '0.9rem', textAlign: 'center', margin: '0.5rem 0' }}>
                            {info}
                        </p>
                    )}
                    {error && (
                        <p style={{ color: '#ef4444', fontSize: '0.9rem', textAlign: 'center', margin: '0.5rem 0' }}>
                            {error}
                        </p>
                    )}

                    {/* Submit Button */}
                    <button
                        onClick={mode === 'login' ? handleLogin : mode === 'signup' ? handleSignUp : handleForgot}
                        className="auth-button"
                    >
                        {mode === 'login' && 'Sign In'}
                        {mode === 'signup' && 'Create Account'}
                        {mode === 'forgot' && 'Send Reset Email'}
                    </button>

                    {/* Links */}
                    <div className="auth-links">
                        {mode === 'login' && (
                            <>
                                <button type="button" className="auth-link"
                                    onClick={() => { setMode('forgot'); setError(''); setInfo(''); }}>
                                    Forgot password?
                                </button>
                                <button type="button" className="auth-link"
                                    onClick={() => { resetFields(); setMode('signup'); }}>
                                    Don't have an account? Sign up
                                </button>
                            </>
                        )}
                        {mode === 'signup' && (
                            <button type="button" className="auth-link"
                                onClick={() => { resetFields(); setMode('login'); }}>
                                Already have an account? Sign in
                            </button>
                        )}
                        {mode === 'forgot' && (
                            <button type="button" className="auth-link"
                                onClick={() => { setMode('login'); setError(''); setInfo(''); }}>
                                Back to sign in
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};