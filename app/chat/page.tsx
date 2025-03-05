"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { EnhancedNavbar } from "@/components/enhanced-navbar";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";     
import { FileUploader } from "@/components/file-uploader";
import { MessageSquare, FileText, Brain, BookOpen, PenTool, Sparkles, ArrowRight, Send, Download, AlertCircle } from "lucide-react";

// Mock function for handling file upload - in a real app this would connect to your backend
const handleFileUpload = async (file: File) => {
  // This would be replaced with actual API call
  console.log("Uploading file:", file);
  return {
    success: true,
    fileId: "mock-file-id-" + Date.now(),
    fileName: file.name
  };
};

// Mock function for generating content - in a real app this would call your AI service
const generateContent = async (fileId: string, contentType: string, additionalInfo = "") => {
  // This would be replaced with actual API call
  console.log(`Generating ${contentType} for file ${fileId} with info: ${additionalInfo}`);
  
  // Mock response - would come from backend in real implementation
  const mockResponses = {
    "summary": "This is a comprehensive summary of the uploaded document, highlighting the key concepts and important information from the content.",
    "notes": "• Point 1: Important concept from the material\n• Point 2: Key formula or definition\n• Point 3: Critical historical date or event\n• Point 4: Main themes or arguments\n• Point 5: Connections between different topics",
    "questions": "1. What is the significance of X in relation to Y?\n2. How does concept A influence outcome B?\n3. Compare and contrast theories C and D.\n4. Explain the process of E and its importance.\n5. What would happen if variable F was changed?",
    "predictions": "Based on the course material and recent exam patterns, the following topics are likely to appear on the final exam:\n\n1. Topic A - High probability\n2. Topic B - Medium probability\n3. Topic C - High probability\n4. Topic D - Medium probability\n5. Application questions related to Topic A and C"
  };
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    success: true,
    content: mockResponses[contentType] || "Generated content would appear here."
  };
};

