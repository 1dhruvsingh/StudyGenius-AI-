import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, FileUp, FileText, Brain, Calendar, Clock, Download, Sparkles, Zap, BookOpen, CheckCircle2 } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      icon: FileUp,
      title: "Smart Document Upload",
      description: "Upload any academic document - PDFs, Word docs, PowerPoint slides, or even images with text. Our system automatically extracts and processes the content.",
      details: [
        "Support for multiple file formats",
        "OCR technology for text extraction from images",
        "Batch upload capability",
        "Automatic document categorization",
        "Secure cloud storage"
      ]
    },
    {
      icon: FileText,
      title: "AI-Powered Note Generation",
      description: "Our advanced AI analyzes your documents and generates comprehensive, well-structured study notes that capture all key concepts and information.",
      details: [
        "Contextual understanding of academic content",
        "Hierarchical organization of information",
        "Key concept highlighting",
        "Citation and reference tracking",
        "Custom formatting options"
      ]
    },
    {
      icon: Brain,
      title: "Exam Question Prediction",
      description: "Based on your study materials and past exam patterns, our AI predicts likely exam questions to focus your study efforts where they matter most.",
      details: [
        "Pattern recognition from past exams",
        "Topic importance weighting",
        "Question difficulty estimation",
        "Custom practice test generation",
        "Performance analytics on practice questions"
      ]
    },
    {
      icon: Calendar,
      title: "Personalized Study Planning",
      description: "Get a customized study schedule based on your learning pace, exam dates, and content complexity to optimize your preparation time.",
      details: [
        "Adaptive scheduling based on performance",
        "Spaced repetition implementation",
        "Exam countdown integration",
        "Study session time recommendations",
        "Calendar app integration"
      ]
    },
    {
      icon: Sparkles,
      title: "Interactive Learning Tools",
      description: "Engage with your study materials through interactive tools like highlighting, annotation, flashcards, and quizzes to enhance retention.",
      details: [
        "Text highlighting and annotation",
        "Collaborative note sharing",
        "Automatic flashcard generation",
        "Interactive quiz creation",
        "Voice notes and dictation"
      ]
    },
    {
      icon: Zap,
      title: "Fast Processing Technology",
      description: "Our optimized AI processing delivers your study materials in minutes, not hours, so you can start studying right away.",
      details: [
        "Parallel processing architecture",
        "Intelligent caching system",
        "Priority processing for premium users",
        "Background processing notifications",
        "Offline access to processed materials"
      ]
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Powerful Features for Smarter Studying</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Discover how StudyGenius AI transforms your study materials into powerful learning tools
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/signup">
                    Try It Free <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/payment?plan=premium&billing=monthly">
                    Go Premium
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Features */}
        <section className="py-20">
          <div className="container">
            <div className="space-y-24">
              {features.map((feature, index) => (
                <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="mb-6 inline-block rounded-2xl bg-primary/10 p-4">
                      <feature.icon className="h-10 w-10 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">{feature.title}</h2>
                    <p className="text-xl text-muted-foreground mb-6">{feature.description}</p>
                    <ul className="space-y-3">
                      {feature.details.map((detail, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`bg-muted rounded-xl p-8 h-80 flex items-center justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <feature.icon className="h-32 w-32 text-primary/40" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience These Features?</h2>
              <p className="text-xl mb-8 text-primary-foreground/80">
                Join thousands of students who are already studying smarter with StudyGenius AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/signup">
                    Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/20 hover:bg-primary-foreground/10" asChild>
                  <Link href="/payment?plan=premium&billing=monthly">Go Premium</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/20 hover:bg-primary-foreground/10" asChild>
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}