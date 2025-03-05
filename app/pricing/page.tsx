"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check, X, HelpCircle } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  const plans = [
    {
      name: "Free",
      description: "For casual students",
      price: { monthly: 0, annual: 0 },
      features: [
        { name: "File uploads", value: "5 per month", included: true },
        { name: "Notes generation", value: "Basic", included: true },
        { name: "Exam prediction", value: "Topic-level only", included: true },
        { name: "Processing time", value: "Standard", included: true },
        { name: "Ad-free experience", value: "", included: false },
        { name: "Advanced formatting", value: "", included: false },
        { name: "Export options", value: "PDF only", included: true },
        { name: "Flash card generation", value: "", included: false },
        { name: "Study schedule", value: "", included: false },
        { name: "Multi-subject correlation", value: "", included: false },
        { name: "Study group collaboration", value: "", included: false },
        { name: "Priority support", value: "", included: false },
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Premium",
      description: "For dedicated students",
      price: { monthly: 9.99, annual: 99.99 },
      features: [
        { name: "File uploads", value: "Unlimited", included: true },
        { name: "Notes generation", value: "Advanced with citations", included: true },
        { name: "Exam prediction", value: "Detailed with sample questions", included: true },
        { name: "Processing time", value: "Priority", included: true },
        { name: "Ad-free experience", value: "", included: true },
        { name: "Advanced formatting", value: "", included: true },
        { name: "Export options", value: "Multiple formats", included: true },
        { name: "Flash card generation", value: "", included: true },
        { name: "Study schedule", value: "Basic suggestions", included: true },
        { name: "Multi-subject correlation", value: "", included: false },
        { name: "Study group collaboration", value: "", included: false },
        { name: "Priority support", value: "Email only", included: true },
      ],
      cta: "Upgrade Now",
      popular: true,
    },
    {
      name: "Academic",
      description: "For serious academic achievers",
      price: { monthly: 19.99, annual: 199.99 },
      features: [
        { name: "File uploads", value: "Unlimited", included: true },
        { name: "Notes generation", value: "Advanced with citations", included: true },
        { name: "Exam prediction", value: "Advanced with success probability", included: true },
        { name: "Processing time", value: "Priority+", included: true },
        { name: "Ad-free experience", value: "", included: true },
        { name: "Advanced formatting", value: "", included: true },
        { name: "Export options", value: "All formats + custom", included: true },
        { name: "Flash card generation", value: "Advanced", included: true },
        { name: "Study schedule", value: "Personalized", included: true },
        { name: "Multi-subject correlation", value: "", included: true },
        { name: "Study group collaboration", value: "", included: true },
        { name: "Priority support", value: "24/7 chat & email", included: true },
      ],
      cta: "Go Academic",
      popular: false,
    },
  ];

  const faqs = [
    {
      question: "Can I cancel my subscription at any time?",
      answer: "Yes, you can cancel your subscription at any time. If you cancel, you'll continue to have access to your paid plan until the end of your billing period."
    },
    {
      question: "Is there a limit to how many documents I can upload?",
      answer: "Free users can upload up to 5 documents per month with a maximum of 20 pages each. Premium and Academic users have unlimited uploads."
    },
    {
      question: "How accurate are the exam predictions?",
      answer: "Our exam predictions are based on analyzing patterns in your study materials and, when available, past exams. While we can't guarantee specific questions, users report that our predictions cover 70-80% of actual exam content areas."
    },
    {
      question: "Can I use StudyGenius for any subject?",
      answer: "Yes! StudyGenius works across all academic disciplines including sciences, humanities, business, law, medicine, engineering, and more."
    },
    {
      question: "Do you offer student discounts?",
      answer: "Yes, we offer a 20% discount for verified students. Contact our support team with your student ID to receive your discount code."
    },
    {
      question: "What happens to my notes if I downgrade my plan?",
      answer: "If you downgrade, you'll retain access to all previously generated notes, but new uploads and features will be limited to your current plan's capabilities."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use industry-standard encryption and security practices. Your study materials are private and never shared with other users. We only use anonymized data to improve our AI models."
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Choose the plan that fits your study needs and academic goals
              </p>
              
              <div className="flex items-center justify-center space-x-4 mb-8">
                <Label htmlFor="billing-toggle" className={annual ? "text-muted-foreground" : "font-medium"}>Monthly</Label>
                <Switch
                  id="billing-toggle"
                  checked={annual}
                  onCheckedChange={setAnnual}
                />
                <div className="flex items-center">
                  <Label htmlFor="billing-toggle" className={!annual ? "text-muted-foreground" : "font-medium"}>Annual</Label>
                  <span className="ml-2 text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-2 py-0.5 rounded-full">
                    Save 20%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <Card key={index} className={`flex flex-col h-full relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                  {plan.popular && (
                    <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                      <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">
                        ${annual ? plan.price.annual : plan.price.monthly}
                      </span>
                      {plan.price.monthly > 0 && (
                        <span className="text-muted-foreground ml-2">
                          {annual ? "/year" : "/month"}
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-4">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground mr-3 shrink-0" />
                          )}
                          <div>
                            <span className={feature.included ? "" : "text-muted-foreground"}>{feature.name}</span>
                            {feature.value && feature.included && (
                              <span className="ml-2 text-sm text-muted-foreground">({feature.value})</span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? "default" : "outline"}
                      asChild
                    >
                      <Link href="/signup">{plan.cta}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-muted-foreground">
                All plans include a 14-day money-back guarantee. No questions asked.
              </p>
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="py-12 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Detailed Feature Comparison</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4 font-medium">Feature</th>
                    <th className="text-center py-4 px-4 font-medium">Free</th>
                    <th className="text-center py-4 px-4 font-medium">Premium</th>
                    <th className="text-center py-4 px-4 font-medium">Academic</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-4 px-4 flex items-center">
                      File Uploads
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-60">Number of documents you can upload per month</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </td>
                    <td className="text-center py-4 px-4">5 per month<br />(max 20 pages each)</td>
                    <td className="text-center py-4 px-4">Unlimited</td>
                    <td className="text-center py-4 px-4">Unlimited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 flex items-center">
                      Notes Generation
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-60">Quality and depth of AI-generated study notes</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </td>
                    <td className="text-center py-4 px-4">Basic</td>
                    <td className="text-center py-4 px-4">Advanced with citations</td>
                    <td className="text-center py-4 px-4">Advanced with citations<br />and cross-references</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 flex items-center">
                      Exam Prediction
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-60">Accuracy and detail level of exam question predictions</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </td>
                    <td className="text-center py-4 px-4">Topic-level only</td>
                    <td className="text-center py-4 px-4">Detailed with sample questions</td>
                    <td className="text-center py-4 px-4">Advanced with success probability</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Processing Speed</td>
                    <td className="text-center py-4 px-4">Standard</td>
                    <td className="text-center py-4 px-4">Priority</td>
                    <td className="text-center py-4 px-4">Priority+</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Ad-Free Experience</td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-red-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Export Options</td>
                    <td className="text-center py-4 px-4">PDF only</td>
                    <td className="text-center py-4 px-4">PDF, Markdown, Word</td>
                    <td className="text-center py-4 px-4">All formats + custom templates</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Flash Card Generation</td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-red-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4">Advanced with spaced repetition</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4">Study Group Collaboration</td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-red-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-5 w-5 text-red-500 mx-auto" /></td>
                    <td className="text-center py-4 px-4">Up to 5 members</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4">Support</td>
                    <td className="text-center py-4 px-4">Community</td>
                    <td className="text-center py-4 px-4">Email</td>
                    <td className="text-center py-4 px-4">24/7 chat & email</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            
            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-6">
                Still have questions? We're here to help.
              </p>
              <Button asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}