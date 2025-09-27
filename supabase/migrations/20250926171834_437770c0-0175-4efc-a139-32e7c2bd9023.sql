-- Update blog_posts table to use cover_image instead of featured_image
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS author_id uuid REFERENCES auth.users(id);

-- Create storage policies for media uploads
CREATE POLICY "Anyone can view media files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'media');

CREATE POLICY "Authenticated users can upload media files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');

CREATE POLICY "Admins can update media files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete media files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'::app_role));