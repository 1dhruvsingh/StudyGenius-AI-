"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { EnhancedNavbar } from "@/components/enhanced-navbar";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { PaymentMethod, getUserPaymentMethods, addPaymentMethod, updatePaymentMethod, deletePaymentMethod, setDefaultPaymentMethod } from "@/lib/payment-service";
import { Separator } from "@/components/ui/separator";
import { containerClass } from "@/lib/utils";
import { CreditCard, Plus, Trash2, Edit2, Lock, CheckCircle, AlertCircle } from "lucide-react";



export default function PaymentMethodsPage() {
  const { user } = useAuth();
  const router = useRouter();
  
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isEditingId, setIsEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // New card form state
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  
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
  
  const resetForm = () => {
    setCardNumber("");
    setCardName("");
    setExpiryMonth("");
    setExpiryYear("");
    setCvv("");
    setIsDefault(false);
  };
  
  // Load payment methods when the component mounts
  useEffect(() => {
    if (user) {
      // In a real app, this would fetch from the server
      // For now, we'll just use our mock service
      const methods = getUserPaymentMethods(user.id);
      setPaymentMethods(methods);
    }
  }, [user]);
  
  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "Not logged in",
        description: "You must be logged in to manage payment methods."
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Extract last 4 digits from card number
      const lastFour = cardNumber.replace(/\D/g, "").slice(-4);
      
      // Determine card type based on first digit
      const firstDigit = cardNumber.replace(/\D/g, "")[0];
      const cardType = firstDigit === "4" ? "visa" as const : 
                      firstDigit === "5" ? "mastercard" as const : 
                      "generic" as const;
      
      // Create and add the new payment method
      const newMethod = addPaymentMethod(user.id, {
        cardType,
        lastFour,
        expiryMonth,
        expiryYear,
        cardholderName: cardName,
        isDefault
      });
      
      // Update the local state
      setPaymentMethods(getUserPaymentMethods(user.id));
      
      // Reset form and state
      resetForm();
      setIsAddingNew(false);
      
      // Show success toast
      toast({
        title: "Payment method added",
        description: "Your new payment method has been saved successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error adding payment method",
        description: "There was a problem adding your payment method. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEditCard = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !isEditingId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Cannot update payment method."
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Prepare update data
      const updateData: Partial<Omit<PaymentMethod, 'id'>> = {
        cardholderName: cardName,
        expiryMonth,
        expiryYear,
        isDefault
      };
      
      // If card number was updated (not masked), update card type and last four
      if (!cardNumber.includes("•")) {
        const lastFour = cardNumber.replace(/\D/g, "").slice(-4);
        const firstDigit = cardNumber.replace(/\D/g, "")[0];
        const cardType = firstDigit === "4" ? "visa" as const : 
                        firstDigit === "5" ? "mastercard" as const : 
                        "generic" as const;
        
        updateData.lastFour = lastFour;
        updateData.cardType = cardType;
      }
      
      // Update the payment method
      const result = updatePaymentMethod(user.id, isEditingId, updateData);
      
      if (result) {
        // Update the local state
        setPaymentMethods(getUserPaymentMethods(user.id));
        
        // Reset form and state
        resetForm();
        setIsEditingId(null);
        
        // Show success toast
        toast({
          title: "Payment method updated",
          description: "Your payment method has been updated successfully.",
        });
      } else {
        throw new Error("Failed to update payment method");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error updating payment method",
        description: "There was a problem updating your payment method. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteCard = (id: string) => {
    if (!user) return;
    
    // Check if it's the only payment method
    if (paymentMethods.length === 1) {
      toast({
        variant: "destructive",
        title: "Cannot remove last payment method",
        description: "You must have at least one payment method on file."
      });
      return;
    }
    
    try {
      // Delete the payment method
      const success = deletePaymentMethod(user.id, id);
      
      if (success) {
        // Update the local state
        setPaymentMethods(getUserPaymentMethods(user.id));
        
        // Show success toast
        toast({
          title: "Payment method removed",
          description: "Your payment method has been removed successfully."
        });
      } else {
        throw new Error("Failed to delete payment method");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error removing payment method",
        description: "There was a problem removing your payment method. Please try again."
      });
    }
  };
  
  const handleSetDefault = (id: string) => {
    if (!user) return;
    
    try {
      // Set the payment method as default
      const success = setDefaultPaymentMethod(user.id, id);
      
      if (success) {
        // Update the local state
        setPaymentMethods(getUserPaymentMethods(user.id));
        
        // Show success toast
        toast({
          title: "Default payment method updated",
          description: "Your default payment method has been updated."
        });
      } else {
        throw new Error("Failed to set default payment method");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error updating default payment method",
        description: "There was a problem updating your default payment method. Please try again."
      });
    }
  };
  
  const startEditingCard = (id: string) => {
    const methodToEdit = paymentMethods.find(method => method.id === id);
    
    if (!methodToEdit) return;
    
    // Populate form with card details
    setCardNumber(`•••• •••• •••• ${methodToEdit.lastFour}`);
    setCardName(methodToEdit.cardholderName);
    setExpiryMonth(methodToEdit.expiryMonth);
    setExpiryYear(methodToEdit.expiryYear);
    setCvv("");
    setIsDefault(methodToEdit.isDefault);
    
    // Set editing state
    setIsEditingId(id);
  };
  
  // Card type icons (simplified for this example)
  const getCardTypeIcon = (cardType: string) => {
    if (cardType === "visa") {
      return "Visa";
    } else if (cardType === "mastercard") {
      return "Mastercard";
    } else {
      return "Card";
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <EnhancedNavbar />
      
      <main className="flex-1">
        <div className={containerClass("py-12")}>
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Payment Methods
              </h1>
              <p className="mt-2 text-muted-foreground">
                Manage your payment methods for StudyGenius-AI subscriptions
              </p>
            </div>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Your Payment Methods
                </CardTitle>
                <CardDescription>
                  These payment methods are saved for your future subscriptions and renewals.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {paymentMethods.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p>You don't have any payment methods saved yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center justify-between border rounded-lg p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                            <CreditCard className="h-6 w-6" />
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{getCardTypeIcon(method.cardType)} •••• {method.lastFour}</p>
                              {method.isDefault && (
                                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Expires {method.expiryMonth}/{method.expiryYear}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {!method.isDefault && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleSetDefault(method.id)}
                            >
                              Set Default
                            </Button>
                          )}
                          
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => startEditingCard(method.id)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => handleDeleteCard(method.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              
              <CardFooter>
                {!isAddingNew && isEditingId === null && (
                  <Button onClick={() => setIsAddingNew(true)}>
                    <Plus className="h-4 w-4 mr-2" /> Add Payment Method
                  </Button>
                )}
              </CardFooter>
            </Card>
            
            {(isAddingNew || isEditingId !== null) && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {isEditingId ? "Edit Payment Method" : "Add New Payment Method"}
                  </CardTitle>
                  <CardDescription>
                    {isEditingId ? "Update your payment details" : "Enter your card information securely"}
                  </CardDescription>
                </CardHeader>
                
                <form onSubmit={isEditingId ? handleEditCard : handleAddCard}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input 
                        id="cardName" 
                        placeholder="e.g. John Doe" 
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <div className="relative">
                        <Input 
                          id="cardNumber" 
                          placeholder="0000 0000 0000 0000" 
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          minLength={isEditingId ? 0 : 19}
                          required
                        />
                        <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
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
                        <Input 
                          id="cvv" 
                          placeholder="123" 
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                          minLength={isEditingId ? 0 : 3}
                          maxLength={3}
                          required={!isEditingId}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 pt-2">
                      <Switch 
                        id="default" 
                        checked={isDefault}
                        onCheckedChange={setIsDefault}
                      />
                      <Label htmlFor="default">Set as default payment method</Label>
                    </div>
                    
                    <div className="bg-muted/50 rounded-lg p-3 text-sm text-muted-foreground flex items-start gap-2">
                      <Lock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <p>
                        Your payment details are secured with industry-standard encryption. We never store your full card number.
                      </p>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        resetForm();
                        setIsAddingNew(false);
                        setIsEditingId(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        "Processing..."
                      ) : isEditingId ? (
                        "Update Card"
                      ) : (
                        "Add Card"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            )}
            
            <div className="mt-8">
              <Link href="/dashboard" className="text-primary hover:underline flex items-center gap-1">
                ← Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <SiteFooter />
    </div>
  );
}
