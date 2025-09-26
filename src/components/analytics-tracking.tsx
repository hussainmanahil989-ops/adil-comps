import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics tracking ID - replace with your actual GA4 measurement ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

// Meta Pixel ID - replace with your actual Meta Pixel ID  
const META_PIXEL_ID = 'XXXXXXXXXXXXXXX';

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
    fbq: any;
    _fbq: any;
    dataLayer: any[];
  }
}

export function AnalyticsTracking() {
  const location = useLocation();

  useEffect(() => {
    // Initialize Google Analytics
    const initGA = () => {
      // Load gtag script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      // Initialize gtag
      window.gtag = window.gtag || function() {
        (window as any).dataLayer.push(arguments);
      };
      (window as any).dataLayer = (window as any).dataLayer || [];
      
      window.gtag('js', new Date().toISOString());
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname,
        page_title: document.title,
      });
    };

    // Initialize Meta Pixel
    const initMetaPixel = () => {
      if (window.fbq) return;
      
      const fbq: any = window.fbq = function(...args: any[]) {
        if (fbq.callMethod) {
          fbq.callMethod.apply(fbq, args);
        } else {
          fbq.queue.push(args);
        }
      };
      
      if (!window._fbq) window._fbq = fbq;
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = '2.0';
      fbq.queue = [];
      
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(script);
      
      fbq('init', META_PIXEL_ID);
      fbq('track', 'PageView');
    };

    // Only initialize in production
    if (process.env.NODE_ENV === 'production') {
      initGA();
      initMetaPixel();
    }
  }, []);

  // Track page views on route changes
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname,
        page_title: document.title,
      });
    }
  }, [location]);

  return null;
}

// Helper functions for tracking events
export const trackEvent = (eventName: string, parameters?: any) => {
  if (process.env.NODE_ENV === 'production') {
    // Google Analytics
    if (window.gtag) {
      window.gtag('event', eventName, parameters);
    }
    
    // Meta Pixel
    if (window.fbq) {
      window.fbq('track', eventName, parameters);
    }
  }
};

export const trackConversion = (conversionType: string, value?: number) => {
  if (process.env.NODE_ENV === 'production') {
    // Google Analytics conversion
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: `${GA_MEASUREMENT_ID}/${conversionType}`,
        value: value,
        currency: 'USD'
      });
    }
    
    // Meta Pixel conversion
    if (window.fbq) {
      window.fbq('track', 'Purchase', {
        value: value,
        currency: 'USD'
      });
    }
  }
};

export const trackLead = (leadSource: string) => {
  trackEvent('generate_lead', {
    lead_source: leadSource,
    page_location: window.location.href,
    page_title: document.title
  });
};