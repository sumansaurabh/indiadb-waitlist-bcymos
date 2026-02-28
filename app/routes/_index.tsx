import { json, type ActionFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Check, ArrowRight, Zap, Globe, Heart, ShieldCheck, Database, Code2 } from "lucide-react";
import { getDb } from "~/lib/db.server";
import { waitlist } from "../../db/schema";
import { eq } from "drizzle-orm";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";

export const meta: MetaFunction = () => {
  return [
    { title: "IndiaDB - The Database for Vibe Coders" },
    { name: "description", content: "Join the waitlist for India's first community-driven Database-as-a-Service." },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");

  if (typeof email !== "string" || !email.includes("@")) {
    return json({ error: "Please enter a valid email address.", success: false }, { status: 400 });
  }

  try {
    const db = await getDb();
    if (!db) throw new Error("Database not initialized");

    // Check if email already exists
    const existing = await db.select().from(waitlist).where(eq(waitlist.email, email));
    
    if (existing.length > 0) {
       return json({ success: true, message: "You're already on the list! We'll be in touch soon." });
    }

    await db.insert(waitlist).values({ email });
    return json({ success: true, message: "Welcome to the community! You've been added to the waitlist." });
  } catch (error) {
    console.error("Waitlist error:", error);
    return json({ error: "Something went wrong. Please try again.", success: false }, { status: 500 });
  }
}

export default function Index() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (actionData?.success) {
      setSuccess(true);
      setEmail("");
    }
  }, [actionData]);

  const features = [
    {
      icon: <Globe className="h-5 w-5 text-orange-400" />,
      title: "Local Support",
      description: "Support that speaks your language and understands your timezone.",
    },
    {
      icon: <Zap className="h-5 w-5 text-yellow-400" />,
      title: "Instant Setup",
      description: "Spin up a database in seconds. No config hell.",
    },
    {
      icon: <Heart className="h-5 w-5 text-red-400" />,
      title: "Community First",
      description: "Built for India's developers, by India's developers.",
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 text-slate-50 selection:bg-indigo-500/30">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="absolute top-[40%] left-[50%] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[100px]" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 grayscale" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-12 sm:px-6 lg:px-8">
        {/* Header / Nav */}
        <header className="flex items-center justify-between py-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 backdrop-blur-sm">
              <Database className="h-5 w-5 text-indigo-400" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">IndiaDB</span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex gap-6 text-sm font-medium text-slate-400">
              <li className="hover:text-white transition-colors cursor-pointer">Manifesto</li>
              <li className="hover:text-white transition-colors cursor-pointer">Pricing</li>
              <li className="hover:text-white transition-colors cursor-pointer">Blog</li>
            </ul>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 flex-col items-center justify-center py-12 md:py-24 text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 border-indigo-500/20 px-4 py-1.5 text-sm backdrop-blur-md">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Early Access for Vibe Coders
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 max-w-4xl text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Database for <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-orange-400 via-white to-green-400 bg-clip-text text-transparent">
              India's Builders
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10 max-w-2xl text-lg text-slate-400 md:text-xl"
          >
            Simple, scalable, and built with love for the Indian ecosystem. 
            Empowering developers and no-code creators to build the future, faster.
          </motion.p>

          {/* Waitlist Form Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-md"
          >
            <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-1 shadow-2xl backdrop-blur-xl">
              <div className="rounded-xl bg-slate-950/50 p-6 md:p-8">
                {success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center space-y-4 py-4"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-500 ring-1 ring-green-500/50">
                      <Check className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">You're on the list!</h3>
                    <p className="text-slate-400">
                      Thanks for joining. We'll notify you as soon as early access opens.
                    </p>
                    <Button 
                      variant="ghost" 
                      className="mt-2 text-indigo-400 hover:text-indigo-300 hover:bg-transparent"
                      onClick={() => setSuccess(false)}
                    >
                      Add another email
                    </Button>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-6 text-center">
                      <h3 className="text-xl font-semibold text-white">Join the Waitlist</h3>
                      <p className="mt-2 text-sm text-slate-400">
                        Be the first to experience the database built for you.
                      </p>
                    </div>

                    <Form method="post" className="space-y-4" onSubmit={() => setSuccess(false)}>
                      <div className="space-y-2">
                        <div className="relative">
                          <Input
                            type="email"
                            name="email"
                            placeholder="vibe.coder@india.dev"
                            className="h-12 border-slate-800 bg-slate-900/80 pl-4 text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 focus:ring-indigo-500/20"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="h-12 w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02] hover:shadow-indigo-500/30 active:scale-[0.98]"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Joining...
                          </>
                        ) : (
                          <>
                            Get Early Access <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                      {actionData?.error && (
                        <p className="text-center text-sm text-red-400">{actionData.error}</p>
                      )}
                    </Form>
                    <p className="mt-4 text-center text-xs text-slate-600">
                      No spam, ever. Unsubscribe anytime.
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3 w-full max-w-4xl"
          >
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/30 p-6 backdrop-blur-sm transition-all hover:border-slate-700 hover:bg-slate-900/50"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800/50 ring-1 ring-white/10 group-hover:bg-slate-800 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{feature.title}</h3>
                <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </motion.div>
        </main>

        <footer className="py-8 text-center text-sm text-slate-600">
          <p>© {new Date().getFullYear()} IndiaDB. Made with <Heart className="inline h-3 w-3 text-red-500 mx-1 fill-current" /> in India.</p>
        </footer>
      </div>
    </div>
  );
}
