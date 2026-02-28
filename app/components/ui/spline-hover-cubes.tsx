import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineHoverCubesProps {
  className?: string
}

/**
 * ===============================================
 * Spline 3D Scene: Hover Effect with Animated Cubes
 * ===============================================
 *
 * @description
 * A hover-activated 3D scene featuring dynamically appearing cubes with
 * textured transitions and interactive motion for an immersive experience.
 *
 * @features
 * - Dynamic cube appearance on cursor hover
 * - Textured transitions for visual depth
 * - Interactive motion responsive to user interaction
 * - Smooth animations with neon glow effects
 * - Dark theme optimized with purple/neon accents
 *
 * @colorScheme
 * Primary: #3F2B6D (Deep Purple)
 * Theme: Dark with neon highlights
 * Style: Dark, mysterious, futuristic
 *
 * @tags
 * #hero #landing #hover #interaction #cubes #boxes #cursor #dark #neon
 *
 * @useCases
 * ✓ Hero sections (full viewport background)
 * ✓ Feature showcases (bento grid cards)
 * ✓ Landing page centerpieces
 * ✓ Interactive portfolio sections
 * ✓ Product demonstration areas
 *
 * ⚠️ IMPORTANT PLACEMENT GUIDELINES ⚠️
 *
 * DO:
 * ✓ Use as full-screen background with content overlaid using z-index
 * ✓ Give it dedicated space without overlapping interactive elements
 * ✓ Place text/CTAs OUTSIDE the interactive area or in corners
 * ✓ Use transparent gradients at edges for smooth content transitions
 * ✓ Ensure min-height of 400px-600px for full effect visibility
 * ✓ Position content in safe zones (top-left, bottom-left corners)
 *
 * DON'T:
 * ✗ Place clickable elements directly over the 3D scene
 * ✗ Overlay dense text that blocks interaction
 * ✗ Use in small containers (< 400px height)
 * ✗ Stack multiple interactive layers on top
 * ✗ Place forms or input fields over the scene
 *
 * @layoutExample
 * GOOD: Content in corners, 3D scene has space to breathe
 * - Wrapper: relative container with fixed height (600px)
 * - Spline: absolute inset-0 (takes full space)
 * - Content: positioned absolute in corners (top-left, bottom-right)
 * - Result: 3D interaction area remains clear and interactive
 *
 * BAD: Content blocks interaction
 * - Wrapper: relative container
 * - Spline: absolute inset-0
 * - Content: absolute inset-0 centered with flex
 * - Result: Content blocks the entire 3D interaction area!
 *
 * @responsive
 * - Desktop: Full interactive experience
 * - Tablet: Reduced interaction area, optimize touch
 * - Mobile: Consider static fallback or reduced animation
 *
 * @performance
 * - Lazy loaded for optimal initial page load
 * - Uses Suspense for graceful loading state
 * - Recommended: Use in viewport-sized sections only
 *
 * @accessibility
 * - Ensure alternative content for screen readers
 * - Don't rely solely on 3D interaction for critical info
 * - Provide keyboard navigation alternatives
 */
export function SplineHoverCubes({ className }: SplineHoverCubesProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-blue-900/20">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <span className="text-white/70 text-sm">Loading 3D Experience...</span>
          </div>
        </div>
      }
    >
      <Spline
        scene="https://prod.spline.design/2brKVxQg9zPVuc-s/scene.splinecode"
        className={className}
      />
    </Suspense>
  )
}
