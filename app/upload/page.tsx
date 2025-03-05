"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { EnhancedNavbar } from "@/components/enhanced-navbar";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUploader } from "@/components/file-uploader";
import { MessageSquare, ArrowRight, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function UploadPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [subject, setSubject] = useState("");
  const [uploadError, setUploadError] = useState("");

  const handleFileSelected = (file: File | null) => {
    setUploadedFile(file);
  };

  const handleUpload = async () => {
    if (!uploadedFile || !subject) {
      setUploadError("Please select a file and subject before uploading.");
      return;
    }
    
    // Clear any previous errors
    setUploadError("");

    setIsUploading(true);

    try {
      // Mock successful upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Upload successful",
        description: "Your file has been uploaded and is being processed."
      });
      
      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadError("There was an error uploading your file.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <EnhancedNavbar />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Upload Study Material</h1>
          <p className="text-muted-foreground">Welcome {user?.name ? user.name : ""} - Upload your documents to analyze and create study materials</p>
        </div>
        
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Upload Document</CardTitle>
            <CardDescription>
              Upload PDF, Word documents, or text files to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FileUploader 
              onFileSelected={handleFileSelected}
              isUploading={isUploading}
              acceptedFileTypes={[".pdf", ".docx", ".doc", ".txt"]}
            />
            
            {uploadError && (
              <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{uploadError}</span>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject/Course</label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="literature">Literature</SelectItem>
                  <SelectItem value="computer-science">Computer Science</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/dashboard">Cancel</Link>
            </Button>
            
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                asChild
              >
                <Link href="/chat">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Go to Chat
                </Link>
              </Button>
              
              <Button
                onClick={handleUpload}
                disabled={!uploadedFile || !subject || isUploading}
              >
                {isUploading ? "Uploading..." : "Upload"}
                {!isUploading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </main>
      
      <SiteFooter />
    </div>
  );
}
