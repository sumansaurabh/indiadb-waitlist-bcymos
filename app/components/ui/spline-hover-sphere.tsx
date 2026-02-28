import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineHoverSphereProps {
  className?: string
}

/**
 * ===============================================
 * Spline 3D Scene: Interactive Hover Sphere
 * ===============================================
 *
 * @description
 * Hero section interaction concept featuring a large sphere composed of smaller
 * spheres that react on hover by changing size and color. Perfect for techy
 * landing pages with an innovative, futuristic feel.
 *
 * @features
 * - Large sphere made of smaller reactive spheres
 * - Hover-triggered size and color changes
 * - Smooth wave-like animations
 * - Green/blue/teal color palette
 * - Perfect for tech-focused landing pages
 * - Mesmerizing interactive visual effect
 *
 * @colorScheme
 * Primary: Green, Blue, Teal (cyan)
 * Theme: Dark with vibrant green/blue accents
 * Style: Tech, futuristic, innovative, modern
 * Accent: Wave effects with color transitions
 *
 * @tags
 * #hero #interactive #hover #animation #landing #tech #sphere #green #blue #wave
 *
 * @useCases
 * ✓ Hero sections (techy landing pages)
 * ✓ Technology showcases
 * ✓ Innovation-focused pages
 * ✓ Product launches (tech products)
 * ✓ Interactive portfolio headers
 * ✓ SaaS landing pages
 * ✓ AI/ML product pages
 *
 * ⚠️ IMPORTANT PLACEMENT GUIDELINES ⚠️
 *
 * DO:
 * ✓ Use as hero section centerpiece with minimal text overlay
 * ✓ Give the sphere space to breathe (min 500px height)
 * ✓ Place text in corners or sides, not covering the sphere
 * ✓ Use dark backgrounds to make colors pop
 * ✓ Position CTAs below or to the side of the sphere
 * ✓ Allow full viewport width for maximum impact
 *
 * DON'T:
 * ✗ Cover the sphere with dense content
 * ✗ Use on light backgrounds (colors won't show well)
 * ✗ Place in small containers (< 500px)
 * ✗ Overlay forms or complex UI elements
 * ✗ Use multiple instances on the same page
 *
 * @layoutExample
 * GOOD: Sphere as focal point, text positioned around it
 * - Container: Full viewport or large section (min 600px height)
 * - Sphere: Center positioned with absolute layout
 * - Text: Top-left or bottom-left corners
 * - CTA: Bottom-right or centered below sphere
 *
 * BAD: Sphere blocked by centered content
 * - Avoid: Large centered text boxes that cover interaction area
 * - Avoid: Forms or input fields overlapping the sphere
 *
 * @responsive
 * - Desktop: Full interactive experience, optimal size
 * - Tablet: Reduced sphere size, maintain interactivity
 * - Mobile: Consider reducing animation complexity or static fallback
 *
 * @performance
 * - Lazy loaded for optimal initial page load
 * - Uses Suspense for graceful loading state
 * - Recommended: Single instance per page
 * - GPU-intensive: Test on target devices
 *
 * @accessibility
 * - Provide text alternative describing the interactive sphere
 * - Don't rely on sphere interaction for critical information
 * - Ensure keyboard navigation for all CTAs
 * - Consider reduced-motion preferences
 */
export function SplineHoverSphere({ className }: SplineHoverSphereProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-900/20 to-blue-900/20">
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400"></div>
              <div className="absolute inset-0 animate-ping rounded-full h-12 w-12 border border-blue-400 opacity-20"></div>
            </div>
            <span className="text-teal-300/70 text-sm">Loading Interactive Sphere...</span>
          </div>
        </div>
      }
    >
      <Spline
        scene="https://prod.spline.design/48VBTd2o7FCZRCte/scene.splinecode"
        className={className}
      />
    </Suspense>
  )
}
