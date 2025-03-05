// This is a mock payment service for demonstration purposes
import { useState } from 'react';

import { User } from './auth-types';
import { getUserSession, storeUserSession } from './auth-utils';

export interface PaymentMethod {
  id: string;
  cardType: 'visa' | 'mastercard' | 'amex' | 'discover' | 'generic';
  lastFour: string;
  expiryMonth: string;
  expiryYear: string;
  cardholderName: string;
  isDefault: boolean;
}

export interface PaymentDetails {
  cardNumber: string;
  cardName: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  saveCard?: boolean;
}

export interface SubscriptionPlan {
  name: 'free' | 'premium' | 'academic';
  billingCycle: 'monthly' | 'annual';
  price: number;
  startDate: string;
  endDate: string;
}

export interface PaymentResult {
  success: boolean;
  error?: string;
  transactionId?: string;
  subscription?: SubscriptionPlan;
}

/**
 * Process a payment and activate subscription
 * In a real app, this would integrate with a payment processor like Stripe
 */
export async function processPayment(
  planType: string, 
  billingCycle: string,
  amount: number,
  paymentDetails: PaymentDetails
): Promise<PaymentResult> {
  try {
    // In a real implementation, this would call the payment processor API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock successful payment
    const transactionId = `txn-${Math.random().toString(36).substring(2, 12)}`;
    
    // Update user with subscription information
    const user = getUserSession();
    
    if (!user) {
      return {
        success: false,
        error: 'User not found. Please log in before subscribing.'
      };
    }
    
    // Calculate subscription dates
    const startDate = new Date();
    const endDate = new Date();
    
    if (billingCycle === 'monthly') {
      endDate.setMonth(endDate.getMonth() + 1);
    } else {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }
    
    // Create subscription plan
    const subscription: SubscriptionPlan = {
      name: planType === 'premium' ? 'premium' : 'academic' as 'premium' | 'academic',
      billingCycle: billingCycle === 'monthly' ? 'monthly' : 'annual',
      price: amount,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    };
    
    // Update user with subscription information
    const updatedUser: User = {
      ...user,
      subscription: {
        plan: subscription.name,
        isActive: true
      },
      // Deactivate trial if user is subscribing
      trialStatus: {
        isActive: false,
        startDate: undefined,
        endDate: undefined
      }
    };
    
    // Save updated user
    storeUserSession(updatedUser);
    
    return {
      success: true,
      transactionId,
      subscription
    };
    
  } catch (error) {
    console.error('Payment processing error:', error);
    return {
      success: false,
      error: 'An error occurred while processing your payment. Please try again.'
    };
  }
}

/**
 * Check if a user has an active subscription
 */
export function hasActiveSubscription(user?: User | null): boolean {
  if (!user) return false;
  return user.subscription?.isActive || false;
}

/**
 * Get the name of the user's current plan
 */
export function getUserPlanName(user?: User | null): string {
  if (!user) return 'Free';
  if (!user.subscription?.isActive) return 'Free';
  return user.subscription.plan.charAt(0).toUpperCase() + user.subscription.plan.slice(1);
}

// Mock storage for payment methods (in a real app, this would be stored in a database)
const userPaymentMethods: Record<string, PaymentMethod[]> = {};

/**
 * Get all payment methods for a user
 */
export function getUserPaymentMethods(userId: string): PaymentMethod[] {
  return userPaymentMethods[userId] || [];
}

/**
 * Add a new payment method for a user
 */
export function addPaymentMethod(userId: string, paymentMethod: Omit<PaymentMethod, 'id'>): PaymentMethod {
  // Generate a random ID for the payment method
  const id = `pm_${Math.random().toString(36).substr(2, 9)}`;
  
  // Create the new payment method
  const newMethod: PaymentMethod = {
    ...paymentMethod,
    id
  };
  
  // Get the user's existing payment methods
  const methods = getUserPaymentMethods(userId);
  
  // If this is the first method or set as default, update all other methods
  if (methods.length === 0 || newMethod.isDefault) {
    // Set all existing methods to non-default
    const updatedMethods = methods.map(method => ({
      ...method,
      isDefault: false
    }));
    
    // Add the new method
    userPaymentMethods[userId] = [...updatedMethods, newMethod];
  } else {
    // Add the new method without changing defaults
    userPaymentMethods[userId] = [...methods, newMethod];
  }
  
  return newMethod;
}

