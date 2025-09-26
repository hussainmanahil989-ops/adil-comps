import { useEffect } from 'react';

export function LiveChat() {
  useEffect(() => {
    // Tawk.to integration
    const initTawkTo = () => {
      // Replace 'XXXXXXXXXXXXXXXXXXXXXXX' with your actual Tawk.to property ID
      const tawkToId = 'XXXXXXXXXXXXXXXXXXXXXXX';
      const tawkToKey = 'XXXXXXXXX';
      
      (window as any).Tawk_API = (window as any).Tawk_API || {};
      (window as any).Tawk_LoadStart = new Date();
      
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://embed.tawk.to/${tawkToId}/${tawkToKey}`;
      script.charset = 'UTF-8';
      script.setAttribute('crossorigin', '*');
      document.head.appendChild(script);
      
      // Customize Tawk.to widget
      (window as any).Tawk_API.onLoad = function() {
        (window as any).Tawk_API.setAttributes({
          'name': 'Website Visitor',
          'email': '',
          'hash': ''
        });
      };
      
      // Hide Tawk.to on mobile to prevent conflicts with our AI chatbot
      if (window.innerWidth < 768) {
        (window as any).Tawk_API.hideWidget();
      }
    };

    // Alternative: Crisp integration (uncomment to use instead of Tawk.to)
    const initCrisp = () => {
      // Replace 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX' with your actual Crisp website ID
      const crispWebsiteId = 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX';
      
      (window as any).$crisp = [];
      (window as any).CRISP_WEBSITE_ID = crispWebsiteId;
      
      const script = document.createElement('script');
      script.src = 'https://client.crisp.chat/l.js';
      script.async = true;
      document.head.appendChild(script);
      
      // Customize Crisp
      (window as any).$crisp.push(['set', 'user:email', '']);
      (window as any).$crisp.push(['set', 'user:nickname', 'Website Visitor']);
      (window as any).$crisp.push(['set', 'session:data', [
        ['page', window.location.pathname],
        ['source', document.referrer || 'direct']
      ]]);
    };

    // Only initialize in production and if no property ID conflicts exist
    if (process.env.NODE_ENV === 'production') {
      // Choose one: Tawk.to or Crisp (not both)
      initTawkTo();
      // initCrisp(); // Uncomment this and comment out initTawkTo() to use Crisp instead
    }
  }, []);

  return null;
}

// Helper functions for live chat interactions
export const openLiveChat = () => {
  // Tawk.to
  if ((window as any).Tawk_API && (window as any).Tawk_API.maximize) {
    (window as any).Tawk_API.maximize();
  }
  
  // Crisp
  if ((window as any).$crisp) {
    (window as any).$crisp.push(['do', 'chat:open']);
  }
};

export const setLiveChatVisitorInfo = (name: string, email: string) => {
  // Tawk.to
  if ((window as any).Tawk_API && (window as any).Tawk_API.setAttributes) {
    (window as any).Tawk_API.setAttributes({
      'name': name,
      'email': email
    });
  }
  
  // Crisp
  if ((window as any).$crisp) {
    (window as any).$crisp.push(['set', 'user:email', email]);
    (window as any).$crisp.push(['set', 'user:nickname', name]);
  }
};