"use client";

import { motion } from "framer-motion";
import { 
  FileUp, 
  FileText, 
  Brain, 
  Calendar, 
  Clock, 
  Download, 
  Sparkles, 
  Zap, 
  BookOpen 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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

  const features = [
    {
      icon: FileUp,
      title: "Easy File Upload",
      description: "Upload PDFs, docs, slides, and images with text in seconds",
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      icon: FileText,
      title: "Smart Notes Generation",
      description: "AI creates comprehensive, well-structured study notes",
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      icon: Brain,
      title: "Exam Question Prediction",
      description: "Get likely exam questions based on your materials",
      color: "bg-pink-500/10 text-pink-500",
    },
    {
      icon: Calendar,
      title: "Study Planning",
      description: "Personalized study schedules based on your learning pace",
      color: "bg-green-500/10 text-green-500",
    },
    {
      icon: Clock,
      title: "Time-Saving",
      description: "Reduce study prep time by up to 60%",
      color: "bg-amber-500/10 text-amber-500",
    },
    {
      icon: Download,
      title: "Multiple Export Formats",
      description: "Save your notes as PDF, Markdown, or flashcards",
      color: "bg-indigo-500/10 text-indigo-500",
    },
    {
      icon: Sparkles,
      title: "Interactive Learning",
      description: "Highlight, annotate, and customize your study materials",
      color: "bg-cyan-500/10 text-cyan-500",
    },
    {
      icon: Zap,
      title: "Fast Processing",
      description: "Get your study materials processed in minutes, not hours",
      color: "bg-red-500/10 text-red-500",
    },
    {
      icon: BookOpen,
      title: "Multi-Subject Support",
      description: "Works across all academic disciplines and subjects",
      color: "bg-emerald-500/10 text-emerald-500",
    },
  ];

  return (
    <section className="py-20 bg-muted/50 w-full">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Smarter Studying</h2>
          <p className="text-xl text-muted-foreground">
            Our AI-powered platform transforms how you prepare for exams with these innovative features
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader>
                  <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-4", feature.color)}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}