-- Enable RLS on all tables
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;  
ALTER TABLE public.contact_leads ENABLE ROW LEVEL SECURITY;

-- Create user roles enum and table
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Public read policies for frontend content
CREATE POLICY "Anyone can view published blog posts" 
ON public.blog_posts FOR SELECT 
USING (published = true);

CREATE POLICY "Anyone can view portfolio projects" 
ON public.portfolio_projects FOR SELECT 
USING (true);

CREATE POLICY "Anyone can view testimonials" 
ON public.testimonials FOR SELECT 
USING (true);

-- Admin-only policies for content management
CREATE POLICY "Admins can manage blog posts" 
ON public.blog_posts FOR ALL 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage portfolio projects" 
ON public.portfolio_projects FOR ALL 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage testimonials" 
ON public.testimonials FOR ALL 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view contact leads" 
ON public.contact_leads FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Anyone can create contact leads (contact form submissions)
CREATE POLICY "Anyone can create contact leads" 
ON public.contact_leads FOR INSERT 
WITH CHECK (true);

-- Insert admin user (replace with your actual email)
INSERT INTO public.user_roles (user_id, role) 
SELECT id, 'admin'::app_role 
FROM auth.users 
WHERE email = 'maddil572@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;