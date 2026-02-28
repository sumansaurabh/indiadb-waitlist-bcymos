import React from "react";
import { cn } from "~/lib/utils";
import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IconBrandYoutubeFilled } from "@tabler/icons-react";
import { Link } from "@remix-run/react";
import { SplineHoverCubes } from "~/components/ui/spline-hover-cubes";
import { SplineHoverSphere } from "~/components/ui/spline-hover-sphere";
import { SplineRobotGreeter } from "~/components/ui/spline-robot-greeter";

export function FeaturesSectionWithBentoGrid() {
  const features = [
    {
      title: "Interactive 3D Hover Effects",
      description:
        "Immersive hover-activated cubes with textured transitions. Perfect for hero sections and interactive showcases.",
      skeleton: <SkeletonFive />,
      className:
        "col-span-1 md:col-span-3 lg:col-span-3 border-b md:border-r dark:border-neutral-800",
    },
    {
      title: "Reactive Sphere Animation",
      description:
        "A mesmerizing sphere made of smaller spheres that react on hover with color and size changes. Ideal for techy landing pages.",
      skeleton: <SkeletonSix />,
      className:
        "col-span-1 md:col-span-3 lg:col-span-3 border-b dark:border-neutral-800",
    },
    {
      title: "Friendly Robot Greeter",
      description:
        "Meet your cheerful website mascot! This interactive robot tracks your cursor, creating eye contact and a welcoming presence.",
      skeleton: <SkeletonSeven />,
      className: "col-span-1 md:col-span-2 lg:col-span-2 border-b md:border-r dark:border-neutral-800",
    },
    {
      title: "Capture pictures with AI",
      description:
        "Capture stunning photos effortlessly using our advanced AI technology.",
      skeleton: <SkeletonTwo />,
      className: "col-span-1 md:col-span-2 lg:col-span-2 border-b md:border-r dark:border-neutral-800",
    },
    {
      title: "Watch our AI on YouTube",
      description:
        "Whether its you or Tyler Durden, you can get to know about our product on YouTube",
      skeleton: <SkeletonThree />,
      className:
        "col-span-1 md:col-span-2 lg:col-span-2 border-b dark:border-neutral-800",
    },
  ];
  return (
    <div className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto">
      <div className="px-8">
        <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
          Packed with thousands of features
        </h4>

        <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
          From Image generation to video generation, Everything AI has APIs for
          literally everything. It can even create this website copy for you.
        </p>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 mt-12 xl:border rounded-md dark:border-neutral-800">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className="h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="max-w-5xl mx-auto text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        "text-sm md:text-base max-w-4xl text-left mx-auto",
        "text-neutral-500 text-center font-normal dark:text-neutral-300",
        "text-left max-w-sm mx-0 md:text-sm my-2"
      )}
    >
      {children}
    </p>
  );
};

export const SkeletonOne = () => {
  return (
    <div className="relative flex py-8 px-2 gap-10 h-full">
      <div className="w-full p-5 mx-auto bg-white dark:bg-neutral-900 shadow-2xl group h-full">
        <div className="flex flex-1 w-full h-full flex-col space-y-2">
          <img
            src="https://ui.aceternity.com/_next/image?url=%2Flinear.webp&w=1920&q=75"
            alt="header"
            className="h-full w-full aspect-square object-cover object-left-top rounded-sm"
          />
        </div>
      </div>

      <div className="absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-white dark:from-black via-white dark:via-black to-transparent w-full pointer-events-none" />
      <div className="absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-white dark:from-black via-transparent to-transparent w-full pointer-events-none" />
    </div>
  );
};

export const SkeletonThree = () => {
  return (
    <Link
      to="https://www.youtube.com/watch?v=RPa3_AD1_Vs"
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex gap-10 h-full group/image"
    >
      <div className="w-full mx-auto bg-transparent dark:bg-transparent group h-full">
        <div className="flex flex-1 w-full h-full flex-col space-y-2 relative">
          <IconBrandYoutubeFilled className="h-20 w-20 absolute z-10 inset-0 text-red-500 m-auto" />
          <img
            src="https://assets.aceternity.com/fireship.jpg"
            alt="header"
            className="h-full w-full aspect-square object-cover object-center rounded-sm blur-none group-hover/image:blur-md transition-all duration-200"
          />
        </div>
      </div>
    </Link>
  );
};

export const SkeletonTwo = () => {
  const images = [
    "https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=3425&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=2581&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const imageVariants = {
    whileHover: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
    whileTap: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
  };
  return (
    <div className="relative flex flex-col items-start p-8 gap-10 h-full overflow-hidden">
      <div className="flex flex-row -ml-20">
        {images.map((image, idx) => (
          <motion.div
            variants={imageVariants}
            key={"images-first" + idx}
            style={{
              rotate: Math.random() * 20 - 10,
            }}
            whileHover="whileHover"
            whileTap="whileTap"
            className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
          >
            <img
              src={image}
              alt="bali images"
              className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
            />
          </motion.div>
        ))}
      </div>
      <div className="flex flex-row">
        {images.map((image, idx) => (
          <motion.div
            key={"images-second" + idx}
            style={{
              rotate: Math.random() * 20 - 10,
            }}
            variants={imageVariants}
            whileHover="whileHover"
            whileTap="whileTap"
            className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
          >
            <img
              src={image}
              alt="bali images"
              className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
            />
          </motion.div>
        ))}
      </div>

      <div className="absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent h-full pointer-events-none" />
      <div className="absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l from-white dark:from-black to-transparent h-full pointer-events-none" />
    </div>
  );
};

