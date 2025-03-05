"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { EnhancedNavbar } from "@/components/enhanced-navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { SiteFooter } from "@/components/site-footer";
import { Brain, BookOpen, FileText, PenTool, Sparkles, Upload, Plus, Search, Clock, BarChart, MessageSquare } from "lucide-react";

// Mock data for study materials
const studyMaterials = [
  {
    id: "1",
    title: "Advanced Calculus Notes",
    subject: "Mathematics",
    dateAdded: "2025-03-01",
    status: "analyzed",
    type: "notes"
  },
  {
    id: "2",
    title: "Organic Chemistry Reactions",
    subject: "Chemistry",
    dateAdded: "2025-02-28",
    status: "analyzed",
    type: "notes"
  },
  {
    id: "3",
    title: "World History Essay",
    subject: "History",
    dateAdded: "2025-02-25",
    status: "analyzing",
    type: "essay"
  },
  {
    id: "4",
    title: "Physics Formulas",
    subject: "Physics",
    dateAdded: "2025-02-20",
    status: "analyzed",
    type: "formula-sheet"
  }
];

// Mock data for recent activities
const recentActivities = [
  {
    id: "1",
    action: "Added new study material",
    title: "Advanced Calculus Notes",
    timestamp: "2 hours ago"
  },
  {
    id: "2",
    action: "Generated quiz",
    title: "Organic Chemistry",
    timestamp: "5 hours ago"
  },
  {
    id: "3",
    action: "Reviewed summary",
    title: "World History Essay",
    timestamp: "1 day ago"
  }
];

// Mock data for upcoming exams
const upcomingExams = [
  {
    id: "1",
    title: "Calculus Midterm",
    date: "March 15, 2025",
    daysLeft: 10,
    readiness: 75
  },
  {
    id: "2",
    title: "Chemistry Final",
    date: "March 20, 2025",
    daysLeft: 15,
    readiness: 60
  }
];

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("materials");
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: "Please try again"
      });
    }
  };

  // Filter study materials based on search query
  const filteredMaterials = studyMaterials.filter(material => 
    material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <EnhancedNavbar />
      
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name || "Student"}!</p>
          </div>
          
          <div className="flex gap-4 mt-4 md:mt-0">
            <Button asChild>
              <Link href="/upload">
                <Upload className="mr-2 h-4 w-4" /> Upload Material
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/chat">
                <MessageSquare className="mr-2 h-4 w-4" /> Chat Assistant
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Main dashboard content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Quick stats cards */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Study Materials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studyMaterials.length}</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingExams.length}</div>
              <p className="text-xs text-muted-foreground">Next: Calculus in 10 days</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Study Streaks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5 days</div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabs for different content sections */}
        <Tabs defaultValue="materials" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="materials" className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> Study Materials
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <Clock className="h-4 w-4" /> Recent Activity
            </TabsTrigger>
            <TabsTrigger value="exams" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" /> Exam Readiness
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="materials" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Your Study Materials</h2>
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search materials..." 
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMaterials.map(material => (
                <Card key={material.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{material.title}</CardTitle>
                      <div className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {material.subject}
                      </div>
                    </div>
                    <CardDescription>Added on {material.dateAdded}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="flex items-center gap-2 text-sm">
                      {material.status === "analyzed" ? (
                        <div className="text-green-600 flex items-center gap-1">
                          <Sparkles className="h-4 w-4" /> Analyzed
                        </div>
                      ) : (
                        <div className="text-amber-600 flex items-center gap-1">
                          <Clock className="h-4 w-4" /> Processing...
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <FileText className="mr-2 h-4 w-4" /> Summary
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <BookOpen className="mr-2 h-4 w-4" /> Quiz
                    </Button>
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link href={`/chat?file=${material.id}`}>
                        <MessageSquare className="mr-2 h-4 w-4" /> Chat
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              {/* Add new material card */}
              <Card className="overflow-hidden border-dashed flex items-center justify-center cursor-pointer hover:bg-secondary/50 transition-colors h-[220px]">
                <Link href="/upload" className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="rounded-full bg-secondary p-4 mb-4">
                    <Plus className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <p className="font-medium">Add New Material</p>
                  <p className="text-sm text-muted-foreground">Upload documents or notes</p>
                </Link>
              </Card>
              
              {/* Chat with AI card */}
              <Card className="overflow-hidden border-dashed flex items-center justify-center cursor-pointer hover:bg-secondary/50 transition-colors h-[220px]">
                <Link href="/chat" className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="rounded-full bg-secondary p-4 mb-4">
                    <MessageSquare className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <p className="font-medium">Chat with AI</p>
                  <p className="text-sm text-muted-foreground">Generate summaries, notes, and more</p>
                </Link>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="activity" className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.map(activity => (
                <Card key={activity.id}>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">{activity.action}</CardTitle>
                      <div className="text-xs text-muted-foreground">{activity.timestamp}</div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <p>{activity.title}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="exams" className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Upcoming Exams</h2>
            <div className="space-y-6">
              {upcomingExams.map(exam => (
                <Card key={exam.id}>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{exam.title}</CardTitle>
                      <div className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {exam.date}
                      </div>
                    </div>
                    <CardDescription>{exam.daysLeft} days remaining</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Readiness</span>
                        <span className="text-sm">{exam.readiness}%</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: `${exam.readiness}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full">
                      <Brain className="mr-2 h-4 w-4" /> Generate Study Plan
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <SiteFooter />
    </div>
  );
}