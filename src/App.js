// import './App.css';
// import { Auth } from './components/auth';
// import { Home } from './components/Home';
// import { RoomPage } from './components/RoomPage';
// import { StudentDetails } from './components/StudentDetails';
// import { useState, useEffect } from 'react';
// import { auth } from './config/firebase';
// import { signOut } from 'firebase/auth';

// const LOCAL_STORAGE_KEY = 'accomStudentProfiles';

// function App() {
//   const [page, setPage] = useState('auth'); // auth | details | home
//   const [userEmail, setUserEmail] = useState('');
//   const [studentData, setStudentData] = useState(null);
//   const [studentProfiles, setStudentProfiles] = useState({});
//   const [selectedAccommodation, setSelectedAccommodation] = useState(null);
//   const [infoMessage, setInfoMessage] = useState('');

//   useEffect(() => {
//     try {
//       const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
//       if (saved) {
//         setStudentProfiles(JSON.parse(saved));
//       }
//     } catch (err) {
//       console.warn('Failed to load saved profiles:', err);
//     }
//   }, []);

//   const getStudentDataForEmail = (email) => {
//     if (!email) return null;
//     return studentProfiles[email.toLowerCase()] || null;
//   };

//   const handleSignIn = (email) => {
//     setUserEmail(email);
//     setStudentData(getStudentDataForEmail(email));
//     setInfoMessage('');
//     setPage('home');
//   };

//   const handleSignOut = async () => {
//     try {
//       await signOut(auth);
//     } catch (err) {
//       console.warn('Firebase signOut failed:', err);
//     }
//     setUserEmail('');
//     setStudentData(null);
//     setSelectedAccommodation(null);
//     setPage('auth');
//   };

//   const handleSelectAccommodation = (accommodation) => {
//     setSelectedAccommodation(accommodation);
//     setPage('room');
//   };

//   const handleSignUp = () => {
//     setInfoMessage('');
//     setPage('details');
//   };

//   const handleDetailsComplete = (details) => {
//     const normalizedEmail = details.email.toLowerCase();
//     const nextProfiles = {
//       ...studentProfiles,
//       [normalizedEmail]: {
//         ...details,
//         email: normalizedEmail,
//       },
//     };

//     setStudentProfiles(nextProfiles);
//     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextProfiles));
//     setStudentData(nextProfiles[normalizedEmail]);
//     setUserEmail(normalizedEmail);
//     setInfoMessage('');
//     setPage('home');
//   };

//   if (page === 'home') {
//     return <Home userEmail={userEmail} studentData={studentData} onSignOut={handleSignOut} onSelectAccommodation={handleSelectAccommodation} />;
//   }

//   if (page === 'room') {
//     return <RoomPage accommodation={selectedAccommodation} onBack={() => setPage('home')} />;
//   }

//   if (page === 'details') {
//     return <StudentDetails email={userEmail} onComplete={handleDetailsComplete} onBack={() => setPage('auth')} />;
//   }

//   return <Auth onSignIn={handleSignIn} onSignUp={handleSignUp} successMessage={infoMessage} defaultEmail={userEmail} />;
// }

// export default App;

// import './App.css';
// import { Auth } from './components/auth';
// import { Home } from './components/Home';
// import { RoomPage } from './components/RoomPage';
// import { ApplicationPage } from './components/ApplicationPage';
// import { useState, useEffect } from 'react';
// import { auth, db } from './config/firebase';
// import { signOut, onAuthStateChanged } from 'firebase/auth';
// import { doc, getDoc } from 'firebase/firestore';

