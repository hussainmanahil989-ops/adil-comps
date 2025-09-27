import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface HeroContent {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  cta_primary_text: string;
  cta_primary_link: string;
  cta_secondary_text: string;
  cta_secondary_link: string;
  background_image?: string;
  badge_text: string;
  is_active: boolean;
}

export interface TrustBadge {
  id: string;
  title: string;
  value: string;
  description?: string;
  icon?: string;
  color_class: string;
  display_order: number;
  is_active: boolean;
}

export interface ServiceHighlight {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  icon?: string;
  features: string[];
  price_text: string;
  is_popular: boolean;
  display_order: number;
  is_active: boolean;
}

export interface PortfolioCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color_class: string;
  display_order: number;
  is_active: boolean;
}

export interface HomepageSection {
  id: string;
  section_name: string;
  title?: string;
  subtitle?: string;
  description?: string;
  is_enabled: boolean;
  display_order: number;
  settings: any;
}

export interface SiteSetting {
  id: string;
  setting_key: string;
  setting_value?: string;
  setting_type: string;
  description?: string;
  is_public: boolean;
}

export function useHeroContent() {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const { data, error } = await supabase
          .from('hero_content')
          .select('*')
          .eq('is_active', true)
          .single();

        if (error) throw error;
        setHeroContent(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroContent();
  }, []);

  return { heroContent, loading, error };
}

export function useTrustBadges() {
  const [trustBadges, setTrustBadges] = useState<TrustBadge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrustBadges = async () => {
      try {
        const { data, error } = await supabase
          .from('trust_badges')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) throw error;
        setTrustBadges(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrustBadges();
  }, []);

  return { trustBadges, loading, error };
}

export function useServiceHighlights() {
  const [serviceHighlights, setServiceHighlights] = useState<ServiceHighlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServiceHighlights = async () => {
      try {
        const { data, error } = await supabase
          .from('service_highlights')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) throw error;
        setServiceHighlights(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceHighlights();
  }, []);

  return { serviceHighlights, loading, error };
}

export function usePortfolioCategories() {
  const [categories, setCategories] = useState<PortfolioCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolio_categories')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) throw error;
        setCategories(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}

export function useHomepageSections() {
  const [sections, setSections] = useState<HomepageSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const { data, error } = await supabase
          .from('homepage_sections')
          .select('*')
          .eq('is_enabled', true)
          .order('display_order', { ascending: true });

        if (error) throw error;
        setSections(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  return { sections, loading, error };
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('setting_key, setting_value')
          .eq('is_public', true);

        if (error) throw error;
        
        const settingsMap = (data || []).reduce((acc, setting) => {
          acc[setting.setting_key] = setting.setting_value || '';
          return acc;
        }, {} as Record<string, string>);
        
        setSettings(settingsMap);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading, error };
}

// Re-export existing hooks for consistency
export function usePortfolioProjects() {
  return useOriginalPortfolioProjects();
}