import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Get additional user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.exists() ? userDoc.data() : {};
        
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          phoneNumber: user.phoneNumber,
          ...userData
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Email/Password Registration
  const register = async (email, password, userData) => {
    try {
      setError('');
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile
      await updateProfile(result.user, {
        displayName: userData.name
      });

      // Store additional user data in Firestore
      await setDoc(doc(db, 'users', result.user.uid), {
        name: userData.name,
        email: email,
        phoneNumber: userData.phoneNumber || '',
        emergencyContact: userData.emergencyContact || '',
        digitalId: `T-${Date.now()}`, // Generate unique digital ID
        createdAt: new Date().toISOString(),
        role: 'tourist'
      });

      return result.user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Email/Password Login
  const login = async (email, password) => {
    try {
      setError('');
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Google Sign In
  const signInWithGoogle = async () => {
    try {
      setError('');
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Check if user document exists, if not create one
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', result.user.uid), {
          name: result.user.displayName,
          email: result.user.email,
          phoneNumber: result.user.phoneNumber || '',
          emergencyContact: '',
          digitalId: `T-${Date.now()}`,
          createdAt: new Date().toISOString(),
          role: 'tourist'
        });
      }
      
      return result.user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Phone Authentication Setup
  const setupRecaptcha = (elementId) => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, elementId, {
      size: 'invisible',
      callback: (response) => {
        console.log('Recaptcha verified');
      }
    });
  };

  // Send OTP to Phone
  const sendOTP = async (phoneNumber) => {
    try {
      setError('');
      if (!window.recaptchaVerifier) {
        setupRecaptcha('recaptcha-container');
      }
      
      const confirmationResult = await signInWithPhoneNumber(
        auth, 
        phoneNumber, 
        window.recaptchaVerifier
      );
      
      return confirmationResult;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Verify OTP
  const verifyOTP = async (confirmationResult, otp, userData = null) => {
    try {
      setError('');
      const result = await confirmationResult.confirm(otp);
      
      // If this is a new user registration via phone
      if (userData) {
        await setDoc(doc(db, 'users', result.user.uid), {
          name: userData.name,
          email: userData.email || '',
          phoneNumber: result.user.phoneNumber,
          emergencyContact: userData.emergencyContact || '',
          digitalId: `T-${Date.now()}`,
          createdAt: new Date().toISOString(),
          role: 'tourist'
        });
      }
      
      return result.user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      setError('');
      await signOut(auth);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Update User Profile
  const updateUserProfile = async (userData) => {
    try {
      setError('');
      if (user) {
        await setDoc(doc(db, 'users', user.uid), userData, { merge: true });
        setUser(prev => ({ ...prev, ...userData }));
      }
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    error,
    register,
    login,
    signInWithGoogle,
    setupRecaptcha,
    sendOTP,
    verifyOTP,
    logout,
    updateUserProfile,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};