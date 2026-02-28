# 3D Components Guide

This document provides an overview of the 3D components available in the project and how to use them for creating immersive website experiences.

## Available Components

### 1. SplineScene (`splite.tsx`)

The core component for embedding 3D scenes from Spline into your React application.

**Purpose**: Renders interactive 3D models and animations created in Spline.

**Features**:
- Lazy loading with React Suspense for optimal performance
- Customizable loading fallback
- Full scene interactivity support

**Usage**:
```tsx
import { SplineScene } from "@/components/ui/splite"

<SplineScene 
  scene="https://prod.spline.design/your-scene-id/scene.splinecode"
  className="w-full h-full"
/>
```

**Props**:
- `scene` (string, required): URL to your Spline scene
- `className` (string, optional): Custom CSS classes

### 2. Spotlight (`spotlight.tsx`)

An animated spotlight effect component for creating dramatic visual emphasis.

**Purpose**: Adds an animated light/glow effect that draws attention to specific areas of your UI.

**Features**:
- SVG-based animation
- Customizable fill color
- Smooth fade-in and scale animation (2s duration with 0.75s delay)
- Responsive positioning

**Usage**:
```tsx
import { Spotlight } from "@/components/ui/spotlight"

<Spotlight
  className="-top-40 left-0 md:left-60 md:-top-20"
  fill="white"
/>
```

**Props**:
- `className` (string, optional): Custom positioning and styling
- `fill` (string, optional): Color of the spotlight (default: "white")

### 3. SplineSceneBasic (`spline-scene-basic.tsx`)

A complete, pre-built component showcasing a 3D scene with text content and spotlight effects.

**Purpose**: A ready-to-use hero/showcase section featuring a 3D robot model with accompanying text.

**Features**:
- Split-screen layout (text on left, 3D scene on right)
- Integrated spotlight animation
- Dark theme with gradient text effects
- Fully responsive design
- **Robot Model**: Features an interactive 3D robot that can be used as an engaging visual element for tech-focused websites, AI products, or creative portfolios

**Usage**:
```tsx
import { SplineSceneBasic } from "@/components/ui/spline-scene-basic"

<SplineSceneBasic />
```

**Customization**:
You can modify the component to:
- Change the 3D scene URL to any Spline design
- Update the text content and styling
- Adjust the layout proportions
- Modify colors and effects

## The Robot 3D Model

The default scene (`https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode`) features an interactive robot model.

**Use Cases**:
- **Landing Pages**: Eye-catching hero sections for tech startups
- **Product Showcases**: Demonstrating AI/ML products or robotics
- **Portfolio Sites**: Adding personality to developer/designer portfolios
- **About Pages**: Creating memorable team or company introductions
- **Loading States**: Engaging users during data loads
- **Interactive Demos**: Explaining technical concepts visually

**Why It Works**:
- Instantly captures user attention
- Conveys innovation and technology
- Interactive elements increase engagement
- Professional yet approachable aesthetic

## Creating Your Own 3D Scenes

1. Visit [Spline.design](https://spline.design)
2. Create or customize a 3D scene
3. Export/publish your scene
4. Copy the scene URL
5. Use it with the `SplineScene` component

## Performance Considerations

- Scenes are lazy-loaded by default
- Consider mobile performance when using complex 3D models
- Test scene file sizes (keep under 5MB when possible)
- Use the `SplineScene` loading fallback for better UX

## Animation Details

### Spotlight Animation
The spotlight uses a custom Tailwind animation:
- **Duration**: 2 seconds
- **Delay**: 0.75 seconds
- **Effect**: Fade in + scale + translate
- **Timing**: ease function
- **Fill mode**: forwards (maintains final state)

## Tips for Website Creation

1. **Hero Sections**: Use `SplineSceneBasic` as a starting point for impactful hero sections
2. **Loading States**: Replace the default loader with a 3D animation
3. **Interactive Elements**: Let users interact with 3D objects (rotate, zoom)
4. **Storytelling**: Use 3D scenes to guide users through your content
5. **Brand Identity**: Create custom 3D assets that reflect your brand

## Dependencies

Required packages:
- `@splinetool/react-spline`: For rendering Spline scenes
- `framer-motion`: For additional animations (if needed)
- `tailwindcss`: For styling and animations

## Browser Support

Spline scenes work on:
- ✅ Modern Chrome, Firefox, Safari, Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ⚠️ Performance may vary on older devices

## Troubleshooting

**Scene not loading?**
- Check the scene URL is correct and publicly accessible
- Verify your internet connection
- Check browser console for errors

**Performance issues?**
- Reduce scene complexity in Spline
- Optimize textures and polygon count
- Test on target devices

**Layout issues?**
- Ensure parent containers have defined heights
- Check responsive breakpoints
- Verify z-index layering
