import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { ArrowLeft, Calendar, Clock, User, Share2, BookOpen, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SEOHead } from "@/components/seo-head"
import { NewsletterSignup } from "@/components/newsletter-signup"

// Mock blog post data - in a real app, this would come from a CMS or API
const blogPosts = [
  {
    id: "1",
    title: "5 YouTube Thumbnail Secrets That Boost CTR by 300%",
    excerpt: "Discover the psychology behind high-converting thumbnails and the exact techniques I use to create click-magnets for my clients.",
    content: `
# 5 YouTube Thumbnail Secrets That Boost CTR by 300%

Creating thumbnails that stand out in the crowded YouTube ecosystem requires understanding both design principles and viewer psychology. After designing thousands of thumbnails for creators with millions of subscribers, I've discovered specific techniques that consistently boost click-through rates.

## The Psychology Behind Clicks

Before diving into design techniques, it's crucial to understand what makes people click. YouTube thumbnails have less than 2 seconds to capture attention and convince someone to watch your video instead of the dozens of other options on their screen.

### Secret #1: The Emotion-First Approach

The most successful thumbnails I've created all share one thing: they trigger an immediate emotional response. Whether it's curiosity, excitement, surprise, or urgency, emotion is the driving force behind clicks.

**How to implement:**
- Use facial expressions that match your video's emotion
- Include text that creates curiosity gaps ("The ONE Thing...")
- Use colors that evoke the right feeling (red for urgency, blue for trust)

### Secret #2: The 3-Second Rule

Your thumbnail must communicate the video's value proposition in 3 seconds or less. This means every element - text, images, colors - must work together to tell a clear story.

**Key elements:**
- Bold, readable text (even on mobile)
- Clear focal point that draws the eye
- Consistent branding elements
- High contrast between elements

### Secret #3: Pattern Interruption

YouTube's algorithm shows similar content together. To stand out, your thumbnail needs to break the visual pattern without being completely off-brand.

**Pattern breaking techniques:**
- Use unexpected color combinations
- Include unique visual elements
- Position subjects differently than competitors
- Experiment with negative space

### Secret #4: Mobile-First Design

Over 70% of YouTube views happen on mobile devices. If your thumbnail doesn't work on a small screen, it won't work at all.

**Mobile optimization:**
- Text should be readable at 320px width
- Important elements must be at least 150px in size
- Avoid cluttered designs with multiple focal points
- Test thumbnails at actual mobile size before publishing

### Secret #5: Data-Driven Iteration

The best thumbnails are rarely the first version. Successful creators continuously test and optimize their thumbnail performance using YouTube Analytics.

**Testing framework:**
- Create 2-3 thumbnail variations
- Monitor CTR for first 24-48 hours
- Replace underperforming thumbnails
- Document what works for future reference

## Real Results from Real Clients

Here are some actual results from implementing these techniques:

**Gaming Channel:** Increased average CTR from 4.2% to 12.8% in 30 days
**Tech Review Channel:** Boosted video views by 340% with new thumbnail strategy
**Lifestyle Vlogger:** Grew from 10K to 100K subscribers in 6 months

## Common Mistakes to Avoid

1. **Clickbait without delivery** - High CTR means nothing if retention suffers
2. **Too much text** - Keep it to 3-4 words maximum
3. **Ignoring brand consistency** - Viewers should recognize your content instantly
4. **Not considering the algorithm** - YouTube's AI analyzes thumbnail elements

## Your Next Steps

Ready to transform your YouTube thumbnails? Here's your action plan:

1. Audit your current thumbnails using these criteria
2. Create new templates based on these principles
3. A/B test your next 5 videos
4. Track performance and iterate

Remember, great thumbnails are an investment in your channel's growth. The time spent perfecting this skill will pay dividends in views, subscribers, and ultimately, revenue.

---

*Need help implementing these strategies? I offer custom thumbnail design services and one-on-one consultations to help YouTubers maximize their visual impact. [Schedule a free consultation](https://calendly.com/adilgfx) to discuss your specific needs.*
    `,
    category: "YouTube Growth",
    author: "Adil",
    date: "2024-01-15",
    readTime: "8 min read",
    image: "/api/placeholder/800/400",
    tags: ["YouTube", "Thumbnails", "CTR", "Growth", "Design"],
    featured: true
  },
  {
    id: "2",
    title: "The Ultimate Logo Design Checklist for 2024",
    excerpt: "Everything you need to know to create logos that build trust, recognition, and drive business growth in today's competitive market.",
    content: `
# The Ultimate Logo Design Checklist for 2024

A great logo is more than just a pretty symbol. It's the foundation of your brand identity and often the first impression potential customers have of your business. After designing logos for over 500 businesses, from startups to Fortune 500 companies, I've developed this comprehensive checklist that ensures every logo I create drives real business results.

## Why Logo Design Matters More Than Ever

In 2024's crowded marketplace, you have milliseconds to make an impression. Your logo appears everywhere - from social media profiles to business cards, from website headers to product packaging. It needs to work flawlessly across all these touchpoints while communicating your brand's core values instantly.

## The Complete Logo Design Checklist

### Phase 1: Strategy & Research

**✓ Brand Strategy Definition**
- [ ] Define brand personality and values
- [ ] Identify target audience demographics
- [ ] Analyze competitor logos and positioning
- [ ] Establish brand voice and tone
- [ ] Set measurable brand goals

**✓ Market Research**
- [ ] Study industry design trends
- [ ] Identify visual clichés to avoid
- [ ] Research cultural sensitivities (for global brands)
- [ ] Analyze successful brands in adjacent industries
- [ ] Understand platform-specific requirements

### Phase 2: Creative Development

**✓ Concept Development**
- [ ] Create multiple conceptual directions
- [ ] Sketch initial ideas (minimum 20 concepts)
- [ ] Explore typography-based solutions
- [ ] Develop symbol/icon variations
- [ ] Test abstract vs. literal approaches

**✓ Design Principles**
- [ ] Ensure scalability (works from favicon to billboard)
- [ ] Maintain simplicity (memorable at first glance)
- [ ] Create timeless design (avoids trendy elements)
- [ ] Establish uniqueness (differentiates from competitors)
- [ ] Confirm versatility (works in various contexts)

### Phase 3: Technical Requirements

**✓ File Formats & Specifications**
- [ ] Vector format (AI, EPS, SVG)
- [ ] High-resolution raster files (PNG, JPG)
- [ ] Black and white versions
- [ ] Reversed/knockout versions
- [ ] Favicon and social media sizes

**✓ Color Considerations**
- [ ] Primary color palette (2-3 colors maximum)
- [ ] Secondary color options
- [ ] Accessibility compliance (WCAG guidelines)
- [ ] Color psychology alignment
- [ ] Print and digital color profiles

### Phase 4: Application Testing

**✓ Scalability Testing**
- [ ] Business card size (1 inch width)
- [ ] Social media profile picture
- [ ] Website header/navigation
- [ ] Large format applications
- [ ] Mobile app icon clarity

**✓ Context Testing**
- [ ] Light and dark backgrounds
- [ ] Busy photographic backgrounds
- [ ] Various digital platforms
- [ ] Print materials and merchandise
- [ ] Signage and environmental applications

### Phase 5: Brand System Integration

**✓ Supporting Elements**
- [ ] Typography hierarchy
- [ ] Color palette extensions
- [ ] Icon system development
- [ ] Pattern and texture library
- [ ] Photography style guidelines

**✓ Usage Guidelines**
- [ ] Minimum size requirements
- [ ] Clear space specifications
- [ ] Incorrect usage examples
- [ ] Color variation rules
- [ ] Co-branding guidelines

## Red Flags to Avoid

**Design Red Flags:**
- Overly complex details that disappear when scaled down
- Trendy elements that will look dated in 2-3 years
- Poor readability at small sizes
- Colors that don't reproduce well in print
- Similarity to existing logos in your industry

**Strategic Red Flags:**
- Logo doesn't reflect brand personality
- Design appeals to designer, not target audience
- Ignores cultural context for global brands
- Fails to differentiate from competitors
- Doesn't work across required applications

## Post-Launch Success Metrics

Track these metrics to measure your logo's effectiveness:

**Brand Recognition:**
- Unaided brand recall surveys
- Social media engagement rates
- Website recognition tests
- Customer feedback analysis

**Business Impact:**
- Conversion rate improvements
- Brand trust survey results
- Sales performance correlation
- Customer acquisition costs

## Case Study: TechFlow Rebrand

When TechFlow approached me, their logo was hurting their business:
- Generic tech imagery (gears and circuits)
- Poor readability at small sizes
- Colors that looked outdated
- No emotional connection with users

**The Solution:**
- Created a modern, geometric mark representing data flow
- Developed a cohesive color system
- Ensured perfect scalability
- Built comprehensive brand guidelines

**Results:**
- 40% increase in website conversion rates
- 67% improvement in brand recognition
- $2M+ in additional revenue attributed to rebranding
- Successful $10M Series A funding round

## Your Logo Design Action Plan

1. **Audit Current Brand Identity** (Week 1)
   - Evaluate existing logo against this checklist
   - Identify gaps and opportunities
   - Gather stakeholder feedback

2. **Strategic Foundation** (Week 2)
   - Complete brand strategy exercises
   - Conduct market research
   - Define success metrics

3. **Design Development** (Weeks 3-4)
   - Create multiple concept directions
   - Test and refine top concepts
   - Develop supporting brand elements

4. **Implementation Planning** (Week 5)
   - Create brand guidelines
   - Plan rollout strategy
   - Prepare all file formats

## Professional vs. DIY: Making the Right Choice

**Choose Professional Design When:**
- Your business depends on trust and credibility
- You're in a competitive industry
- You lack design experience
- You need a complete brand system
- Your budget allows for quality investment

**DIY Might Work If:**
- You have genuine design skills
- Budget is extremely limited
- It's a temporary solution
- You're testing a business concept

## Investment Guidelines

**Startup/Small Business:** $500-$2,500
- Essential logo variations
- Basic brand guidelines
- Standard file formats

**Growing Business:** $2,500-$7,500
- Comprehensive brand system
- Multiple applications
- Detailed guidelines

**Enterprise/Rebrand:** $7,500-$25,000+
- Full brand strategy
- Extensive research phase
- Complete brand ecosystem

---

*Ready to create a logo that drives real business results? I offer comprehensive logo design packages tailored to businesses of all sizes. [Schedule a free brand consultation](https://calendly.com/adilgfx) to discuss your specific needs and goals.*
    `,
    category: "Design Tips",
    author: "Adil",
    date: "2024-01-12",
    readTime: "12 min read",
    image: "/api/placeholder/800/400",
    tags: ["Logo", "Branding", "Design", "Business", "Checklist"]
  },
  // Add more blog posts here...
]

