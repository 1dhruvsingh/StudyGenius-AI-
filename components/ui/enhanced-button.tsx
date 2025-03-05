"use client";

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none relative overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        gradient: 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg',
        premium: 'bg-gradient-to-r from-amber-500 to-pink-500 text-white hover:shadow-lg',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
      state: {
        default: 'opacity-100',
        disabled: 'opacity-50 cursor-not-allowed',
        loading: 'cursor-wait',
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      state: 'default',
    },
  }
);

export interface EnhancedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const EnhancedButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ className, variant, size, state, asChild = false, isLoading = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    
    // Determine the current state
    const currentState = isLoading ? 'loading' : props.disabled ? 'disabled' : 'default';
    
    // Gradient shift animation for premium and gradient variants
    const gradientAnimation = ['gradient', 'premium'].includes(variant as string)
      ? {
          background: {
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            transition: { duration: 3, repeat: Infinity, ease: 'linear' }
          }
        }
      : {};
      
    // Ripple effect state
    const [ripples, setRipples] = React.useState<{ x: number; y: number; id: number }[]>([]);
    const nextRippleId = React.useRef(0);
    
    const addRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (props.disabled || isLoading) return;
      
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const id = nextRippleId.current++;
      setRipples([...ripples, { x, y, id }]);
      
      // Remove ripple after animation completes
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id));
      }, 700);
    };
    
    return (
      <motion.div
        className="relative inline-block"
        whileHover={currentState === 'default' ? { scale: 1.03 } : {}}
        whileTap={currentState === 'default' ? { scale: 0.97 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Comp
          className={cn(buttonVariants({ variant, size, state, className }))}
          ref={ref}
          onMouseDown={addRipple}
          animate={gradientAnimation}
          {...props}
        >
          <motion.span
            className="relative z-10 flex items-center justify-center"
            animate={isLoading ? { opacity: 0.8 } : { opacity: 1 }}
          >
            {children}
          </motion.span>
          
          {/* Loading spinner */}
          {isLoading && (
            <motion.div 
              className="absolute inset-0 z-20 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <svg 
                className="animate-spin h-5 w-5 text-current" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </motion.div>
          )}
          
          {/* Gradient background for premium buttons */}
          {['gradient', 'premium'].includes(variant as string) && (
            <motion.div 
              className={cn(
                "absolute inset-0 z-0",
                variant === 'premium' 
                  ? "bg-gradient-to-r from-amber-500 via-pink-500 to-amber-500 bg-[length:200%_100%]" 
                  : "bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 bg-[length:200%_100%]"
              )}
              initial={{ backgroundPosition: "0% 0%" }}
              animate={{ backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          )}
          
          {/* Ripple animations */}
          {ripples.map(ripple => (
            <motion.span
              key={ripple.id}
              className="absolute rounded-full bg-white/30 pointer-events-none z-0"
              style={{ left: ripple.x, top: ripple.y, marginLeft: "-0.5rem", marginTop: "-0.5rem" }}
              initial={{ width: 0, height: 0, opacity: 0.6 }}
              animate={{ width: 150, height: 150, opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          ))}
        </Comp>
      </motion.div>
    );
  }
);
EnhancedButton.displayName = 'EnhancedButton';

export { EnhancedButton, buttonVariants };
