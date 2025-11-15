'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  signOut, 
  onAuthStateChanged, 
  User, 
  getAuth 
} from 'firebase/auth';
import { firebaseApp } from '@/lib/firebase/client';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (useRedirect?: boolean) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    // Check for redirect result on mount
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          console.log('Login successful via redirect:', result.user.email);
        }
      } catch (error) {
        console.error('Redirect result error:', error);
      }
    };
    
    checkRedirectResult();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const login = async (useRedirect: boolean = false) => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    
    try {
      if (useRedirect) {
        // Use redirect for better mobile support
        await signInWithRedirect(auth, provider);
      } else {
        // Use popup for desktop
        const result = await signInWithPopup(auth, provider);
        console.log('Login successful:', result.user.email);
      }
    } catch (error) {
      console.error("Authentication failed:", error);
      const firebaseError = error as { code?: string; message?: string };
      console.error("Error code:", firebaseError.code);
      console.error("Error message:", firebaseError.message);
      
      // Show user-friendly error
      if (firebaseError.code === 'auth/popup-blocked') {
        alert('Popup was blocked! Trying redirect method...');
        // Fallback to redirect
        await signInWithRedirect(auth, provider);
      } else if (firebaseError.code === 'auth/popup-closed-by-user') {
        alert('Login cancelled. Please try again.');
      } else if (firebaseError.code === 'auth/unauthorized-domain') {
        alert('This domain is not authorized. Please contact the administrator.');
      } else {
        alert(`Login failed: ${firebaseError.message || 'Unknown error'}`);
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