export default function BlogPost() {
  const { id } = useParams()
  const [post, setPost] = useState<any>(null)
  const [relatedPosts, setRelatedPosts] = useState<any[]>([])

  useEffect(() => {
    // Find the blog post by ID
    const foundPost = blogPosts.find(p => p.id === id)
    setPost(foundPost)

    // Get related posts (same category, excluding current post)
    if (foundPost) {
      const related = blogPosts
        .filter(p => p.id !== id && p.category === foundPost.category)
        .slice(0, 3)
      setRelatedPosts(related)
    }
  }, [id])

  if (!post) {
    return (
      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog">
            <Button>← Back to Blog</Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <>
      <SEOHead 
        title={`${post.title} | GFX by Adi Blog`}
        description={post.excerpt}
        keywords={post.tags.join(', ')}
        url={`/blog/${post.id}`}
        type="article"
      />
      <main className="pt-24 pb-20">
        {/* Back button */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Article header */}
          <header className="mb-12">
            <div className="text-center">
              {/* Category */}
              <div className="inline-flex items-center space-x-2 mb-4">
                <span className="bg-gradient-youtube text-white px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
                <span className="text-muted-foreground text-sm">{post.readTime}</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta info */}
              <div className="flex items-center justify-center space-x-6 text-muted-foreground mb-8">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="inline-flex items-center px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Share button */}
              <Button variant="outline" className="mb-8">
                <Share2 className="h-4 w-4 mr-2" />
                Share Article
              </Button>
            </div>

            {/* Featured image */}
            <div className="aspect-video bg-muted rounded-xl overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </header>

          {/* Article content */}
          <div className="card-premium">
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <div 
                dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
                className="whitespace-pre-wrap"
              />
            </div>
          </div>

          {/* Author bio */}
          <div className="card-premium mt-12">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-youtube rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">About Adil</h3>
                <p className="text-muted-foreground mb-4">
                  Professional designer and video editor with 8+ years of experience helping brands and YouTubers 
                  transform their visual identity. Specialized in creating designs that don't just look amazing—they drive real business results.
                </p>
                <div className="flex space-x-4">
                  <Button size="sm" className="bg-gradient-youtube">
                    View Portfolio
                  </Button>
                  <Button size="sm" variant="outline">
                    Schedule Consultation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Related <span className="gradient-text-youtube">Articles</span>
              </h2>
              <p className="text-muted-foreground">More insights to help grow your brand</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.id}`}
                  className="block group"
                >
                  <div className="card-premium hover:scale-105 transition-all duration-500">
                    <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs font-medium">
                        {relatedPost.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{relatedPost.readTime}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-youtube-red transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter signup */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <NewsletterSignup showLeadMagnet={true} />
        </section>
      </main>
    </>
  )
}