"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  LoginCredentials,
  SignupCredentials
} from './auth-types';

import {
  loginUser,
  signupUser,
  getUserSession,
  storeUserSession,
  clearUserSession
} from './auth-utils';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  signup: (credentials: SignupCredentials) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = getUserSession();
    setUser(savedUser);
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const result = await loginUser(credentials);
      
      if (result.user) {
        setUser(result.user);
        storeUserSession(result.user);
        
        // Check if user has an active trial or subscription
        // In a real app, this would be determined by user data from backend
        const hasActiveTrial = false; // Mock value, should come from API
        
        // Redirect new users to free trial first time they login
        if (!hasActiveTrial) {
          router.push('/free-trial');
        } else {
          router.push('/dashboard');
        }
        
        setIsLoading(false);
        return { success: true };
      } else {
        setIsLoading(false);
        return { success: false, error: result.error };
      }
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const signup = async (credentials: SignupCredentials): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const result = await signupUser(credentials);
      
      if (result.user) {
        setUser(result.user);
        storeUserSession(result.user);
        
        // New signups should always go to free trial page
        router.push('/free-trial');
        
        setIsLoading(false);
        return { success: true };
      } else {
        setIsLoading(false);
        return { success: false, error: result.error };
      }
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logout = () => {
    clearUserSession();
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
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
