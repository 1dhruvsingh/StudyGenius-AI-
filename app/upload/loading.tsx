import { Skeleton } from "@/components/ui/skeleton";
import { EnhancedNavbar } from "@/components/enhanced-navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

export default function UploadLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <EnhancedNavbar />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <Skeleton className="h-10 w-1/3 mb-2" />
          <Skeleton className="h-5 w-2/3" />
        </div>
        
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle><Skeleton className="h-6 w-2/3" /></CardTitle>
            <CardDescription>
              <Skeleton className="h-4 w-full" />
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Skeleton className="h-10 w-24" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
