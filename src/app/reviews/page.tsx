import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { CardConnectors } from "@/components/site/CardConnectors";
import { Interactive3DCard } from "@/components/ui/Interactive3DCard";
import { ReviewCard, ReviewSummary } from "@/components/site/ReviewCard";
import { ReviewForm } from "@/components/site/ReviewForm";
import { summarise } from "@/lib/reviews-types";
import { REVIEWS_KEYWORDS, breadcrumbSchema } from "@/lib/seo";
import { fetchReviews } from "@/server/reviews";

export async function generateMetadata(): Promise<Metadata> {
  const reviews = await fetchReviews();
  const total = reviews.length;

  return {
    title: "Client Reviews | NovaMind AI",
    description:
      total > 0
        ? `Read ${total} review${total === 1 ? "" : "s"} of NovaMind AI — websites, AI automation, SEO, ERP and POS software — published unedited, or add your own.`
        : "Client reviews of NovaMind AI — websites, AI automation, SEO, ERP and POS software — published unedited, with the reviewer's own name and company. Add your own.",
    keywords: REVIEWS_KEYWORDS.join(", "),
    openGraph: {
      title: "Client Reviews — NovaMind AI",
      description:
        "What clients say about working with NovaMind AI, in their own words and unedited.",
      type: "website",
      url: "https://www.novamindai.info/reviews",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function ReviewsPage() {
  const reviews = await fetchReviews();
  const hasReviews = reviews.length > 0;

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([{ name: "Reviews", path: "/reviews" }])),
        }}
      />

      <section className="hero-surface relative overflow-hidden border-b border-border">
        <span className="orb left-[-8%] top-[-20%] h-72 w-72 bg-[var(--olive)]" />
        <span
          className="orb right-[-6%] top-[10%] h-80 w-80 bg-[var(--gold)]"
          style={{ animationDelay: "3s" }}
        />
        <div className="relative mx-auto max-w-6xl px-5 py-24">
          <Reveal>
            <span className="eyebrow">Client Reviews</span>
            <h1 className="mt-6 text-4xl font-bold sm:text-5xl">
              What our clients say, <span className="text-shimmer">in their own words.</span>
            </h1>
            <ReviewSummary {...summarise(reviews)} />
            <p className="mt-5 max-w-2xl text-muted-foreground">
              Reviews are published exactly as they were written, with the reviewer's own name and
              company. We do not edit the wording and we do not filter out the criticism.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#write" className="btn-primary shine">
                Write a review
              </a>
              <Link href="/contact" className="btn-ghost">
                Work with us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {hasReviews ? (
        <>
          <h2 className="sr-only">All NovaMind AI client reviews</h2>
          <section className="mx-auto max-w-6xl px-5 py-20">
            <CardConnectors className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review, i) => (
                <Reveal key={review.id} delay={(i % 3) * 90} className="h-full">
                  <Interactive3DCard intensity={10} className="h-full">
                    <ReviewCard review={review} />
                  </Interactive3DCard>
                </Reveal>
              ))}
            </CardConnectors>
          </section>
        </>
      ) : (
        <section className="mx-auto max-w-4xl px-5 pt-20">
          <div className="panel p-8 sm:p-10">
            <h2 className="text-2xl font-bold">No reviews yet.</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Reviews on this page are written by the people we have worked with, and they go live
              the moment they are submitted. Nobody has left one yet, so rather than fill the space
              with quotes we cannot stand behind, it stays empty until there are real ones to show.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              If we have worked together, yours would be the first.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#write" className="btn-primary">
                Write a review <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/contact" className="btn-ghost">
                Ask for references
              </Link>
            </div>
          </div>
        </section>
      )}

      <section id="write" className="mx-auto max-w-3xl scroll-mt-24 px-5 py-24">
        <Reveal>
          <ReviewForm />
        </Reveal>
      </section>

      {hasReviews && (
        <section className="mx-auto max-w-6xl px-5 pb-24">
          <Reveal>
            <div className="panel shine relative overflow-hidden p-10 text-center">
              <span className="orb left-1/2 top-0 h-56 w-56 -translate-x-1/2 bg-[var(--gold)]" />
              <h2 className="relative text-3xl font-bold">
                Ready to be the <span className="text-shimmer">next one?</span>
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-muted-foreground">
                Book a free audit and we will map the fastest path to growth for your business.
              </p>
              <Link href="/contact" className="btn-primary shine relative mt-8">
                Get a free audit
              </Link>
            </div>
          </Reveal>
        </section>
      )}
    </div>
  );
}
