export interface User {
  id: string;
  email: string;
  name: string;
  isVerified: boolean;
  trialStatus?: {
    isActive: boolean;
    startDate?: string;
    endDate?: string;
  };
  subscription?: {
    plan: 'free' | 'basic' | 'premium' | 'academic';
    isActive: boolean;
    startDate?: string;
    endDate?: string;
    billingCycle?: 'monthly' | 'annual';
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthFormState {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
}

export interface AuthError {
  field?: 'email' | 'password' | 'name' | 'confirmPassword' | 'general';
  message: string;
}