export const SkeletonFour = () => {
  return (
    <div className="h-60 md:h-60 flex flex-col items-center relative bg-transparent dark:bg-transparent mt-10">
      <Globe className="absolute -right-10 md:-right-10 -bottom-80 md:-bottom-72" />
    </div>
  );
};

/**
 * SkeletonFive: Demonstrates proper placement of 3D Spline hover cubes
 *
 * Key Features:
 * - Content positioned in top-left corner (safe zone)
 * - 3D scene takes full space without obstruction
 * - Gradient overlay at bottom for smooth transitions
 * - Proper z-index layering (scene: 0, overlay: 10, content: 20)
 *
 * Tags: #hero #landing #hover #interaction #cubes #cursor #dark #neon
 * Color: #3F2B6D (Deep Purple with neon accents)
 */
export const SkeletonFive = () => {
  return (
    <div className="relative flex h-full min-h-[500px] w-full overflow-hidden rounded-lg bg-gradient-to-br from-slate-950 via-[#3F2B6D]/20 to-slate-900">
      {/* 3D Spline Scene - Layer 0 (Background) */}
      <SplineHoverCubes className="absolute inset-0 z-0" />

      {/* Content positioned in safe zone (top-left) - Layer 20 */}
      <div className="absolute top-6 left-6 z-20 max-w-xs">
        <div className="rounded-lg bg-black/40 backdrop-blur-sm p-4 border border-purple-500/20">
          <h3 className="text-sm font-semibold text-white mb-1">
            Hover to Interact
          </h3>
          <p className="text-xs text-purple-200/80">
            Move your cursor over the scene to reveal animated cubes with textured transitions
          </p>
        </div>
      </div>

      {/* Bottom gradient overlay - Layer 10 */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-24 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

      {/* Corner accent indicator (shows safe zone) */}
      <div className="absolute bottom-4 right-4 z-20">
        <div className="px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/30 backdrop-blur-sm">
          <span className="text-xs font-medium text-purple-300">#hover #cubes #dark</span>
        </div>
      </div>
    </div>
  );
};

/**
 * SkeletonSix: Interactive Hover Sphere
 *
 * Key Features:
 * - Large sphere made of smaller reactive spheres
 * - Hover-triggered size and color changes
 * - Wave-like animations with green/blue color palette
 * - Best as centerpiece with minimal overlay
 *
 * Tags: #hero #interactive #hover #animation #sphere #green #blue #wave #tech
 * Colors: Green, Blue, Teal (cyan)
 */
export const SkeletonSix = () => {
  return (
    <div className="relative flex h-full min-h-[500px] w-full overflow-hidden rounded-lg bg-gradient-to-br from-slate-950 via-teal-900/20 to-blue-950">
      {/* 3D Spline Scene - Layer 0 (Background) */}
      <SplineHoverSphere className="absolute inset-0 z-0" />

      {/* Content positioned in safe zone (top-left) - Layer 20 */}
      <div className="absolute top-6 left-6 z-20 max-w-xs">
        <div className="rounded-lg bg-black/40 backdrop-blur-sm p-4 border border-teal-500/20">
          <h3 className="text-sm font-semibold text-white mb-1">
            Interactive Sphere
          </h3>
          <p className="text-xs text-teal-200/80">
            Hover over the sphere to see the smaller spheres react with size and color changes
          </p>
        </div>
      </div>

      {/* Bottom gradient overlay - Layer 10 */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-24 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

      {/* Corner accent indicator */}
      <div className="absolute bottom-4 right-4 z-20">
        <div className="px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-400/30 backdrop-blur-sm">
          <span className="text-xs font-medium text-teal-300">#sphere #hover #wave</span>
        </div>
      </div>
    </div>
  );
};

/**
 * SkeletonSeven: Friendly Robot Greeter
 *
 * Key Features:
 * - Cursor tracking with smooth head movement
 * - Creates eye contact effect
 * - Friendly smiling character
 * - Perfect for welcoming visitors
 *
 * Tags: #robot #character #bot #mascot #friendly #greeting #welcome
 * Colors: Black/Dark with Coral/Pink accents (#FFB5B5, #FF9B9B)
 */
export const SkeletonSeven = () => {
  return (
    <div className="relative flex h-full min-h-[450px] w-full overflow-hidden rounded-lg bg-gradient-to-br from-gray-950 via-gray-900 to-slate-950">
      {/* 3D Spline Robot - Layer 0 (Background) */}
      <SplineRobotGreeter className="absolute inset-0 z-0" />

      {/* Content positioned in top-right corner - Layer 20 */}
      <div className="absolute top-6 right-6 z-20 max-w-[200px]">
        <div className="rounded-lg bg-black/40 backdrop-blur-sm p-3 border border-pink-500/20">
          <h3 className="text-xs font-semibold text-white mb-1">
            👋 Hello!
          </h3>
          <p className="text-[10px] text-pink-200/80 leading-snug">
            Move your cursor around - I'll follow with my eyes!
          </p>
        </div>
      </div>

      {/* Bottom gradient overlay - Layer 10 */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-20 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />

      {/* Corner accent indicator */}
      <div className="absolute bottom-4 left-4 z-20">
        <div className="px-2.5 py-1 rounded-full bg-pink-500/10 border border-pink-400/30 backdrop-blur-sm">
          <span className="text-[10px] font-medium text-pink-300">#robot #greeter</span>
        </div>
      </div>
    </div>
  );
};

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.01;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      className={className}
    />
  );
};