export default function ChatPage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("chat");
  const [fileError, setFileError] = useState("");
  const [contentError, setContentError] = useState("");
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{
    id: string;
    name: string;
    size?: number;
    type: string;
  } | null>(null);
  const [contentType, setContentType] = useState("summary");
  const [generatedContent, setGeneratedContent] = useState("");
  const [conversations, setConversations] = useState<Array<{
    type: "user" | "ai";
    content: string;
    contentType?: string;
  }>>([]);
  const fileInputRef = useRef(null);
  
  // Check if a file ID was passed in the URL
  useEffect(() => {
    // Initialize conversations with welcome message
    if (conversations.length === 0) {
      const fileId = searchParams.get('file');
    if (fileId) {
      // In a real app, you would fetch the file info from your backend
      // For now, we'll create a mock file based on the ID
      const mockMaterials = {
        "1": "Advanced Calculus Notes",
        "2": "Organic Chemistry Reactions",
        "3": "World History Essay",
        "4": "Physics Formulas"
      };
      
      if (mockMaterials[fileId]) {
        setUploadedFile({
          id: fileId,
          name: mockMaterials[fileId],
          type: "application/pdf"
        });
        
        // Add initial message
        setConversations([{
          type: "ai",
          content: `I'm ready to help you with ${mockMaterials[fileId]}. What would you like me to generate?`
        }]);
      }
    } else {
      // If no file passed, add welcome message
      setConversations([{
        type: "ai",
        content: "Welcome to the Study Assistant! Upload a document or ask me a question to get started."
      }]);
    }
  }
  }, [searchParams, conversations.length]);

  // Handle file selection
  const onFileSelected = async (file: File | null) => {
    if (!file) return;
    
    setIsUploading(true);
    try {
      const result = await handleFileUpload(file);
      if (result.success) {
        setUploadedFile({
          id: result.fileId,
          name: result.fileName,
          size: file.size,
          type: file.type
        });
        setFileError(""); // Clear any existing errors
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setFileError("There was an error uploading your file.");
    } finally {
      setIsUploading(false);
    }
  };

  // Handle content generation
  const onGenerateContent = async () => {
    if (!uploadedFile) {
      setContentError("Please upload a file first.");
      return;
    }
    
    // Clear previous errors
    setContentError("");
    
    setIsGenerating(true);
    try {
      const result = await generateContent(uploadedFile.id, contentType, message);
      if (result.success) {
        setGeneratedContent(result.content);
        // Add to conversation history
        setConversations(prev => [...prev, {
          type: "user",
          content: `Generate ${contentType} for ${uploadedFile.name}${message ? ": " + message : ""}`
        }, {
          type: "ai",
          content: result.content,
          contentType: contentType
        }]);
        setMessage("");
      }
    } catch (error) {
      console.error("Generation failed:", error);
      setContentError("There was an error generating your content.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle sending a message
  const sendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message to conversation
    setConversations(prev => [...prev, {
      type: "user",
      content: message
    }]);
    
    // Clear input
    setMessage("");
    
    // For now, just mock an AI response
    setTimeout(() => {
      setConversations(prev => [...prev, {
        type: "ai",
        content: "I'm your AI study assistant. Please upload a document to get started with generating summaries, notes, practice questions, or exam predictions."
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <EnhancedNavbar />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Study Assistant</h1>
          <p className="text-muted-foreground">Welcome {user?.name ? user.name : ""} - Upload your study materials and get AI-generated summaries, notes, and more</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left sidebar - File upload and options */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Upload Material</CardTitle>
              <CardDescription>
                Upload your study materials to analyze
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FileUploader 
                onFileSelected={onFileSelected} 
                isUploading={isUploading}
                acceptedFileTypes={[".pdf", ".docx", ".txt"]}
                ref={fileInputRef}
              />
              
              {uploadedFile && (
                <div className="p-3 border rounded-md flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium truncate max-w-[150px]">{uploadedFile.name}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setUploadedFile(null)}
                  >
                    Remove
                  </Button>
                </div>
              )}
              
              {fileError && (
                <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{fileError}</span>
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Generate Content Type:</label>
                <Select 
                  value={contentType} 
                  onValueChange={setContentType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Content Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summary">Summary</SelectItem>
                    <SelectItem value="notes">Study Notes</SelectItem>
                    <SelectItem value="questions">Practice Questions</SelectItem>
                    <SelectItem value="predictions">Exam Predictions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={onGenerateContent} 
                disabled={!uploadedFile || isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>Generating...</>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" /> 
                    Generate {contentType.charAt(0).toUpperCase() + contentType.slice(1)}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
          
          {/* Main content area */}
          <Card className="col-span-1 lg:col-span-2">
            <Tabs defaultValue="chat" className="w-full" onValueChange={setActiveTab}>
              <CardHeader className="pb-0">
                <div className="flex justify-between items-center">
                  <CardTitle>Study Assistant</CardTitle>
                  <TabsList>
                    <TabsTrigger value="chat" className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" /> Chat
                    </TabsTrigger>
                    <TabsTrigger value="content" className="flex items-center gap-1">
                      <FileText className="h-4 w-4" /> Generated Content
                    </TabsTrigger>
                  </TabsList>
                </div>
                <CardDescription>
                  {activeTab === "chat" 
                    ? "Chat with the AI about your study materials" 
                    : "View your generated study materials"}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-4">
                <TabsContent value="chat" className="mt-0 space-y-4">
                  <div className="h-[400px] border rounded-md p-4 overflow-y-auto flex flex-col gap-4">
                    {conversations.length === 0 ? (
                      <div className="text-center text-muted-foreground flex flex-col items-center justify-center h-full">
                        <MessageSquare className="h-8 w-8 mb-2" />
                        <p>Start a conversation or upload a document to generate content</p>
                      </div>
                    ) : (
                      conversations.map((msg, index) => (
                        <div 
                          key={index} 
                          className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[80%] p-3 rounded-lg ${
                              msg.type === 'user' 
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="whitespace-pre-wrap">{msg.content}</p>
                            {msg.contentType && (
                              <div className="mt-2 text-xs opacity-70 flex justify-end">
                                Generated {msg.contentType}
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Textarea 
                      placeholder="Ask a question or provide context for content generation..." 
                      className="resize-none"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          if (activeTab === 'chat') {
                            sendMessage();
                          } else {
                            onGenerateContent();
                          }
                        }
                      }}
                    />
                    <Button 
                      onClick={activeTab === 'chat' ? sendMessage : onGenerateContent}
                      disabled={!message.trim() && !uploadedFile}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="content" className="mt-0">
                  {contentError && (
                    <div className="flex items-center gap-2 p-3 mb-4 bg-destructive/10 text-destructive rounded-lg text-sm">
                      <AlertCircle className="h-4 w-4" />
                      <span>{contentError}</span>
                    </div>
                  )}
                  <div className="h-[400px] border rounded-md p-4 overflow-y-auto">
                    {generatedContent ? (
                      <div className="whitespace-pre-wrap">
                        {generatedContent}
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground flex flex-col items-center justify-center h-full">
                        <FileText className="h-8 w-8 mb-2" />
                        <p>Select a file and generate content to see it here</p>
                      </div>
                    )}
                  </div>
                  
                  {generatedContent && (
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" className="flex items-center gap-2">
                        <Download className="h-4 w-4" /> Save as PDF
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </main>
      
      <SiteFooter />
    </div>
  );
}
