"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, FileText, Brain, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 3000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const fileVariants = {
    initial: { x: 0, y: 0, opacity: 1 },
    animate: {
      x: [0, -10, -20],
      y: [0, -40, -20],
      opacity: [1, 0.8, 0],
      transition: { duration: 1 },
    },
  };

  const brainVariants = {
    initial: { scale: 1, opacity: 0 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0, 1, 1],
      transition: { duration: 1, delay: 0.5 },
    },
  };

  const noteVariants = {
    initial: { x: 20, y: 0, opacity: 0 },
    animate: {
      x: [20, 10, 0],
      y: [0, -20, 0],
      opacity: [0, 0.8, 1],
      transition: { duration: 1, delay: 1.5 },
    },
  };

  return (
    <section className="relative py-20 md:py-28 overflow-hidden w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10" />
      
      <div className="container relative mx-auto px-4">
        <motion.div
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            variants={itemVariants}
          >
            Transform Your Study Materials with <span className="text-primary">AI</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl"
            variants={itemVariants}
          >
            Upload your lecture notes, textbooks, and slides. Get comprehensive study notes and exam predictions instantly.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mb-16"
            variants={itemVariants}
          >
            <Button size="lg" asChild>
              <Link href="/signup">
                Start Free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/payment?plan=premium&billing=monthly">
                Go Premium
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/features">See How It Works</Link>
            </Button>
          </motion.div>
          
          <motion.div 
            className="relative h-64 w-full max-w-2xl mx-auto bg-card rounded-xl shadow-lg overflow-hidden border"
            variants={itemVariants}
            onClick={startAnimation}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {!isAnimating ? (
                <div className="text-center p-6">
                  <p className="text-lg font-medium mb-2">See the magic in action</p>
                  <p className="text-muted-foreground mb-4">Click to see how StudyGenius transforms your documents</p>
                  <Button>Animate Process</Button>
                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center">
                  <motion.div
                    className="absolute"
                    variants={fileVariants}
                    initial="initial"
                    animate={isAnimating ? "animate" : "initial"}
                  >
                    <FileText className="h-16 w-16 text-blue-500" />
                  </motion.div>
                  
                  <motion.div
                    className="absolute"
                    variants={brainVariants}
                    initial="initial"
                    animate={isAnimating ? "animate" : "initial"}
                  >
                    <Brain className="h-20 w-20 text-primary" />
                  </motion.div>
                  
                  <motion.div
                    className="absolute"
                    variants={noteVariants}
                    initial="initial"
                    animate={isAnimating ? "animate" : "initial"}
                  >
                    <div className="w-48 h-32 bg-white dark:bg-gray-800 rounded-md shadow-md p-3">
                      <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                      <div className="w-3/4 h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                      <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                      <div className="w-5/6 h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                      <div className="w-4/5 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
            variants={containerVariants}
          >
            <motion.div 
              className="flex flex-col items-center text-center"
              variants={itemVariants}
            >
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Comprehensive Notes</h3>
              <p className="text-muted-foreground">AI-generated study notes from your uploaded materials</p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center text-center"
              variants={itemVariants}
            >
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Exam Predictions</h3>
              <p className="text-muted-foreground">Get likely exam questions based on your study materials</p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center text-center"
              variants={itemVariants}
            >
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Study Dashboard</h3>
              <p className="text-muted-foreground">Track progress and organize your study materials</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}