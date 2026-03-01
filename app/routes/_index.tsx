import { json, type ActionFunctionArgs, type LinksFunction, type MetaFunction } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Check, ArrowRight } from "lucide-react";
import { env } from "~/lib/env.server";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ProductHuntEmbed } from "~/components/product-hunt-embed";

export const meta: MetaFunction = () => {
  return [
    { title: "IndBase.in | Postgres Development Platform for India" },
    { name: "description", content: "Join the IndBase waitlist for India's self-reliant Postgres development platform." },
    { name: "keywords", content: "postgres india, database india, waitlist, indbase, db india" },
    { property: "og:title", content: "IndBase.in | Postgres Development Platform for India" },
    { property: "og:description", content: "Join the IndBase waitlist for India's self-reliant Postgres development platform." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://IndBase.in/" },
    { property: "og:image", content: "https://IndBase.in/postgres-db-india-badge.png" },
    { property: "og:image:alt", content: "Postgres DB India badge with tricolor elephant emblem" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "IndBase.in | Postgres Development Platform for India" },
    { name: "twitter:description", content: "Join the IndBase waitlist for India's self-reliant Postgres development platform." },
    { name: "twitter:image", content: "https://IndBase.in/postgres-db-india-badge.png" },
  ];
};

export const links: LinksFunction = () => [
  { rel: "canonical", href: "https://IndBase.in/" },
];

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");

  if (typeof email !== "string" || !email.includes("@")) {
    return json({ error: "Please enter a valid email address.", success: false }, { status: 400 });
  }

  try {
    const response = await fetch(env.WAITLIST_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        src: env.WAITLIST_SRC,
      }),
    });

    if (response.ok) {
      return json({ success: true, message: "Welcome to the community! You've been added to the waitlist." });
    }

    const errorText = await response.text();
    const normalizedErrorText = errorText.toLowerCase();

    if (response.status === 409 || normalizedErrorText.includes("already")) {
      return json({ success: true, message: "You're already on the list! We'll be in touch soon." });
    }

    console.error("Waitlist API error:", response.status, errorText);
    return json({ error: "Unable to join waitlist right now. Please try again.", success: false }, { status: 502 });
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

  const indiaBuilderPriorities = [
    "Data residency within India",
    "Compliance clarity with Indian regulations",
    "Support in IST timezone",
    "Local-friendly billing",
    "A community that understands Indian builders",
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white text-slate-900 selection:bg-amber-100 selection:text-amber-900 font-sans">
      {/* Background Gradients - Adjusted for White Theme */}
      <div className="absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-amber-50/60 blur-[100px]" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-amber-100/60 blur-[100px]" />
      <div className="absolute top-[40%] left-[50%] h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-violet-100/50 blur-[80px]" />

      {/* Grid Pattern Overlay - Darker for visibility on white */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-12 sm:px-6 lg:px-8">
        {/* Header / Nav */}
        <header className="flex items-center justify-between py-6">
          <div className="flex items-center gap-2">
            <img
              src="/peepal-leaf-logo.svg"
              alt="IndBase logo"
              className="h-8 w-8 rounded-lg object-contain shadow-md"
              loading="eager"
            />
            <span className="text-xl font-bold tracking-tight text-slate-900 font-ibm">IndBase.in</span>
          </div>
          {/* Nav removed as requested */}
        </header>

        {/* Main Content */}
        <main className="flex flex-1 flex-col items-center justify-center py-12 md:py-24 text-center">
          

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 max-w-4xl text-6xl font-bold tracking-tight text-slate-900 sm:text-7xl md:text-8xl lg:text-9xl font-ibm leading-[0.9]"
          >
            Database for <br className="hidden sm:block" />
            <span className="text-amber-700">
              India's Builders
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12 max-w-2xl text-lg text-slate-600 md:text-xl font-sans"
          >
            Postgres Development Platform for Indian users.
          </motion.p>

          {/* Waitlist Form Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-md"
          >
            <div className="relative overflow-hidden rounded-2xl bg-white/70 p-1 shadow-2xl shadow-amber-100/50 backdrop-blur-xl border border-slate-200 ring-1 ring-white/50">
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
                      className="mt-2 text-amber-700 hover:text-amber-800 hover:bg-amber-50"
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
                            className="h-12 border-slate-200 bg-white pl-4 text-slate-900 placeholder:text-slate-400 focus:border-amber-400 focus:ring-amber-400/20 shadow-sm"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="h-12 w-full bg-stone-600 text-white shadow-lg shadow-stone-300/30 transition-all hover:bg-stone-700 hover:scale-[1.02] active:scale-[0.98] font-medium"
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

          {/* Product Hunt Embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 flex justify-center w-full"
          >
            <ProductHuntEmbed />
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-16 w-full max-w-4xl"
            aria-labelledby="india-badge-title"
          >
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/60 p-6 shadow-xl shadow-amber-50/50 backdrop-blur-md sm:p-8">
              <div className="absolute -top-20 right-0 h-44 w-44 rounded-full bg-amber-50/70 blur-3xl" />
              <div className="absolute -bottom-20 left-0 h-44 w-44 rounded-full bg-amber-100/70 blur-3xl" />

              <div className="relative grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-center">
                <div className="text-left">
                  <p className="mb-3 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-700">
                    India-ready identity
                  </p>
                  <h2 id="india-badge-title" className="mb-3 text-3xl font-bold leading-tight text-slate-900 font-ibm sm:text-4xl">
                    Postgres DB India
                  </h2>
                  <p className="text-slate-600">
                    A dedicated India-first experience for builders who want local reliability, clarity, and ownership.
                  </p>
                </div>

                <div className="mx-auto w-full max-w-sm">
                  <img
                    src="/postgres-db-india-badge.png"
                    alt="Postgres DB India emblem showing an elephant in Indian tricolor"
                    className="h-auto w-full rounded-2xl border border-slate-200 bg-white p-2 shadow-lg shadow-slate-300/30"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </motion.section>

          {/* India-First Priorities */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-20 w-full max-w-4xl rounded-3xl border border-slate-200 bg-white/55 p-6 shadow-xl shadow-amber-50/40 backdrop-blur-md sm:p-8"
          >
            <h3 className="text-left text-2xl font-bold text-slate-900 font-ibm sm:text-3xl">
              Trying to build for India from day one
            </h3>
            <ul className="mt-6 space-y-3 text-left">
              {indiaBuilderPriorities.map((priority) => (
                <li
                  key={priority}
                  className="rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-sm font-medium text-slate-700 sm:text-base"
                >
                  {priority}
                </li>
              ))}
            </ul>
          </motion.div>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "IndBase.in",
                url: "https://IndBase.in/",
                description: "Postgres development platform for Indian users.",
                image: "https://IndBase.in/postgres-db-india-badge.png",
              }),
            }}
          />
        </main>

        <footer className="py-8 text-center text-sm text-slate-500 px-4">
          <p className="mb-2">Since Supabase was blocked in India, India is building its own self-reliant database platform.</p>
          <p>Made in India.</p>
          <p>© {new Date().getFullYear()} Snorkell Associates and Co.</p>          
        </footer>
      </div>
    </div>
  );
}
