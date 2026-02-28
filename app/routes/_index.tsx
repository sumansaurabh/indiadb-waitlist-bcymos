import { json, type ActionFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Check, ArrowRight, Database } from "lucide-react";
import { getDb } from "~/lib/db.server";
import { waitlist } from "../../db/schema";
import { eq } from "drizzle-orm";
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
      emoji: "🇮🇳",
      title: "Local Support",
      description: "Support that speaks your language and understands your timezone.",
    },
    {
      emoji: "⚡",
      title: "Instant Setup",
      description: "Spin up a database in seconds. No config hell.",
    },
    {
      emoji: "🤝",
      title: "Community First",
      description: "Built for India's developers, by India's developers.",
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 font-sans">
      {/* Background Gradients - Adjusted for White Theme */}
      <div className="absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-100/60 blur-[100px]" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-blue-100/60 blur-[100px]" />
      <div className="absolute top-[40%] left-[50%] h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-violet-100/50 blur-[80px]" />

      {/* Grid Pattern Overlay - Darker for visibility on white */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-12 sm:px-6 lg:px-8">
        {/* Header / Nav */}
        <header className="flex items-center justify-between py-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-md">
              <Database className="h-4 w-4" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 font-ibm">IndiaDB</span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex gap-8 text-sm font-medium text-slate-600">
              <li className="hover:text-indigo-600 transition-colors cursor-pointer">Manifesto</li>
              <li className="hover:text-indigo-600 transition-colors cursor-pointer">Pricing</li>
              <li className="hover:text-indigo-600 transition-colors cursor-pointer">Blog</li>
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
            <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200 px-4 py-1.5 text-sm backdrop-blur-md shadow-sm">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Early Access for Vibe Coders
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 max-w-4xl text-6xl font-bold tracking-tight text-slate-900 sm:text-7xl md:text-8xl lg:text-9xl font-ibm leading-[0.9]"
          >
            Database for <br className="hidden sm:block" />
            <span className="text-indigo-600">
              India's Builders
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12 max-w-2xl text-lg text-slate-600 md:text-xl font-sans"
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
            <div className="relative overflow-hidden rounded-2xl bg-white/70 p-1 shadow-2xl shadow-indigo-200/50 backdrop-blur-xl border border-slate-200 ring-1 ring-white/50">
              <div className="rounded-xl bg-white/50 p-6 md:p-8">
                {success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center space-y-4 py-4"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 ring-4 ring-green-50">
                      <Check className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 font-ibm">You're on the list!</h3>
                    <p className="text-slate-600">
                      Thanks for joining. We'll notify you as soon as early access opens.
                    </p>
                    <Button 
                      variant="ghost" 
                      className="mt-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                      onClick={() => setSuccess(false)}
                    >
                      Add another email
                    </Button>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-6 text-center">
                      <h3 className="text-xl font-bold text-slate-900 font-ibm">Join the Waitlist</h3>
                      <p className="mt-2 text-sm text-slate-600">
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
                            className="h-12 border-slate-200 bg-white pl-4 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20 shadow-sm"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="h-12 w-full bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] font-medium"
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
                        <p className="text-center text-sm text-red-500">{actionData.error}</p>
                      )}
                    </Form>
                    <p className="mt-4 text-center text-xs text-slate-500">
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
                className="group relative overflow-hidden rounded-2xl bg-white/40 p-6 backdrop-blur-sm border border-slate-200 transition-all hover:bg-white/60 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-1"
              >
                <div className="mb-4 text-4xl">
                  {feature.emoji}
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900 font-ibm">{feature.title}</h3>
                <p className="text-sm text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </motion.div>
        </main>

        <footer className="py-8 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} IndiaDB. Made with <span className="text-red-500">❤️</span> in India.</p>
        </footer>
      </div>
    </div>
  );
}