// function App() {
//   const [page, setPage] = useState('auth');
//   const [userEmail, setUserEmail] = useState('');
//   const [studentData, setStudentData] = useState(null);
//   const [selectedAccommodation, setSelectedAccommodation] = useState(null);
//   const [selectedAccommodationForApplication, setSelectedAccommodationForApplication] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//       if (firebaseUser) {
//         setUserEmail(firebaseUser.email);
//         try {
//           const docRef = doc(db, 'user', firebaseUser.uid);
//           const docSnap = await getDoc(docRef);
//           if (docSnap.exists()) {
//             setStudentData(docSnap.data());
//           } else {
//             setStudentData({ fullNames: firebaseUser.email });
//           }
//         } catch (err) {
//           console.error('Error fetching student data:', err);
//           setStudentData({ fullNames: firebaseUser.email });
//         }
//         setPage('home');
//       } else {
//         setUserEmail('');
//         setStudentData(null);
//         setPage('auth');
//       }
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleSignIn = () => {
//     // onAuthStateChanged handles everything automatically
//   };

//   const handleSignOut = async () => {
//     try {
//       await signOut(auth);
//     } catch (err) {
//       console.warn('Firebase signOut failed:', err);
//     }
//     setUserEmail('');
//     setStudentData(null);
//     setSelectedAccommodation(null);
//     setSelectedAccommodationForApplication(null);
//     setPage('auth');
//   };

//   const handleSelectAccommodation = (accommodation) => {
//     setSelectedAccommodation(accommodation);
//     setPage('room');
//   };

//   const handleApply = (accommodation) => {
//     setSelectedAccommodationForApplication(accommodation);
//     setPage('application');
//   };

//   if (loading) {
//     return (
//       <div style={{
//         minHeight: '100vh',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//         flexDirection: 'column',
//         gap: '1rem',
//       }}>
//         <div style={{ fontSize: '3rem' }}>🏠</div>
//         <p style={{ color: 'white', fontSize: '1.1rem', fontWeight: 600 }}>
//           Loading Biggy Housing...
//         </p>
//       </div>
//     );
//   }

//   if (page === 'home') {
//     return (
//       <Home
//         userEmail={userEmail}
//         studentData={studentData}
//         onSignOut={handleSignOut}
//         onSelectAccommodation={handleSelectAccommodation}
//       />
//     );
//   }

//   if (page === 'room') {
//     return (
//       <RoomPage
//         accommodation={selectedAccommodation}
//         onBack={() => setPage('home')}
//         studentData={studentData}
//         onApply={handleApply}
//       />
//     );
//   }

//   if (page === 'application') {
//     return (
//       <ApplicationPage
//         accommodation={selectedAccommodationForApplication}
//         studentData={studentData}
//         onBack={() => setPage('room')}
//       />
//     );
//   }

//   return (
//     <Auth
//       onSignIn={handleSignIn}
//       successMessage=""
//       defaultEmail={userEmail}
//     />
//   );
// }

// export default App;---
// import './App.css';
// import { Auth } from './components/auth';
// import { Home } from './components/Home';
// import { RoomPage } from './components/RoomPage';
// import { ApplicationPage } from './components/ApplicationPage';
// import { useState, useEffect } from 'react';
// import { auth, db } from './config/firebase';
// import { signOut, onAuthStateChanged } from 'firebase/auth';
// import { doc, getDoc } from 'firebase/firestore';

// function App() {
//   const [page, setPage] = useState('auth');
//   const [userEmail, setUserEmail] = useState('');
//   const [studentData, setStudentData] = useState(null);
//   const [selectedAccommodation, setSelectedAccommodation] = useState(null);
//   const [selectedAccommodationForApplication, setSelectedAccommodationForApplication] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//       if (firebaseUser) {
//         setUserEmail(firebaseUser.email);
//         try {
//           // ✅ FIXED: 'users' (plural) to match what Auth.jsx saves to
//           const docRef = doc(db, 'users', firebaseUser.uid);
//           const docSnap = await getDoc(docRef);
//           if (docSnap.exists()) {
//             setStudentData(docSnap.data());
//           } else {
//             // ✅ FIXED: fullName (no S) to match Firestore field
//             setStudentData({ fullName: firebaseUser.email });
//           }
//         } catch (err) {
//           console.error('Error fetching student data:', err);
//           setStudentData({ fullName: firebaseUser.email });
//         }
//         setPage('home');
//       } else {
//         setUserEmail('');
//         setStudentData(null);
//         setPage('auth');
//       }
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleSignIn = () => {};

//   const handleSignOut = async () => {
//     try {
//       await signOut(auth);
//     } catch (err) {
//       console.warn('Firebase signOut failed:', err);
//     }
//     setUserEmail('');
//     setStudentData(null);
//     setSelectedAccommodation(null);
//     setSelectedAccommodationForApplication(null);
//     setPage('auth');
//   };

//   const handleSelectAccommodation = (accommodation) => {
//     setSelectedAccommodation(accommodation);
//     setPage('room');
//   };

//   const handleApply = (accommodation) => {
//     setSelectedAccommodationForApplication(accommodation);
//     setPage('application');
//   };

//   if (loading) {
//     return (
//       <div style={{
//         minHeight: '100vh',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//         flexDirection: 'column',
//         gap: '1rem',
//       }}>
//         <div style={{ fontSize: '3rem' }}>🏠</div>
//         <p style={{ color: 'white', fontSize: '1.1rem', fontWeight: 600 }}>
//           Loading Biggy Housing...
//         </p>
//       </div>
//     );
//   }

//   if (page === 'home') {
//     return (
//       <Home
//         userEmail={userEmail}
//         studentData={studentData}
//         onSignOut={handleSignOut}
//         onSelectAccommodation={handleSelectAccommodation}
//       />
//     );
//   }

//   if (page === 'room') {
//     return (
//       <RoomPage
//         accommodation={selectedAccommodation}
//         onBack={() => setPage('home')}
//         studentData={studentData}
//         onApply={handleApply}
//       />
//     );
//   }

//   if (page === 'application') {
//     return (
//       <ApplicationPage
//         accommodation={selectedAccommodationForApplication}
//         studentData={studentData}
//         onBack={() => setPage('room')}
//       />
//     );
//   }

//   return (
//     <Auth
//       onSignIn={handleSignIn}
//       successMessage=""
//       defaultEmail={userEmail}
//     />
//   );
// }

// export default App;

import './App.css';
import { Auth } from './components/auth';
import { Home } from './components/Home';
import { RoomPage } from './components/RoomPage';
import { ApplicationPage } from './components/ApplicationPage';
import { useState, useEffect } from 'react';
import { auth, db } from './config/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

function App() {
  const [page, setPage] = useState('auth');
  const [userEmail, setUserEmail] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [selectedAccommodationForApplication, setSelectedAccommodationForApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUserEmail(firebaseUser.email);
        try {
          // ✅ 'user' singular — matching your Firestore collection name
          const docRef = doc(db, 'user', firebaseUser.uid);
          const docSnap = await getDoc(docRef);

          console.log('UID being used:', firebaseUser.uid);
          console.log('Document exists:', docSnap.exists());
          console.log('Document data:', docSnap.data());

          if (docSnap.exists()) {
            setStudentData(docSnap.data());
          } else {
            console.warn('No document found for this UID in the user collection');
            setStudentData({ fullName: firebaseUser.email });
          }
        } catch (err) {
          console.error('Firestore fetch error:', err);
          setStudentData({ fullName: firebaseUser.email });
        }
        setPage('home');
      } else {
        setUserEmail('');
        setStudentData(null);
        setPage('auth');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = () => {};

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn('Firebase signOut failed:', err);
    }
    setUserEmail('');
    setStudentData(null);
    setSelectedAccommodation(null);
    setSelectedAccommodationForApplication(null);
    setPage('auth');
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
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        flexDirection: 'column',
        gap: '1rem',
      }}>
        <div style={{ fontSize: '3rem' }}>🏠</div>
        <p style={{ color: 'white', fontSize: '1.1rem', fontWeight: 600 }}>
          Loading Biggy Housing...
        </p>
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
      successMessage=""
      defaultEmail={userEmail}
    />
  );
}

export default App;