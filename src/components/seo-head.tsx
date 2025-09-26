import { Helmet } from "react-helmet-async"

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
  author?: string
}

export function SEOHead({ 
  title = "Adil - Professional Logo Designer & Video Editor | GFX by Adi",
  description = "Professional logo design, YouTube thumbnails, and video editing services by Adil. Transform your brand with premium creative solutions. Fast delivery, unlimited revisions.",
  keywords = "logo design, YouTube thumbnails, video editing, graphic design, branding, creative services, Adil designer",
  image = "/og-image.jpg",
  url = "https://gfxbyadi.com",
  type = "website",
  author = "Adil - GFX by Adi"
}: SEOHeadProps) {
  const fullTitle = title.includes("Adil") ? title : `${title} | GFX by Adi`
  const fullUrl = url.startsWith("http") ? url : `https://gfxbyadi.com${url}`
  const fullImageUrl = image.startsWith("http") ? image : `https://gfxbyadi.com${image}`

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="GFX by Adi" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:creator" content="@gfxbyadi" />

      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#FF0000" />
      <meta name="msapplication-TileColor" content="#FF0000" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Adil",
          "alternateName": "GFX by Adi",
          "description": "Professional Logo Designer & Video Editor",
          "url": fullUrl,
          "image": fullImageUrl,
          "sameAs": [
            "https://fiverr.com/gfxbyadi",
            "https://facebook.com/adilgfx",
            "https://instagram.com/gfxbyadi",
            "https://linkedin.com/in/gfxbyadi"
          ],
          "jobTitle": "Graphic Designer & Video Editor",
          "knowsAbout": ["Logo Design", "YouTube Thumbnails", "Video Editing", "Brand Identity"],
          "offers": {
            "@type": "Service",
            "name": "Creative Design Services",
            "description": "Professional logo design, YouTube thumbnails, and video editing services"
          }
        })}
      </script>
    </Helmet>
  )
}