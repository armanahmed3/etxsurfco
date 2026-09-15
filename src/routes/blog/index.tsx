import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { listPublicBlogs, type DeskBlog } from "@/lib/desk";

export const Route = createFileRoute("/blog/")({ component: Page });

function Page() {
  const [posts, setPosts] = useState<DeskBlog[]>([]);

  useEffect(() => {
    listPublicBlogs()
      .then(setPosts)
      .catch(() => setPosts([]));
  }, []);

  return (
    <>
      <PageHero
        kicker="Journal"
        title="From the Whitehouse desk"
        lede="Surf boats, winterization, and how we actually help East Texas families pick a hull."
        image="/images/site/hero-wake.jpg"
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 space-y-5">
        {posts.length === 0 ? (
          <p className="text-muted">Posts will show here once the desk publishes.</p>
        ) : (
          posts.map((p) => (
            <article
              key={p.id}
              className="rounded-xl border border-line bg-cream overflow-hidden"
            >
              {p.cover_image ? (
                <img
                  src={p.cover_image}
                  alt=""
                  className="w-full h-48 object-cover"
                />
              ) : null}
              <div className="p-6">
                <h2 className="font-display text-2xl">
                  <Link to="/blog/$slug" params={{ slug: p.slug }} className="hover:text-teal">
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-2 text-ink-soft">{p.excerpt}</p>
                <p className="mt-3 text-xs uppercase tracking-widest text-muted">
                  {p.author_name}
                </p>
              </div>
            </article>
          ))
        )}
      </div>
    </>
  );
}
