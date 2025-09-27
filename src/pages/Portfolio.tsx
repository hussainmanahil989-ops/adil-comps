import { useState } from "react"
import { Eye, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DynamicPortfolio } from "@/components/dynamic/DynamicPortfolio"
import { SEOHead } from "@/components/seo-head"

export default function Portfolio() {
  return (
    <>
      <SEOHead 
        title="Portfolio - Professional Design Work | GFX by Adi"
        description="View my portfolio of professional logo designs, YouTube thumbnails, and video editing projects. Real results for real clients."
        keywords="portfolio, logo design examples, YouTube thumbnail portfolio, video editing samples"
        url="/portfolio"
      />
      <DynamicPortfolio />
    </>
  )
}