/**
 * Update an existing payment method
 */
export function updatePaymentMethod(userId: string, methodId: string, updates: Partial<Omit<PaymentMethod, 'id'>>): PaymentMethod | null {
  // Get the user's existing payment methods
  const methods = getUserPaymentMethods(userId);
  
  // Find the method to update
  const methodIndex = methods.findIndex(method => method.id === methodId);
  
  if (methodIndex === -1) {
    return null;
  }
  
  // Create the updated method
  const updatedMethod: PaymentMethod = {
    ...methods[methodIndex],
    ...updates
  };
  
  // If setting as default, update all other methods
  if (updates.isDefault) {
    // Set all methods to non-default
    methods.forEach(method => {
      method.isDefault = false;
    });
  }
  
  // Update the method
  methods[methodIndex] = updatedMethod;
  
  // Update the user's payment methods
  userPaymentMethods[userId] = methods;
  
  return updatedMethod;
}

/**
 * Delete a payment method
 */
export function deletePaymentMethod(userId: string, methodId: string): boolean {
  // Get the user's existing payment methods
  const methods = getUserPaymentMethods(userId);
  
  // Find the method to delete
  const methodIndex = methods.findIndex(method => method.id === methodId);
  
  if (methodIndex === -1) {
    return false;
  }
  
  // Check if it's the default method
  const isDefault = methods[methodIndex].isDefault;
  
  // Remove the method
  methods.splice(methodIndex, 1);
  
  // If we removed the default method and there are still methods left, set a new default
  if (isDefault && methods.length > 0) {
    methods[0].isDefault = true;
  }
  
  // Update the user's payment methods
  userPaymentMethods[userId] = methods;
  
  return true;
}

/**
 * Set a payment method as the default
 */
export function setDefaultPaymentMethod(userId: string, methodId: string): boolean {
  // Get the user's existing payment methods
  const methods = getUserPaymentMethods(userId);
  
  // Find the method to set as default
  const methodIndex = methods.findIndex(method => method.id === methodId);
  
  if (methodIndex === -1) {
    return false;
  }
  
  // Set all methods to non-default
  methods.forEach(method => {
    method.isDefault = false;
  });
  
  // Set the specified method as default
  methods[methodIndex].isDefault = true;
  
  // Update the user's payment methods
  userPaymentMethods[userId] = methods;
  
  return true;
}

/**
 * Get the default payment method for a user
 */
export function getDefaultPaymentMethod(userId: string): PaymentMethod | null {
  // Get the user's existing payment methods
  const methods = getUserPaymentMethods(userId);
  
  // Find the default method
  const defaultMethod = methods.find(method => method.isDefault);
  
  return defaultMethod || null;
}

/**
 * Mock function to validate card details
 * In a real app, this would be handled by the payment processor
 */
export function validateCardDetails(details: PaymentDetails): { valid: boolean; error?: string } {
  // Basic validation
  if (!details.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
    return { valid: false, error: 'Invalid card number' };
  }
  
  if (!details.cardName.trim()) {
    return { valid: false, error: 'Cardholder name is required' };
  }
  
  if (!details.expiryMonth || !details.expiryYear) {
    return { valid: false, error: 'Expiry date is required' };
  }
  
  if (!details.cvv.match(/^\d{3}$/)) {
    return { valid: false, error: 'Invalid CVV' };
  }
  
  // Check if card is expired
  const now = new Date();
  const expiryDate = new Date(
    parseInt(`20${details.expiryYear}`), 
    parseInt(details.expiryMonth) - 1, 
    1
  );
  
  if (expiryDate < now) {
    return { valid: false, error: 'Card has expired' };
  }
  
  return { valid: true };
}
