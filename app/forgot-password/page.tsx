"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Mail, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { forgotPassword } from "@/lib/auth-utils";

// Form validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    try {
      const result = await forgotPassword(data.email);
      
      if (result.success) {
        setIsSubmitted(true);
        toast({
          title: "Reset email sent",
          description: "Check your inbox for password reset instructions",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "Failed to send reset email. Please try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 dark:from-background dark:to-secondary/10 p-4">
      <div className="w-full max-w-md space-y-8">
        <motion.div 
          className="flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="flex items-center justify-center gap-2 mb-2">
            <motion.div
              whileHover={{ 
                scale: 1.1,
                rotate: [0, -10, 10, -5, 5, 0],
                transition: { duration: 0.5 }
              }}
            >
              <Brain className="h-10 w-10 text-primary" />
            </motion.div>
            <h1 className="text-2xl font-bold">StudyGenius AI</h1>
          </Link>
          <p className="text-muted-foreground">Reset your password</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="forgot-password-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="backdrop-blur-sm bg-card/80 dark:bg-card/50 shadow-xl border dark:border-gray-800">
                <CardHeader>
                  <CardTitle className="text-2xl">Forgot password?</CardTitle>
                  <CardDescription>
                    Enter your email address and we'll send you instructions to reset your password.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" /> 
                        Email address
                      </Label>
                      <Input
                        id="email"
                        placeholder="you@example.com"
                        {...register("email")}
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && (
                        <motion.p 
                          className="text-destructive text-sm"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {errors.email.message}
                        </motion.p>
                      )}
                    </div>

                    <EnhancedButton
                      type="submit"
                      className="w-full mt-6"
                      isLoading={isLoading}
                      variant="default"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                        </span>
                      ) : (
                        <span>Send reset instructions</span>
                      )}
                    </EnhancedButton>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Link 
                    href="/login" 
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    <ArrowLeft className="h-3 w-3" /> Back to login
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="forgot-password-success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="backdrop-blur-sm bg-card/80 dark:bg-card/50 shadow-xl border dark:border-gray-800">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <CheckCircle2 className="h-16 w-16 text-green-500" />
                    </motion.div>
                  </div>
                  <CardTitle className="text-2xl text-center">Check your email</CardTitle>
                  <CardDescription className="text-center">
                    We've sent password reset instructions to your email address. Please check your inbox and follow the instructions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                  <p>Didn't receive an email? Check your spam folder or try again.</p>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <EnhancedButton
                    className="w-full"
                    variant="outline"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Try again
                  </EnhancedButton>
                  <Link href="/login" className="w-full">
                    <EnhancedButton
                      className="w-full"
                      variant="secondary"
                    >
                      Back to login
                    </EnhancedButton>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
