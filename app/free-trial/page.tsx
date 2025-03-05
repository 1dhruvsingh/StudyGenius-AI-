"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { activateFreeTrial } from "@/lib/auth-utils";
import { EnhancedNavbar } from "@/components/enhanced-navbar";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Brain, BookOpen, FileText, PenTool, Sparkles, CheckCircle2, ArrowRight, Calendar } from "lucide-react";
import { containerClass } from "@/lib/utils";

export default function FreeTrialPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Protection against unauthorized access
    if (!user) {
      router.push("/login");
      return;
    }
    
    // Animate progress bar
    const timer = setTimeout(() => setProgress(100), 500);
    return () => clearTimeout(timer);
  }, [user, router]);

  const startTrial = async () => {
    try {
      const result = await activateFreeTrial();
      
      if (result.success) {
        toast({
          title: "Free trial activated!",
          description: "Your 14-day trial has been activated. Enjoy all premium features!",
        });
        
        // Redirect to dashboard after activating free trial
        router.push("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Activation failed",
          description: result.error || "Could not activate your free trial. Please try again."
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Activation failed",
        description: "An unexpected error occurred. Please try again."
      });
    }
  };

  // Plan features
  const features = [
    {
      title: "AI Summary Generation",
      description: "Create concise summaries of your study materials with advanced AI",
      icon: <Brain className="h-5 w-5 text-primary" />,
    },
    {
      title: "Practice Question Generator",
      description: "Create custom practice questions based on your uploaded documents",
      icon: <PenTool className="h-5 w-5 text-primary" />,
    },
    {
      title: "Study Notes Creator",
      description: "Generate comprehensive study notes for any topic",
      icon: <FileText className="h-5 w-5 text-primary" />,
    },
    {
      title: "Exam Predictions",
      description: "Get AI-powered predictions on potential exam questions",
      icon: <Sparkles className="h-5 w-5 text-primary" />,
    },
    {
      title: "Unlimited Uploads",
      description: "Upload as many documents as you need during your trial period",
      icon: <BookOpen className="h-5 w-5 text-primary" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <EnhancedNavbar />
      
      <main className="flex-1">
        <div className={containerClass("py-12")}>
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Welcome to Your Free Trial!</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Hello{user?.name ? `, ${user.name}` : ""}! You're just one step away from unlocking all premium features.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Start Your 14-Day Free Trial</CardTitle>
                <CardDescription>
                  Experience all premium features with no commitment. No credit card required.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Progress value={progress} className="h-2 w-full" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-lg border bg-card/50"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="mt-0.5">{feature.icon}</div>
                      <div>
                        <h3 className="font-medium">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="p-4 bg-secondary/20 rounded-lg flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                  <p className="text-sm">
                    <span className="font-medium">Free for 14 days:</span> Your trial will automatically end after 14 days — no automatic billing, no commitments.
                  </p>
                </div>
                
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/pricing">View Pricing Plans</Link>
                </Button>
                <Button onClick={startTrial} className="gap-2">
                  Start Free Trial <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>What's Included</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {['Unlimited document uploads', 'AI summary generation', 'Study notes creation', 'Practice questions', 'Exam predictions', 'Priority support'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>After Your Trial</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    When your 14-day trial ends, you can choose to subscribe to one of our flexible plans or continue with limited features on our free tier.
                  </p>
                  <div className="mt-4">
                    <Link href="/pricing" className="text-sm text-primary hover:underline">
                      Compare plans →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <SiteFooter />
    </div>
  );
}
