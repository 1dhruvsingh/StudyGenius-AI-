// Basic user authentication utilities
// Note: In a production app, you would use a proper auth solution like NextAuth.js, Auth0, etc.

import { User, LoginCredentials, SignupCredentials } from './auth-types';

// Simulated auth functions - in a real app these would interact with a backend API
export async function loginUser(credentials: LoginCredentials): Promise<{ user: User | null; error?: string }> {
  // This is a mock implementation for demo purposes
  // In a real app, this would make an API call to your backend
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo: accept any email that looks valid with any password
    if (!credentials.email.includes('@') || !credentials.password) {
      return { user: null, error: 'Invalid email or password' };
    }
    
    // Mock successful login
    return {
      user: {
        id: 'user-' + Math.random().toString(36).substr(2, 9),
        email: credentials.email,
        name: credentials.email.split('@')[0],
        isVerified: true,
        trialStatus: {
          isActive: false, // For login we assume they haven't started a trial yet
          startDate: null,
          endDate: null
        },
        subscription: {
          plan: 'free',
          isActive: true
        }
      }
    };
  } catch (error) {
    return { user: null, error: 'An unexpected error occurred' };
  }
}

export async function signupUser(credentials: SignupCredentials): Promise<{ user: User | null; error?: string }> {
  // This is a mock implementation for demo purposes
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple validation
    if (!credentials.email.includes('@')) {
      return { user: null, error: 'Invalid email address' };
    }
    
    if (!credentials.name || credentials.name.length < 2) {
      return { user: null, error: 'Name is required and must be at least 2 characters' };
    }
    
    if (!credentials.password || credentials.password.length < 6) {
      return { user: null, error: 'Password must be at least 6 characters' };
    }
    
    // Mock successful signup
    return {
      user: {
        id: 'user-' + Math.random().toString(36).substr(2, 9),
        email: credentials.email,
        name: credentials.name,
        isVerified: false,
        trialStatus: {
          isActive: false, // They haven't activated the trial yet
          startDate: null,
          endDate: null
        },
        subscription: {
          plan: 'free',
          isActive: true
        }
      }
    };
  } catch (error) {
    return { user: null, error: 'An unexpected error occurred' };
  }
}

export function storeUserSession(user: User): void {
  // In a real app, you would store tokens, expiry, etc.
  // For this demo, we'll just use localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
}

export function getUserSession(): User | null {
  if (typeof window !== 'undefined') {
    const userJSON = localStorage.getItem('user');
    if (userJSON) {
      try {
        return JSON.parse(userJSON) as User;
      } catch (e) {
        return null;
      }
    }
  }
  return null;
}

export function clearUserSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
}

export function forgotPassword(email: string): Promise<{ success: boolean; error?: string }> {
  // Mock implementation
  return new Promise(resolve => {
    setTimeout(() => {
      if (!email || !email.includes('@')) {
        resolve({ success: false, error: 'Please enter a valid email address' });
      } else {
        resolve({ success: true });
      }
    }, 1000);
  });
}

// Function to activate a user's free trial
export function activateFreeTrial(): Promise<{ success: boolean; error?: string }> {
  // This is a mock implementation for demo purposes
  // In a real app, this would make an API call to your backend
  
  return new Promise(resolve => {
    setTimeout(() => {
      try {
        // Get the current user
        const user = getUserSession();
        
        if (!user) {
          resolve({ success: false, error: 'No authenticated user found' });
          return;
        }
        
        // Update trial status
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 14); // 14-day trial
        
        const updatedUser = {
          ...user,
          trialStatus: {
            isActive: true,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString()
          }
        };
        
        // Update user in storage
        storeUserSession(updatedUser);
        
        resolve({ success: true });
      } catch (error) {
        resolve({ success: false, error: 'Failed to activate trial' });
      }
    }, 800);
  });
}
