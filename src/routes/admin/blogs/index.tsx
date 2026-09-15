import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteBlog, listDeskBlogs, type DeskBlog } from "@/lib/desk";

export const Route = createFileRoute("/admin/blogs/")({ component: Page });

function Page() {
  const [rows, setRows] = useState<DeskBlog[]>([]);

  function load() {
    listDeskBlogs()
      .then(setRows)
      .catch(() => setRows([]));
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-teal">Stories</p>
          <h1 className="mt-2 font-display text-3xl">Blogs</h1>
        </div>
        <Button asChild>
          <Link to="/admin/blogs/$id" params={{ id: "new" }}>
            <Plus className="size-4" />
            New post
          </Link>
        </Button>
      </div>
      <div className="mt-8 space-y-3">
        {rows.length === 0 ? (
          <p className="rounded-xl border border-line bg-cream p-8 text-muted">
            No posts yet.
          </p>
        ) : (
          rows.map((p) => (
            <article
              key={p.id}
              className="rounded-xl border border-line bg-cream p-5 flex flex-wrap items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <Link
                  to="/admin/blogs/$id"
                  params={{ id: p.id }}
                  className="font-display text-xl hover:text-teal"
                >
                  {p.title}
                </Link>
                <p className="text-sm text-muted mt-1">
                  {p.published ? "Published" : "Draft"} · {p.slug}
                </p>
              </div>
              <button
                type="button"
                className="size-10 inline-flex items-center justify-center rounded-md hover:bg-paper-2 text-danger"
                aria-label={`Delete ${p.title}`}
                onClick={async () => {
                  if (!confirm("Delete this post?")) return;
                  await deleteBlog({ data: p.id });
                  load();
                }}
              >
                <Trash2 className="size-4" />
              </button>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
