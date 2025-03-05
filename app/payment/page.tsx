"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { processPayment, PaymentDetails } from "@/lib/payment-service";
import { EnhancedNavbar } from "@/components/enhanced-navbar";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { containerClass } from "@/lib/utils";
import { Lock, CreditCard, CalendarClock, ShieldCheck, CheckCircle } from "lucide-react";

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  
  // Get plan from URL
  const planType = searchParams.get("plan") || "premium";
  const billingCycle = searchParams.get("billing") || "monthly";
  
  // Payment form state
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(true);
  
  // Plan prices
  const planPrices = {
    premium: {
      monthly: 9.99,
      annual: 99.99
    },
    academic: {
      monthly: 19.99,
      annual: 199.99
    }
  };
  
  const currentPrice = planPrices[planType as keyof typeof planPrices]?.[billingCycle as keyof typeof planPrices.premium] || 9.99;
  const isSaving = billingCycle === "annual" ? Math.round((planPrices[planType as keyof typeof planPrices].monthly * 12 - currentPrice) / (planPrices[planType as keyof typeof planPrices].monthly * 12) * 100) : 0;
  
  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    const groups = [];
    
    for (let i = 0; i < digits.length; i += 4) {
      groups.push(digits.slice(i, i + 4));
    }
    
    return groups.join(" ").trim();
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatCardNumber(value);
    
    if (formattedValue.length <= 19) { // 16 digits + 3 spaces
      setCardNumber(formattedValue);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Only proceed if we have a logged in user
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please log in to complete your purchase."
      });
      setIsLoading(false);
      router.push('/login');
      return;
    }
    
    try {
      // Create payment details object
      const paymentDetails: PaymentDetails = {
        cardNumber: cardNumber.replace(/\s/g, ''),
        cardName,
        expiryMonth,
        expiryYear,
        cvv,
        saveCard
      };
      
      // Process payment using our payment service
      const result = await processPayment(
        planType, 
        billingCycle,
        currentPrice,
        paymentDetails
      );
      
      if (result.success) {
        // Move to confirmation screen
        setStep(2);
      } else {
        // Show error message
        toast({
          variant: "destructive",
          title: "Payment failed",
          description: result.error || "There was an error processing your payment. Please try again."
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const continueToDashboard = () => {
    router.push("/dashboard");
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <EnhancedNavbar />
      
      <main className="flex-1">
        <div className={containerClass("py-12")}>
          <div className="max-w-3xl mx-auto">
            {step === 1 ? (
              <>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-center">
                    Upgrade to {planType === "premium" ? "Premium" : "Academic"} Plan
                  </h1>
                  <p className="mt-2 text-muted-foreground text-center">
                    Enter your payment details to complete your subscription
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card className="md:col-span-2">
                    <form onSubmit={handleSubmit}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Lock className="h-5 w-5 text-primary" />
                          Secure Payment
                        </CardTitle>
                        <CardDescription>
                          All payments are secured with 256-bit encryption
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="cardName">Name on Card</Label>
                            <Input 
                              id="cardName" 
                              placeholder="e.g. John Doe" 
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value)}
                              required
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <div className="relative">
                              <Input 
                                id="cardNumber" 
                                placeholder="0000 0000 0000 0000" 
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                minLength={19}
                                required
                              />
                              <CreditCard className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-1">
                              <Label htmlFor="expiryMonth">Expiry Month</Label>
                              <Select 
                                value={expiryMonth} 
                                onValueChange={setExpiryMonth}
                                required
                              >
                                <SelectTrigger id="expiryMonth">
                                  <SelectValue placeholder="MM" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                                    <SelectItem key={month} value={month.toString().padStart(2, '0')}>
                                      {month.toString().padStart(2, '0')}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="col-span-1">
                              <Label htmlFor="expiryYear">Expiry Year</Label>
                              <Select 
                                value={expiryYear} 
                                onValueChange={setExpiryYear}
                                required
                              >
                                <SelectTrigger id="expiryYear">
                                  <SelectValue placeholder="YY" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                                    <SelectItem key={year} value={year.toString().slice(-2)}>
                                      {year.toString().slice(-2)}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="col-span-1">
                              <Label htmlFor="cvv">CVV</Label>
                              <div className="relative">
                                <Input 
                                  id="cvv" 
                                  placeholder="123" 
                                  value={cvv}
                                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                                  minLength={3}
                                  maxLength={3}
                                  required
                                />
                                <ShieldCheck className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-2 pt-2">
                            <RadioGroup defaultValue="card" className="flex flex-col space-y-3">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="card" id="card-payment" />
                                <Label htmlFor="card-payment" className="flex items-center gap-2">
                                  <CreditCard className="h-4 w-4" /> Credit/Debit Card
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-4">
                          <div className="text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <input 
                                type="checkbox" 
                                id="saveCard" 
                                checked={saveCard}
                                onChange={(e) => setSaveCard(e.target.checked)}
                                className="rounded"
                              />
                              <Label htmlFor="saveCard" className="text-sm font-normal">
                                Save my payment information for future purchases
                              </Label>
                            </div>
                            {user && (
                              <div className="mt-2">
                                <Link href="/payment-methods" className="text-primary hover:underline text-sm">
                                  Manage your payment methods
                                </Link>
                              </div>
                            )}
                          </div>
                          
                          <div className="text-sm text-muted-foreground">
                            By clicking "Complete Purchase", you agree to our{" "}
                            <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and{" "}
                            <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" type="button" asChild>
                          <Link href="/pricing">
                            Back to Plans
                          </Link>
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? (
                            <>Processing...</>
                          ) : (
                            <>Complete Purchase</>
                          )}
                        </Button>
                      </CardFooter>
                    </form>
                  </Card>
                  
                  <Card className="h-fit">
                    <CardHeader>
                      <CardTitle>{planType === "premium" ? "Premium" : "Academic"} Plan</CardTitle>
                      <CardDescription>
                        {billingCycle === "monthly" ? "Monthly" : "Annual"} subscription
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-baseline">
                        <span className="text-2xl font-bold">${currentPrice}</span>
                        <span className="text-muted-foreground">
                          /{billingCycle === "monthly" ? "month" : "year"}
                        </span>
                      </div>
                      
                      {billingCycle === "annual" && (
                        <div className="bg-primary/10 p-2 rounded text-sm flex items-center">
                          <CalendarClock className="h-4 w-4 mr-2 text-primary" />
                          Save {isSaving}% with annual billing
                        </div>
                      )}
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium">What's included:</p>
                        <ul className="space-y-1.5">
                          {planType === "premium" ? (
                            <>
                              <li className="text-sm flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Unlimited file uploads</span>
                              </li>
                              <li className="text-sm flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Advanced notes generation with citations</span>
                              </li>
                              <li className="text-sm flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Detailed exam predictions with sample questions</span>
                              </li>
                              <li className="text-sm flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Priority processing time</span>
                              </li>
                              <li className="text-sm flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Flash card generation</span>
                              </li>
                            </>
                          ) : (
                            <>
                              <li className="text-sm flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>All Premium features</span>
                              </li>
                              <li className="text-sm flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Advanced exam predictions with success probability</span>
                              </li>
                              <li className="text-sm flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Personalized study schedule</span>
                              </li>
                              <li className="text-sm flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Multi-subject correlation</span>
                              </li>
                              <li className="text-sm flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>24/7 priority support</span>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="max-w-lg mx-auto">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Payment Successful!</CardTitle>
                    <CardDescription>
                      Your {planType === "premium" ? "Premium" : "Academic"} plan has been activated.
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Plan</span>
                        <span className="font-medium">{planType === "premium" ? "Premium" : "Academic"}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Billing</span>
                        <span className="font-medium">{billingCycle === "monthly" ? "Monthly" : "Annual"}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Amount</span>
                        <span className="font-medium">${currentPrice}/{billingCycle === "monthly" ? "month" : "year"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Payment method</span>
                        <span className="font-medium">•••• {cardNumber.slice(-4)}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground text-center">
                      A receipt has been sent to your email address.
                    </p>
                  </CardContent>
                  
                  <CardFooter>
                    <Button className="w-full" onClick={continueToDashboard}>
                      Continue to Dashboard
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </main>
      
      <SiteFooter />
    </div>
  );
}
