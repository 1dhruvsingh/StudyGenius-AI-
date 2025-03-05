import { Skeleton } from "@/components/ui/skeleton";
import { EnhancedNavbar } from "@/components/enhanced-navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ChatLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <EnhancedNavbar />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <Skeleton className="h-10 w-1/3 mb-2" />
          <Skeleton className="h-5 w-2/3" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left sidebar - File upload and options skeleton */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle><Skeleton className="h-6 w-2/3" /></CardTitle>
              <CardDescription>
                <Skeleton className="h-4 w-full" />
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
          
          {/* Main content area skeleton */}
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center">
                <CardTitle><Skeleton className="h-6 w-1/3" /></CardTitle>
                <Tabs defaultValue="chat">
                  <TabsList>
                    <TabsTrigger value="chat" disabled>Chat</TabsTrigger>
                    <TabsTrigger value="content" disabled>Content</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <CardDescription>
                <Skeleton className="h-4 w-2/3" />
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-4">
              <div className="mt-0 space-y-4">
                <div className="h-[400px] border rounded-md p-4">
                  <div className="flex flex-col gap-4">
                    <Skeleton className="h-16 w-2/3 self-start" />
                    <Skeleton className="h-20 w-3/4 self-start" />
                    <Skeleton className="h-16 w-2/3 self-end" />
                    <Skeleton className="h-24 w-3/4 self-start" />
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Skeleton className="h-20 flex-1" />
                  <Skeleton className="h-20 w-12" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
