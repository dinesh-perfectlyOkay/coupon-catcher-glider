import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '@/types';
import { getUserData, getCookies } from '@/utils/api';
import { toast } from 'sonner';

interface AuthContextType extends AuthState {
  login: () => void;
  logout: () => void;
  refreshUserData: () => Promise<void>;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
  error: null
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(initialState);
  
  const refreshUserData = async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const cookies = getCookies();
      if (!cookies) {
        setAuthState({
          isAuthenticated: false,
          user: null,
          isLoading: false,
          error: null
        });
        return;
      }
      
      const userData = await getUserData(cookies);
      
      setAuthState({
        isAuthenticated: true,
        user: userData,
        isLoading: false,
        error: null
      });
    } catch (error) {
      console.error('Failed to refresh user data:', error);
      setAuthState({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to authenticate'
      });
    }
  };
  
  useEffect(() => {
    refreshUserData();
  }, []);
  
  const login = () => {
    // Open the login page in a new tab
    const loginUrl = 'https://staging.coupons.fit/login';
    window.open(loginUrl, '_blank');
    
    toast("Please log in on the opened page and return here when done.");
    
    // We could set up a message listener for cross-window communication
    // but for simplicity, we'll require the user to manually refresh
  };
  
  const logout = () => {
    // Clear any cookies or tokens as needed
    document.cookie = 'auth=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null
    });
    
    toast("You have been logged out successfully.");
  };
  
  const value = {
    ...authState,
    login,
    logout,
    refreshUserData
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
