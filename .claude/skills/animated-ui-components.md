# Animated UI Components Guide

## Overview
This project includes advanced animated UI components from the 21st.dev and Aceternity UI registries. These components provide modern, interactive effects for creating engaging, premium-looking interfaces.

## Available Components

### 1. HeroGeometric Component
**Location**: `~/components/ui/shape-landing-hero.tsx`

**Purpose**: Elegant full-screen hero section with floating geometric shapes and animated text reveal.

**Features**:
- Full-screen dark theme hero with gradient overlay
- 5 animated floating geometric shapes with different colors
- Smooth fade-up text animations with staggered delays
- Customizable badge, title, and subtitle
- Responsive design with mobile breakpoints
- Glassmorphic shapes with backdrop blur

**Visual Effect**: Dark, elegant landing page with floating translucent shapes that slowly drift vertically, creating depth and visual interest.

**Usage**:
```tsx
import { HeroGeometric } from "~/components/ui/shape-landing-hero";

export default function Index() {
  return (
    <HeroGeometric
      badge="Your Brand"
      title1="Your Main Title"
      title2="Your Subtitle"
    />
  );
}
```

**Props**:
```typescript
interface HeroGeometricProps {
  badge?: string;   // Small badge text (default: "Design Collective")
  title1?: string;  // First line of title (default: "Elevate Your Digital Vision")
  title2?: string;  // Second line with gradient (default: "Crafting Exceptional Websites")
}
```

**Customization**:
The component includes an internal `ElegantShape` component that can be modified:
- `delay`: Animation start delay
- `width/height`: Shape dimensions
- `rotate`: Initial rotation angle
- `gradient`: Tailwind gradient class (e.g., "from-indigo-500/[0.15]")
- `className`: Positioning classes

**Shape Colors Available**:
- Indigo: `from-indigo-500/[0.15]`
- Rose: `from-rose-500/[0.15]`
- Violet: `from-violet-500/[0.15]`
- Amber: `from-amber-500/[0.15]`
- Cyan: `from-cyan-500/[0.15]`

**Use Cases**:
- Landing page hero sections
- Portfolio homepages
- Agency websites
- Product launch pages
- Creative studio sites

**Performance**: Uses framer-motion for smooth animations, shapes have slow infinite float animation (12s duration).

**Important TypeScript Note**: When using custom easing arrays with framer-motion, always add `as const`:
```tsx
ease: [0.25, 0.4, 0.25, 1] as const  // ✅ Correct
ease: [0.25, 0.4, 0.25, 1]           // ❌ TypeScript error
```

---

### 2. GridBackground Component
**Location**: `~/components/ui/grid-background.tsx`

**Purpose**: Creates a fixed animated grid background with radial gradient, perfect for hero sections and landing pages.

