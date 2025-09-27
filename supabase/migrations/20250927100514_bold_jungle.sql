/*
  # Dynamic Content Management System

  1. New Tables
    - `hero_content` - Homepage hero section content
    - `trust_badges` - Trust indicators and statistics
    - `service_highlights` - Services overview content
    - `portfolio_categories` - Portfolio category management
    - `homepage_sections` - Configurable homepage sections
    - `site_settings` - Global site configuration

  2. Security
    - Enable RLS on all new tables
    - Admin-only policies for content management
    - Public read access for published content

  3. Features
    - Dynamic hero content editing
    - Configurable trust badges and stats
    - Portfolio category management
    - Homepage section ordering
    - Global site settings
*/

-- Hero content table
CREATE TABLE IF NOT EXISTS public.hero_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text,
  description text,
  cta_primary_text text DEFAULT 'Start Your Project',
  cta_primary_link text DEFAULT '/contact',
  cta_secondary_text text DEFAULT 'Watch Portfolio',
  cta_secondary_link text DEFAULT '/portfolio',
  background_image text,
  badge_text text DEFAULT 'Trusted by 500+ YouTubers & Brands',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Trust badges/statistics table
CREATE TABLE IF NOT EXISTS public.trust_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  value text NOT NULL,
  description text,
  icon text,
  color_class text DEFAULT 'bg-gradient-youtube',
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Service highlights table
CREATE TABLE IF NOT EXISTS public.service_highlights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text,
  description text,
  icon text,
  features text[] DEFAULT '{}',
  price_text text DEFAULT 'Chat for Quote!',
  is_popular boolean DEFAULT false,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Portfolio categories table (enhanced)
CREATE TABLE IF NOT EXISTS public.portfolio_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  icon text,
  color_class text DEFAULT 'bg-youtube-red',
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Homepage sections configuration
CREATE TABLE IF NOT EXISTS public.homepage_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_name text UNIQUE NOT NULL,
  title text,
  subtitle text,
  description text,
  is_enabled boolean DEFAULT true,
  display_order integer DEFAULT 0,
  settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Site settings table
CREATE TABLE IF NOT EXISTS public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key text UNIQUE NOT NULL,
  setting_value text,
  setting_type text DEFAULT 'text',
  description text,
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trust_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Anyone can view active hero content"
ON public.hero_content FOR SELECT
USING (is_active = true);

CREATE POLICY "Anyone can view active trust badges"
ON public.trust_badges FOR SELECT
USING (is_active = true);

CREATE POLICY "Anyone can view active service highlights"
ON public.service_highlights FOR SELECT
USING (is_active = true);

CREATE POLICY "Anyone can view active portfolio categories"
ON public.portfolio_categories FOR SELECT
USING (is_active = true);

CREATE POLICY "Anyone can view enabled homepage sections"
ON public.homepage_sections FOR SELECT
USING (is_enabled = true);

CREATE POLICY "Anyone can view public site settings"
ON public.site_settings FOR SELECT
USING (is_public = true);

-- Admin management policies
CREATE POLICY "Admins can manage hero content"
ON public.hero_content FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage trust badges"
ON public.trust_badges FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage service highlights"
ON public.service_highlights FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage portfolio categories"
ON public.portfolio_categories FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage homepage sections"
ON public.homepage_sections FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage all site settings"
ON public.site_settings FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Insert default data
INSERT INTO public.hero_content (title, subtitle, description, badge_text) VALUES
('Transform Your Brand with Premium Designs', 'Professional logo design, YouTube thumbnails, and video editing that converts viewers into loyal customers.', 'Ready in 24-48 hours.', 'Trusted by 500+ YouTubers & Brands')
ON CONFLICT DO NOTHING;

INSERT INTO public.trust_badges (title, value, description, icon, display_order) VALUES
('Happy Clients', '500+', 'Satisfied customers worldwide', 'Users', 1),
('Delivery Time', '24-48h', 'Fast turnaround', 'Clock', 2),
('Satisfaction Rate', '99%', 'Client satisfaction', 'Star', 3),
('Average Rating', '5.0★', 'Quality guarantee', 'Award', 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.service_highlights (title, subtitle, description, icon, features, is_popular, display_order) VALUES
('Logo Design', 'Professional Brand Identity', 'Professional logos that make your brand unforgettable', 'Palette', ARRAY['3 Concepts', 'Unlimited Revisions', 'All File Formats', 'Copyright Transfer'], false, 1),
('YouTube Thumbnails', 'High-Converting Click Magnets', 'Eye-catching thumbnails that boost your click-through rates', 'Play', ARRAY['High CTR Design', 'A/B Test Ready', 'Mobile Optimized', '24h Delivery'], true, 2),
('Video Editing', 'Professional Video Production', 'Professional video editing that keeps viewers engaged', 'Zap', ARRAY['Color Grading', 'Motion Graphics', 'Sound Design', 'Fast Turnaround'], false, 3),
('YouTube Channel Setup', 'Complete Channel Optimization', 'Complete channel optimization for maximum growth and visibility', 'Settings', ARRAY['Channel Branding', 'SEO Optimization', 'Analytics Setup', 'Strategy Guide'], false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.portfolio_categories (name, slug, description, icon, display_order) VALUES
('Logo Design', 'logos', 'Professional brand identity and logo design', 'Palette', 1),
('Thumbnail Design', 'thumbnails', 'High-converting YouTube thumbnails', 'Play', 2),
('Video Editing', 'video-editing', 'Professional video editing and post-production', 'Film', 3),
('Web Design', 'web-design', 'Modern website and UI design', 'Monitor', 4),
('Branding', 'branding', 'Complete brand identity packages', 'Award', 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.homepage_sections (section_name, title, subtitle, description, display_order) VALUES
('hero', 'Hero Section', 'Main landing section', 'Primary call-to-action area', 1),
('trust_badges', 'Trust Badges', 'Social proof indicators', 'Statistics and credibility markers', 2),
('portfolio_highlights', 'Portfolio Highlights', 'Featured work showcase', 'Best portfolio pieces', 3),
('services_overview', 'Services Overview', 'Service offerings', 'Main service categories', 4),
('testimonials', 'Testimonials', 'Client feedback', 'Customer reviews and ratings', 5),
('case_studies', 'Case Studies', 'Success stories', 'Detailed project results', 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.site_settings (setting_key, setting_value, setting_type, description, is_public) VALUES
('site_title', 'GFX by Adi', 'text', 'Main site title', true),
('site_tagline', 'Professional Logo Designer & Video Editor', 'text', 'Site tagline/subtitle', true),
('contact_email', 'hello@adilgfx.com', 'email', 'Primary contact email', true),
('contact_phone', '+1 (555) 123-4567', 'text', 'Contact phone number', true),
('whatsapp_number', '1234567890', 'text', 'WhatsApp number for contact', false),
('social_facebook', 'https://facebook.com/adilgfx', 'url', 'Facebook profile URL', true),
('social_instagram', 'https://instagram.com/adilgfx', 'url', 'Instagram profile URL', true),
('social_linkedin', 'https://linkedin.com/in/adilgfx', 'url', 'LinkedIn profile URL', true)
ON CONFLICT DO NOTHING;

-- Add updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_hero_content_updated_at BEFORE UPDATE ON public.hero_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_trust_badges_updated_at BEFORE UPDATE ON public.trust_badges FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_service_highlights_updated_at BEFORE UPDATE ON public.service_highlights FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_portfolio_categories_updated_at BEFORE UPDATE ON public.portfolio_categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_homepage_sections_updated_at BEFORE UPDATE ON public.homepage_sections FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();