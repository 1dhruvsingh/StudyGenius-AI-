"use client";

import { forwardRef, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, File, X } from "lucide-react";

interface FileUploaderProps {
  onFileSelected: (file: File | null) => void;
  isUploading?: boolean;
  acceptedFileTypes?: string[];
  maxSizeMB?: number;
}

export const FileUploader = forwardRef<HTMLInputElement, FileUploaderProps>(
  ({ onFileSelected, isUploading = false, acceptedFileTypes = [".pdf", ".docx", ".txt"], maxSizeMB = 10 }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const [fileError, setFileError] = useState<string | null>(null);
    
    const handleFiles = (files: FileList | null) => {
      setFileError(null);
      
      if (!files || files.length === 0) return;
      
      const file = files[0]; // Only process the first file
      const maxSize = maxSizeMB * 1024 * 1024; // Convert MB to bytes
      
      // Check file size
      if (file.size > maxSize) {
        setFileError(`File is too large. Maximum size is ${maxSizeMB}MB.`);
        return;
      }
      
      // Check file type
      const fileExtension = "." + file.name.split('.').pop()?.toLowerCase() || "";
      if (acceptedFileTypes.length > 0 && !acceptedFileTypes.includes(fileExtension)) {
        setFileError(`Invalid file type. Accepted types: ${acceptedFileTypes.join(', ')}`);
        return;
      }
      
      onFileSelected(file);
    };
    
    // Handle click upload
    const handleButtonClick = () => {
      if (inputRef.current) {
        inputRef.current.click();
      }
    };
    
    // Handle drag events
    const handleDrag = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };
    
    // Handle drop event
    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      
      handleFiles(e.dataTransfer.files);
    };
    
    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
    };
    
    return (
      <div className="w-full space-y-2">
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={(node) => {
              // Handle both the forwarded ref and the local ref
              inputRef.current = node;
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            className="hidden"
            onChange={handleChange}
            accept={acceptedFileTypes.join(',')}
          />
          
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="rounded-full bg-secondary p-2 mb-2">
              <Upload className="h-5 w-5 text-secondary-foreground" />
            </div>
            <p className="text-sm font-medium">
              {isUploading ? "Uploading..." : "Drag & drop your file here"}
            </p>
            <p className="text-xs text-muted-foreground">
              {acceptedFileTypes.join(', ')} files up to {maxSizeMB}MB
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleButtonClick}
              disabled={isUploading}
              className="mt-2"
            >
              <File className="mr-2 h-4 w-4" />
              Browse Files
            </Button>
          </div>
        </div>
        
        {fileError && (
          <div className="text-sm text-destructive flex items-center gap-1">
            <X className="h-4 w-4" />
            {fileError}
          </div>
        )}
      </div>
    );
  }
);

FileUploader.displayName = "FileUploader";
