
import './App.css';
import { Auth } from './components/auth';
import { Home } from './components/Home';
import { RoomPage } from './components/RoomPage';
import { ApplicationPage } from './components/ApplicationPage';
import { useState, useEffect } from 'react';
import { auth } from './config/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';

const STORAGE_KEY = 'biggy_housing_student_data';

// ✅ Real-time clock hook
function useLiveClock() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return time;
}

// ✅ Formats: "Tuesday, 1 July 2025 · 14:32:05"
function formatDateTime(date) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const dayName = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  return `${dayName}, ${day} ${month} ${year} · ${hh}:${mm}:${ss}`;
}

function App() {
  const [page, setPage] = useState('auth');
  const [userEmail, setUserEmail] = useState('');

  // ✅ Student data now comes from localStorage (filled in at sign-up), not Firestore
  const [studentData, setStudentData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [selectedAccommodationForApplication, setSelectedAccommodationForApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const liveTime = useLiveClock();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUserEmail(firebaseUser.email);

        // ✅ No Firestore read — just use whatever is already in localStorage.
        // If nothing is saved (e.g. logging in on a new device), fall back to email.
        try {
          const saved = localStorage.getItem(STORAGE_KEY);
          if (saved) {
            setStudentData(JSON.parse(saved));
          } else {
            setStudentData({ fullName: firebaseUser.email, Email: firebaseUser.email });
          }
        } catch {
          setStudentData({ fullName: firebaseUser.email, Email: firebaseUser.email });
        }

        setPage('home');
      } else {
        setUserEmail('');
        setPage('auth');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = () => {};

  // ✅ Called from Auth.jsx right after a successful sign-up
  const handleAccountCreated = (data) => {
    setStudentData(data);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.warn('Could not save to localStorage:', err);
    }
  };

  const handleSignOut = async () => {
    try { await signOut(auth); } catch (err) { console.warn('signOut failed:', err); }
    setUserEmail('');
    setSelectedAccommodation(null);
    setSelectedAccommodationForApplication(null);
    setPage('auth');
    // Note: studentData + localStorage are intentionally kept so the same browser
    // remembers the details next time this account logs back in.
  };

  const handleSelectAccommodation = (accommodation) => {
    setSelectedAccommodation(accommodation);
    setPage('room');
  };

  const handleApply = (accommodation) => {
    setSelectedAccommodationForApplication(accommodation);
    setPage('application');
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        flexDirection: 'column', gap: '1rem',
      }}>
        <div style={{
          width: '64px', height: '64px', borderRadius: '14px',
          background: 'rgba(255,255,255,0.2)', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontSize: '2.2rem', fontFamily: 'Georgia, serif', fontWeight: 900,
          color: 'white', border: '2px solid rgba(255,255,255,0.4)',
        }}>B</div>
        <p style={{ color: 'white', fontSize: '1.1rem', fontWeight: 600 }}>Loading Biggy Housing...</p>
      </div>
    );
  }

  if (page === 'home') {
    return (
      <Home
        userEmail={userEmail}
        studentData={studentData}
        onSignOut={handleSignOut}
        onSelectAccommodation={handleSelectAccommodation}
        liveTime={formatDateTime(liveTime)}
      />
    );
  }

  if (page === 'room') {
    return (
      <RoomPage
        accommodation={selectedAccommodation}
        onBack={() => setPage('home')}
        studentData={studentData}
        onApply={handleApply}
      />
    );
  }

  if (page === 'application') {
    return (
      <ApplicationPage
        accommodation={selectedAccommodationForApplication}
        studentData={studentData}
        onBack={() => setPage('room')}
      />
    );
  }

  return (
    <Auth
      onSignIn={handleSignIn}
      onAccountCreated={handleAccountCreated}
      successMessage=""
      defaultEmail={userEmail}
    />
  );
}

export default App;