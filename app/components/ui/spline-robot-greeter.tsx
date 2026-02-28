import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineRobotGreeterProps {
  className?: string
}

/**
 * ===============================================
 * Spline 3D Scene: Interactive Robot Greeter
 * ===============================================
 *
 * @description
 * Meet the friendly interactive robot - your cheerful greeter! This 3D animated
 * character constantly tracks your cursor by smoothly turning its head, creating
 * a sense of eye contact and connection with visitors. Perfect for creating a
 * welcoming, engaging, and memorable first impression.
 *
 * @features
 * - Cursor tracking with smooth head movement
 * - Creates eye contact effect with visitors
 * - Friendly smiling character design
 * - Constantly follows mouse movement
 * - Cheerful and welcoming presence
 * - Perfect for greetings and introductions
 * - Adds personality to your website
 *
 * @colorScheme
 * Primary: Black/Dark Gray (#1a1a1a, #2a2a2a)
 * Accent: Coral/Pink (#FFB5B5, #FF9B9B, peachy-pink)
 * Face: Dark with white smile
 * Theme: Dark with warm pink/coral accents
 * Style: Friendly, modern, playful, welcoming
 *
 * @tags
 * #robot #character #bot #mascot #smile #assistant #greeting #welcome #salute #friendly
 *
 * @useCases
 * ✓ Website greeters (hero sections)
 * ✓ About page introductions
 * ✓ Customer support sections
 * ✓ Landing page mascots
 * ✓ Portfolio character introductions
 * ✓ Chatbot representations
 * ✓ Help/Support pages
 * ✓ Team/Contact pages
 *
 * ⚠️ IMPORTANT PLACEMENT GUIDELINES ⚠️
 *
 * DO:
 * ✓ Place in hero sections as a welcoming character
 * ✓ Use as side companion (left or right corner)
 * ✓ Position where cursor tracking is visible
 * ✓ Give 400px-600px height for full character visibility
 * ✓ Use on dark backgrounds to match color scheme
 * ✓ Pair with greeting text nearby
 * ✓ Center in greeting sections
 *
 * DON'T:
 * ✗ Hide the robot's face (cursor tracking is the key feature)
 * ✗ Use in cramped spaces (< 400px)
 * ✗ Place where cursor won't naturally move
 * ✗ Use on light backgrounds (colors won't match)
 * ✗ Overlap with other interactive elements
 * ✗ Use multiple instances on same page
 *
 * @layoutExample
 * GOOD: Robot as side companion with greeting text
 * - Container: Section with adequate height (500px+)
 * - Robot: Positioned left or right side
 * - Text: Opposite side with greeting message
 * - Cursor space: Plenty of area for tracking effect
 *
 * BAD: Robot hidden or cramped
 * - Small container that cuts off character
 * - Overlapping content blocking the face
 * - Light background that doesn't match theme
 *
 * @interactivity
 * KEY FEATURE: Cursor Tracking
 * - Robot head follows mouse cursor smoothly
 * - Creates eye contact effect
 * - Enhances user engagement
 * - Works best with open space around robot
 * - Most effective when users naturally move cursor nearby
 *
 * @responsive
 * - Desktop: Full tracking experience, optimal
 * - Tablet: Reduced size, touch tracking may vary
 * - Mobile: Static or reduced tracking (touch doesn't have cursor)
 * - Consider: Mobile users won't get full cursor tracking effect
 *
 * @performance
 * - Lazy loaded for optimal initial page load
 * - Uses Suspense for graceful loading state
 * - Recommended: Single instance per page
 * - Tracking animation is GPU-accelerated
 *
 * @accessibility
 * - Provide text alternative describing the robot
 * - Don't rely on robot for critical information
 * - Ensure all actions have keyboard alternatives
 * - Consider motion sensitivity preferences
 * - Robot is decorative/engagement enhancement
 */
export function SplineRobotGreeter({ className }: SplineRobotGreeterProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900/20 to-gray-950/20">
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="animate-bounce rounded-full h-16 w-16 bg-gradient-to-br from-pink-400/20 to-coral-400/20 border-2 border-pink-300/50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-2xl">🤖</div>
              </div>
            </div>
            <span className="text-pink-300/70 text-sm">Loading Robot...</span>
          </div>
        </div>
      }
    >
      <Spline
        scene="https://prod.spline.design/Zrzvhl0glLnIKAeZ/scene.splinecode"
        className={className}
      />
    </Suspense>
  )
}