**Features**:
- Fixed position covering entire viewport
- Radial gradient from blue (#1E40AF) to black
- Subtle grid pattern overlay (20px × 20px)
- Pointer-events disabled (doesn't interfere with interactions)
- Zero configuration required

**Visual Effect**: Creates a sophisticated tech/cyberpunk aesthetic with a glowing blue center fading to black edges, overlaid with a subtle grid pattern.

**Usage**:
```tsx
import { GridBackground } from "~/components/ui/grid-background";

export default function Index() {
  return (
    <>
      <GridBackground />
      <div className="relative z-10">
        {/* Your content here */}
      </div>
    </>
  );
}
```

**Props**: None (zero-config component)

**Customization Example**:
```tsx
// Custom colors
<div
  className="fixed inset-0 pointer-events-none"
  style={{
    background: "radial-gradient(circle at center, #7C3AED, #000000)", // Purple
  }}
>
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: `
        linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
      `,
      backgroundSize: "40px 40px", // Larger grid
    }}
  />
</div>
```

**Use Cases**:
- Landing page backgrounds
- Hero section backdrops
- Full-screen app backgrounds
- Portfolio homepages
- Tech/SaaS product pages

**Performance**: Lightweight CSS-only solution with no JavaScript overhead.

---

### 3. GlowingEffect Component
**Location**: `~/components/ui/glowing-effect.tsx`

**Purpose**: Creates an interactive, mouse-following gradient border glow effect that activates when the cursor is near.

**Features**:
- Mouse-tracking gradient border animation
- Customizable blur, proximity, spread, and colors
- Inactive zone to prevent effect near center
- Smooth motion animations using `motion/react`
- Two variants: colorful gradient (default) or white
- Can be enabled/disabled dynamically
- Respects scroll position

**Visual Effect**: A vibrant, animated gradient border that follows your mouse cursor, creating a premium, interactive feel.

**Props**:
```typescript
interface GlowingEffectProps {
  blur?: number;              // Blur amount (default: 0)
  inactiveZone?: number;      // Center zone where effect is inactive (default: 0.7, range: 0-1)
  proximity?: number;         // How close mouse needs to be to activate (default: 0)
  spread?: number;            // Spread angle of the glow (default: 20)
  variant?: "default" | "white"; // Color variant (default: "default")
  glow?: boolean;             // Enable glow effect (default: false)
  className?: string;         // Additional classes
  disabled?: boolean;         // Disable effect (default: true)
  movementDuration?: number;  // Animation duration in seconds (default: 2)
  borderWidth?: number;       // Border width in pixels (default: 1)
}
```

**Usage**:
```tsx
import { GlowingEffect } from "~/components/ui/glowing-effect";
import { Card } from "~/components/ui/card";

export function InteractiveCard() {
  return (
    <Card className="relative">
      <GlowingEffect 
        disabled={false}
        proximity={200}
        blur={5}
        spread={30}
        borderWidth={2}
      />
      <div className="p-6">
        <h3>Interactive Card</h3>
        <p>Hover near the edges to see the glow effect</p>
      </div>
    </Card>
  );
}
```

**Advanced Usage - Button with Glow**:
```tsx
import { GlowingEffect } from "~/components/ui/glowing-effect";
import { Button } from "~/components/ui/button";

export function GlowButton() {
  return (
    <div className="relative inline-block">
      <GlowingEffect 
        disabled={false}
        proximity={100}
        blur={10}
        spread={25}
        variant="default"
        glow={true}
      />
      <Button size="lg">
        Premium Action
      </Button>
    </div>
  );
}
```

**Configuration Guide**:

| Prop | Recommended Value | Effect |
|------|-------------------|--------|
| `blur` | 0-15 | Higher values create softer glow |
| `inactiveZone` | 0.5-0.8 | Larger values = bigger dead zone in center |
| `proximity` | 100-300 | Distance in pixels when effect activates |
| `spread` | 15-40 | Angle of the glow sweep |
| `movementDuration` | 1-3 | Seconds for glow to follow cursor |
| `borderWidth` | 1-3 | Thickness of the glowing border |

**Color Variants**:
- **default**: Vibrant multi-color gradient (pink, orange, green, blue)
- **white**: Clean white/grayscale effect for minimal designs

**Use Cases**:
- Premium CTA buttons
- Featured product cards
- Interactive dashboard widgets
- Pricing plan highlights
- Portfolio project cards
- Landing page hero cards

**Performance Considerations**:
- Uses `requestAnimationFrame` for smooth animations
- Automatic cleanup on unmount
- Consider disabling on mobile devices for performance
- Only enable on important interactive elements

**Dependencies**: Requires `motion` (framer-motion) package

---

### 4. ContainerScroll Component
**Location**: `~/components/ui/container-scroll-animation.tsx`

**Purpose**: Creates a scroll-triggered 3D perspective animation where content transforms from angled to flat as you scroll.

**Features**:
- Scroll-based 3D perspective transformation
- Rotates from 20° to 0° on scroll
- Scales and translates content
- Responsive behavior (different scales for mobile/desktop)
- Includes header with synchronized animation
- Card container with MacBook-style design
- Built with framer-motion

**Visual Effect**: Content starts tilted in 3D space and smoothly transforms to flat as you scroll down, creating an engaging "reveal" effect.

**Components**:
- `ContainerScroll`: Main wrapper component
- `Header`: Animated title section
- `Card`: 3D transforming card container

**Props**:
```typescript
interface ContainerScrollProps {
  titleComponent: string | React.ReactNode; // Title/header content
  children: React.ReactNode;                 // Content inside the card
}
```

**Usage**:
```tsx
import { ContainerScroll } from "~/components/ui/container-scroll-animation";

export default function ProductShowcase() {
  return (
    <ContainerScroll
      titleComponent={
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            Beautiful Product Design
          </h1>
          <p className="text-xl text-muted-foreground">
            Scroll to explore our features
          </p>
        </div>
      }
    >
      <img 
        src="/product-screenshot.png" 
        alt="Product"
        className="w-full h-full object-cover"
      />
    </ContainerScroll>
  );
}
```

**Advanced Usage - Video Content**:
```tsx
<ContainerScroll
  titleComponent={
    <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
      Watch Our Demo
    </h2>
  }
>
  <video 
    autoPlay 
    loop 
    muted 
    playsInline
    className="w-full h-full object-cover rounded-lg"
  >
    <source src="/demo.mp4" type="video/mp4" />
  </video>
</ContainerScroll>
```

**Advanced Usage - Interactive Dashboard**:
```tsx
<ContainerScroll
  titleComponent={
    <>
      <h1 className="text-6xl font-bold">Dashboard Analytics</h1>
      <p className="text-xl mt-4">Real-time insights at your fingertips</p>
    </>
  }
>
  <div className="p-8 space-y-6">
    <ChartComponent />
    <MetricsGrid />
    <RecentActivity />
  </div>
</ContainerScroll>
```

**Scroll Behavior**:
- **Desktop**: Scales from 1.05 → 1.0
- **Mobile**: Scales from 0.7 → 0.9
- **Rotation**: 20° → 0° (X-axis)
- **Translation**: 0 → -100px (header moves up)

**Container Dimensions**:
- Height: `60rem` (mobile) / `80rem` (desktop)
- Requires substantial vertical space
- Card: `30rem` (mobile) / `40rem` (desktop)

**Styling**:
- Border: 4px solid #6C6C6C
- Background: #222222
- Shadow: Multi-layered depth shadow
- Rounded corners: 30px
- Inner content area with rounded 2xl

**Use Cases**:
- Product feature showcases
- App demo presentations
- Portfolio project reveals
- Landing page hero sections
- Video presentations
- Dashboard previews
- Before/after comparisons

**Best Practices**:
1. Place at top of page or section for maximum impact
2. Ensure adequate scroll height (60-80rem)
3. Use high-quality images or videos
4. Keep title content concise
5. Test on mobile devices
6. Consider loading states for media content

**Performance Considerations**:
- Uses framer-motion for smooth animations
- Scroll listener on window
- Responsive resize listener
- Cleanup on unmount

**Dependencies**: Requires `framer-motion` package

---

## Integration Patterns

### Pattern 1: Hero Section with Grid Background
```tsx
import { GridBackground } from "~/components/ui/grid-background";
import { ContainerScroll } from "~/components/ui/container-scroll-animation";

export default function Hero() {
  return (
    <div className="relative">
      <GridBackground />
      
      <div className="relative z-10">
        <ContainerScroll
          titleComponent={
            <h1 className="text-7xl font-bold text-white">
              Welcome to the Future
            </h1>
          }
        >
          <img src="/hero-image.jpg" alt="Hero" />
        </ContainerScroll>
      </div>
    </div>
  );
}
```

### Pattern 2: Interactive Card Grid
```tsx
import { GlowingEffect } from "~/components/ui/glowing-effect";
import { Card } from "~/components/ui/card";

const features = [
  { title: "Feature 1", description: "..." },
  { title: "Feature 2", description: "..." },
  { title: "Feature 3", description: "..." },
];

export function FeatureGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {features.map((feature) => (
        <Card key={feature.title} className="relative p-6">
          <GlowingEffect 
            disabled={false}
            proximity={150}
            blur={8}
            spread={25}
          />
          <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
          <p className="text-muted-foreground">{feature.description}</p>
        </Card>
      ))}
    </div>
  );
}
```

### Pattern 3: Premium Pricing Card
```tsx
import { GlowingEffect } from "~/components/ui/glowing-effect";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

export function PricingCard({ plan, price, features, featured = false }) {
  return (
    <Card className={`relative p-8 ${featured ? 'border-primary' : ''}`}>
      {featured && (
        <GlowingEffect 
          disabled={false}
          proximity={200}
          blur={12}
          spread={35}
          variant="default"
          glow={true}
          borderWidth={2}
        />
      )}
      
      <h3 className="text-2xl font-bold">{plan}</h3>
      <div className="text-4xl font-bold my-4">${price}/mo</div>
      
      <ul className="space-y-2 mb-6">
        {features.map((feature) => (
          <li key={feature}>✓ {feature}</li>
        ))}
      </ul>
      
      <Button className="w-full" variant={featured ? "default" : "outline"}>
        Get Started
      </Button>
    </Card>
  );
}
```

### Pattern 4: Product Showcase Section
```tsx
import { GridBackground } from "~/components/ui/grid-background";
import { ContainerScroll } from "~/components/ui/container-scroll-animation";
import { GlowingEffect } from "~/components/ui/glowing-effect";

export function ProductShowcase() {
  return (
    <section className="relative min-h-screen">
      <GridBackground />
      
      <div className="relative z-10">
        <ContainerScroll
          titleComponent={
            <div className="relative inline-block">
              <GlowingEffect 
                disabled={false}
                proximity={300}
                blur={20}
                spread={40}
              />
              <h2 className="text-6xl font-bold px-8 py-4">
                Product Dashboard
              </h2>
            </div>
          }
        >
          <img src="/dashboard.png" alt="Dashboard" />
        </ContainerScroll>
      </div>
    </section>
  );
}
```

### Pattern 5: Landing Page Hero
```tsx
import { GridBackground } from "~/components/ui/grid-background";
import { GlowingEffect } from "~/components/ui/glowing-effect";
import { Button } from "~/components/ui/button";

export function LandingHero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <GridBackground />
      
      <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto px-4">
        <h1 className="text-7xl font-bold">
          Build Amazing Products
        </h1>
        <p className="text-2xl text-muted-foreground">
          The modern way to create stunning user experiences
        </p>
        
        <div className="flex gap-4 justify-center">
          <div className="relative">
            <GlowingEffect 
              disabled={false}
              proximity={150}
              blur={15}
              spread={30}
              glow={true}
            />
            <Button size="lg" className="relative z-10">
              Get Started
            </Button>
          </div>
          
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}
```

---

## Styling and Customization

### GridBackground Customization

**Color Schemes**:
```tsx
// Tech Blue (default)
background: "radial-gradient(circle at center, #1E40AF, #000000)"

// Purple Dream
background: "radial-gradient(circle at center, #7C3AED, #0F172A)"

// Green Matrix
background: "radial-gradient(circle at center, #10B981, #000000)"

// Red Cyberpunk
background: "radial-gradient(circle at center, #DC2626, #18181B)"

// Multi-stop Gradient
background: "radial-gradient(circle at center, #3B82F6 0%, #8B5CF6 50%, #000000 100%)"
```

**Grid Density**:
```tsx
// Fine grid (10px)
backgroundSize: "10px 10px"

// Standard grid (20px) - default
backgroundSize: "20px 20px"

// Large grid (50px)
backgroundSize: "50px 50px"

// Rectangular grid
backgroundSize: "30px 15px"
```

**Grid Opacity**:
```tsx
// Subtle (default)
rgba(255,255,255,0.02)

// Visible
rgba(255,255,255,0.05)

// Prominent
rgba(255,255,255,0.1)
```

### GlowingEffect Presets

**Subtle Hover Effect**:
```tsx
<GlowingEffect 
  disabled={false}
  proximity={80}
  blur={3}
  spread={15}
  variant="white"
  borderWidth={1}
/>
```

**Premium Card Effect**:
```tsx
<GlowingEffect 
  disabled={false}
  proximity={200}
  blur={10}
  spread={30}
  variant="default"
  glow={true}
  borderWidth={2}
/>
```

**Intense Spotlight**:
```tsx
<GlowingEffect 
  disabled={false}
  proximity={300}
  blur={20}
  spread={40}
  variant="default"
  glow={true}
  borderWidth={3}
  movementDuration={1}
/>
```

**Minimal White Glow**:
```tsx
<GlowingEffect 
  disabled={false}
  proximity={120}
  blur={5}
  spread={20}
  variant="white"
  borderWidth={1}
/>
```

### ContainerScroll Customization

**Adjusting Card Appearance**:
Edit the `Card` component in `container-scroll-animation.tsx`:
```tsx
// Change border color
className="border-4 border-primary"

// Change background
className="bg-gradient-to-br from-gray-900 to-black"

// Adjust padding
className="p-4 md:p-8"

// Modify border radius
className="rounded-[20px]"
```

**Custom Title Styling**:
```tsx
<ContainerScroll
  titleComponent={
    <div className="space-y-4">
      <h1 className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
        Gradient Title
      </h1>
      <p className="text-lg text-gray-400 max-w-2xl mx-auto">
        Subtitle with max width
      </p>
    </div>
  }
>
  {/* Content */}
</ContainerScroll>
```

---

## Performance Optimization

### GlowingEffect Optimization

**Mobile Strategy**:
```tsx
"use client";
import { useEffect, useState } from "react";
import { GlowingEffect } from "~/components/ui/glowing-effect";

export function OptimizedGlow() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <GlowingEffect 
      disabled={isMobile} // Disable on mobile
      proximity={200}
      blur={10}
    />
  );
}
```

**Reduce Animation Frequency**:
```tsx
<GlowingEffect 
  movementDuration={3} // Slower = smoother on low-end devices
  proximity={150}      // Smaller activation area
/>
```

### ContainerScroll Optimization

**Lazy Load Content**:
```tsx
import { lazy, Suspense } from "react";
import { Skeleton } from "~/components/ui/skeleton";

const HeavyComponent = lazy(() => import("./HeavyComponent"));

<ContainerScroll titleComponent={<h1>Title</h1>}>
  <Suspense fallback={<Skeleton className="w-full h-full" />}>
    <HeavyComponent />
  </Suspense>
</ContainerScroll>
```

**Optimize Images**:
```tsx
<ContainerScroll titleComponent={<h1>Product</h1>}>
  <img 
    src="/optimized-image.webp"
    alt="Product"
    loading="lazy"
    decoding="async"
    className="w-full h-full object-cover"
  />
</ContainerScroll>
```

### GridBackground Optimization

GridBackground is already optimized (CSS-only, no JS), but you can:

**Use CSS Variables**:
```tsx
// In your global CSS or component
<style>{`
  :root {
    --grid-color: rgba(255,255,255,0.02);
    --grid-size: 20px;
  }
`}</style>

<div style={{
  backgroundImage: `
    linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)
  `,
  backgroundSize: "var(--grid-size) var(--grid-size)",
}} />
```

---

## Common Recipes

### Recipe 1: Animated Hero with All Effects
```tsx
import { GridBackground } from "~/components/ui/grid-background";
import { ContainerScroll } from "~/components/ui/container-scroll-animation";
import { GlowingEffect } from "~/components/ui/glowing-effect";

export function UltimateHero() {
  return (
    <div className="relative">
      <GridBackground />
      
      <div className="relative z-10">
        <ContainerScroll
          titleComponent={
            <div className="relative inline-block">
              <GlowingEffect 
                disabled={false}
                proximity={250}
                blur={15}
                spread={35}
                glow={true}
              />
              <h1 className="text-7xl font-bold px-12 py-6">
                Premium Experience
              </h1>
            </div>
          }
        >
          <video autoPlay loop muted playsInline>
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        </ContainerScroll>
      </div>
    </div>
  );
}
```

### Recipe 2: Interactive Feature Cards
```tsx
import { GlowingEffect } from "~/components/ui/glowing-effect";
import { Card } from "~/components/ui/card";

const features = [
  { icon: "🚀", title: "Fast", desc: "Lightning speed" },
  { icon: "🔒", title: "Secure", desc: "Enterprise-grade" },
  { icon: "📊", title: "Analytics", desc: "Real-time data" },
];

export function InteractiveFeatures() {
  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {features.map((feature, i) => (
        <Card 
          key={i} 
          className="relative p-8 hover:shadow-2xl transition-shadow"
        >
          <GlowingEffect 
            disabled={false}
            proximity={150}
            blur={8}
            spread={25}
            borderWidth={2}
          />
          
          <div className="text-5xl mb-4">{feature.icon}</div>
          <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
          <p className="text-muted-foreground">{feature.desc}</p>
        </Card>
      ))}
    </div>
  );
}
```

### Recipe 3: Scroll-Reveal Product Demo
```tsx
import { ContainerScroll } from "~/components/ui/container-scroll-animation";
import { Badge } from "~/components/ui/badge";

export function ProductDemo() {
  return (
    <ContainerScroll
      titleComponent={
        <div className="text-center space-y-4">
          <Badge variant="secondary" className="mb-4">
            New Release
          </Badge>
          <h2 className="text-6xl font-bold">
            Meet Your New Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful analytics, beautiful design, intuitive controls
          </p>
        </div>
      }
    >
      <div className="p-4">
        <img 
          src="/dashboard-screenshot.png" 
          alt="Dashboard"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </ContainerScroll>
  );
}
```

### Recipe 4: Premium CTA Button
```tsx
import { GlowingEffect } from "~/components/ui/glowing-effect";
import { Button } from "~/components/ui/button";
import { ArrowRight } from "lucide-react";

export function PremiumCTA() {
  return (
    <div className="relative inline-block group">
      <GlowingEffect 
        disabled={false}
        proximity={100}
        blur={12}
        spread={30}
        glow={true}
        borderWidth={2}
      />
      
      <Button 
        size="lg" 
        className="relative z-10 text-lg px-8 py-6"
      >
        Get Started
        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
}
```

### Recipe 5: Background with Overlay Content
```tsx
import { GridBackground } from "~/components/ui/grid-background";

export function BackgroundSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <GridBackground />
      
      {/* Optional gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <h2 className="text-5xl font-bold mb-6">Your Content</h2>
        <p className="text-xl">Sits perfectly on top of the grid</p>
      </div>
    </section>
  );
}
```

---

## Dependencies

### Required Packages
```json
{
  "framer-motion": "^11.x",
  "motion": "^10.x"
}
```

### Installation
```bash
# If not already installed
bun add framer-motion motion
```

### Verify Installation
```bash
# Check if packages are in package.json
grep -E "framer-motion|motion" package.json
```

---

## Troubleshooting

### Framer Motion TypeScript Issues

**Problem**: Error with ease arrays - "Type 'number[]' is not assignable to type 'Easing'"
```
Type 'number[]' is not assignable to type 'Easing | Easing[]'
```

**Solution**: Add `as const` to ease arrays
```tsx
// ❌ Wrong
ease: [0.25, 0.4, 0.25, 1]

// ✅ Correct
ease: [0.25, 0.4, 0.25, 1] as const
```

**Why**: Framer-motion expects easing arrays to be tuples (fixed-length arrays) for cubic-bezier easing, not generic `number[]` arrays.

**Alternative**: Use predefined easing strings
```tsx
ease: "easeInOut"  // or "easeIn", "easeOut", "linear"
```

### HeroGeometric Issues

**Problem**: Shapes not animating
- **Solution**: Ensure framer-motion is installed, check browser supports transforms

**Problem**: Text not staggering
- **Solution**: Verify `custom` prop is passed and different for each animated element

**Problem**: Performance lag with many shapes
- **Solution**: Reduce number of shapes, increase animation duration, disable on mobile

### GridBackground Issues

**Problem**: Background not showing
- **Solution**: Ensure component is rendered, check z-index of content (should be > 0)

**Problem**: Grid pattern not visible
- **Solution**: Increase opacity in rgba values, check background color contrast

### GlowingEffect Issues

**Problem**: Effect not appearing
- **Solution**: Verify `disabled={false}`, check parent has `relative` positioning

**Problem**: Effect too subtle
- **Solution**: Increase `blur`, `spread`, or `borderWidth` values

**Problem**: Performance lag
- **Solution**: Increase `movementDuration`, reduce `proximity` area, disable on mobile

**Problem**: Effect interfering with clicks
- **Solution**: Component has `pointer-events-none`, check z-index layering

### ContainerScroll Issues

**Problem**: Animation not triggering
- **Solution**: Ensure component has sufficient scroll height, check parent container

**Problem**: Content cut off
- **Solution**: Adjust container height (60rem/80rem), check overflow settings

**Problem**: Jerky animation
- **Solution**: Reduce content complexity, optimize images, check for heavy re-renders

**Problem**: Mobile layout broken
- **Solution**: Component handles mobile automatically, check custom styling doesn't override

---

## Accessibility Considerations

### GlowingEffect
- Purely decorative - no accessibility concerns
- Consider disabling for `prefers-reduced-motion`

**Implementation**:
```tsx
"use client";
import { useEffect, useState } from "react";

export function AccessibleGlow() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
  }, []);

  return (
    <GlowingEffect 
      disabled={reducedMotion}
      proximity={200}
    />
  );
}
```

### ContainerScroll
- Uses scroll-based animations
- Should respect `prefers-reduced-motion`
- Ensure content is accessible without animation

**Implementation**:
```tsx
import { useReducedMotion } from "framer-motion";

export function AccessibleScroll() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="max-w-5xl mx-auto">
        {/* Static version without animation */}
        <div className="text-center mb-8">{titleComponent}</div>
        <div>{children}</div>
      </div>
    );
  }

  return <ContainerScroll {...props} />;
}
```

### GridBackground
- Purely decorative background
- No accessibility concerns
- Doesn't interfere with screen readers

---

## When to Use These Components

### ✅ Good Use Cases

**GridBackground**:
- Landing pages
- Hero sections
- Full-page backgrounds
- Portfolio homepages
- App login screens

**GlowingEffect**:
- Premium CTAs
- Featured pricing cards
- Interactive product cards
- Dashboard widgets
- Portfolio projects
- Important buttons

**ContainerScroll**:
- Product showcases
- Feature reveals
- App demos
- Portfolio case studies
- Landing page heroes
- Video presentations

### ❌ Avoid When

**All Components**:
- Users prefer reduced motion
- Performance-critical pages
- Content-heavy blog articles
- Form-heavy pages
- Dashboard tables (GlowingEffect)
- Very old browsers

**ContainerScroll Specifically**:
- Mobile-first designs (takes significant space)
- Pages with minimal scroll
- Below-the-fold content
- Quick information pages

---

## Browser Support

| Browser | GridBackground | GlowingEffect | ContainerScroll |
|---------|----------------|---------------|-----------------|
| Chrome 90+ | ✅ | ✅ | ✅ |
| Firefox 88+ | ✅ | ✅ | ✅ |
| Safari 14+ | ✅ | ✅ | ✅ |
| Edge 90+ | ✅ | ✅ | ✅ |
| iOS Safari 14+ | ✅ | ⚠️ Consider disabling | ✅ |
| Chrome Mobile 90+ | ✅ | ⚠️ Consider disabling | ✅ |

**Legend**:
- ✅ Full support
- ⚠️ Works but may have performance impact

---

## Additional Resources

- **Framer Motion Docs**: [framer.com/motion](https://www.framer.com/motion/)
- **Motion One Docs**: [motion.dev](https://motion.dev)
- **21st.dev Registry**: [21st.dev](https://21st.dev)
- **Aceternity UI**: [ui.aceternity.com](https://ui.aceternity.com)
