"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

export function PricingSection() {
  const [annual, setAnnual] = useState(false);

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

  const plans = [
    {
      name: "Free",
      description: "For casual students",
      price: { monthly: 0, annual: 0 },
      features: [
        "5 file uploads per month",
        "Basic notes generation",
        "Topic-level exam prediction",
        "Standard processing time",
        "Ad-supported experience",
        "Basic formatting options",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Premium",
      description: "For dedicated students",
      price: { monthly: 9.99, annual: 99.99 },
      features: [
        "Unlimited file uploads",
        "Advanced notes with citations",
        "Detailed exam predictions",
        "Priority processing",
        "Ad-free experience",
        "Advanced formatting options",
        "Export to multiple formats",
        "Flash card generation",
        "Study schedule suggestions",
      ],
      cta: "Upgrade Now",
      popular: true,
    },
    {
      name: "Academic",
      description: "For serious academic achievers",
      price: { monthly: 19.99, annual: 199.99 },
      features: [
        "Everything in Premium",
        "Multi-subject correlation",
        "Advanced exam prediction",
        "Custom question papers",
        "Study group collaboration",
        "Academic calendar integration",
        "Personalized recommendations",
        "Priority support",
      ],
      cta: "Go Academic",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 w-full">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Choose the plan that fits your study needs
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

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {plans.map((plan, index) => (
            <motion.div key={index} variants={itemVariants} className="flex">
              <Card className={`flex flex-col h-full relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
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
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>{feature}</span>
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
                    {plan.name === "Free" ? (
                      <Link href="/signup">
                        {plan.cta}
                      </Link>
                    ) : (
                      <Link href={`/payment?plan=${plan.name.toLowerCase()}&billing=${annual ? 'annual' : 'monthly'}`}>
                        {plan.cta}
                      </Link>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            All plans include a 14-day money-back guarantee. No questions asked.
          </p>
        </div>
      </div>
    </section>
  );
}