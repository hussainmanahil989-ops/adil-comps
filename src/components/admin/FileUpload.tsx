import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Image, FileText, Video } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onUpload: (url: string) => void;
  acceptedTypes?: string;
  maxSize?: number; // in MB
  folder?: string;
  className?: string;
  currentFile?: string;
}

export function FileUpload({ 
  onUpload, 
  acceptedTypes = "image/*,video/*", 
  maxSize = 50,
  folder = "uploads",
  className,
  currentFile
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true);

      // Validate file size
      if (file.size > maxSize * 1024 * 1024) {
        toast({
          variant: 'destructive',
          title: 'File too large',
          description: `Please select a file smaller than ${maxSize}MB`,
        });
        return;
      }

      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(fileName);

      onUpload(publicUrl);

      toast({
        title: 'Success',
        description: 'File uploaded successfully',
      });

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        variant: 'destructive',
        title: 'Upload failed',
        description: 'Failed to upload file. Please try again.',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const getFileIcon = (fileName?: string) => {
    if (!fileName) return Upload;
    
    const ext = fileName.toLowerCase();
    if (ext.includes('mp4') || ext.includes('mov') || ext.includes('webm')) {
      return Video;
    }
    if (ext.includes('jpg') || ext.includes('png') || ext.includes('gif') || ext.includes('webp')) {
      return Image;
    }
    return FileText;
  };

  const Icon = getFileIcon(currentFile);

  const removeFile = () => {
    onUpload('');
  };

  return (
    <div className={cn("space-y-4", className)}>
      {currentFile && (
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">File uploaded</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => window.open(currentFile, '_blank')}
            >
              View
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={removeFile}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}

      <div
        className={cn(
          "border-2 border-dashed border-border rounded-lg p-8 text-center transition-colors cursor-pointer hover:border-youtube-red/50",
          dragActive && "border-youtube-red bg-youtube-red/5",
          uploading && "opacity-50 cursor-not-allowed"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes}
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading}
        />
        
        <div className="space-y-4">
          <div className="mx-auto w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
            <Upload className="h-6 w-6 text-muted-foreground" />
          </div>
          
          <div>
            <p className="text-sm font-medium">
              {uploading ? 'Uploading...' : 'Drop files here or click to upload'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Maximum file size: {maxSize}MB
            </p>
          </div>
          
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Select Files'}
          </Button>
        </div>
      </div>
    </div>
  );
}