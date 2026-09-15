import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { getPublicBlog, type DeskBlog } from "@/lib/desk";

export const Route = createFileRoute("/blog/$slug")({ component: Page });

function Page() {
  const { slug } = Route.useParams();
  const [post, setPost] = useState<DeskBlog | null | undefined>(undefined);

  useEffect(() => {
    getPublicBlog({ data: slug })
      .then(setPost)
      .catch(() => setPost(null));
  }, [slug]);

  if (post === undefined) {
    return <div className="min-h-80" />;
  }
  if (!post) throw notFound();

  return (
    <>
      <PageHero
        kicker={post.author_name || "Journal"}
        title={post.title}
        lede={post.excerpt}
        image={post.cover_image || "/images/site/hero-wake.jpg"}
      />
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
        <div className="space-y-4 text-ink-soft leading-relaxed whitespace-pre-line">
          {post.body}
        </div>
        <Link to="/blog" className="mt-10 inline-flex text-teal font-medium">
          All posts
        </Link>
      </article>
    </>
  );
}
