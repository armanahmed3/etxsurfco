import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/input";
import { readImageFile, slugify } from "@/lib/catalog";
import { listDeskBlogs, saveBlog, type BlogDraft } from "@/lib/desk";

export const Route = createFileRoute("/admin/blogs/$id")({ component: Page });

function Page() {
  const { id } = Route.useParams();
  const nav = useNavigate();
  const isNew = id === "new";
  const [form, setForm] = useState<BlogDraft>({
    title: "",
    excerpt: "",
    body: "",
    cover_image: "",
    published: false,
    author_name: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isNew) return;
    listDeskBlogs().then((rows) => {
      const found = rows.find((r) => r.id === id);
      if (!found) return;
      setForm({
        id: found.id,
        slug: found.slug,
        title: found.title,
        excerpt: found.excerpt,
        body: found.body,
        cover_image: found.cover_image ?? "",
        published: Boolean(found.published),
        author_name: found.author_name,
      });
    });
  }, [id, isNew]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await saveBlog({
        data: {
          ...form,
          id: isNew ? undefined : id,
          slug: form.slug || slugify(form.title),
        },
      });
      await nav({ to: "/admin/blogs" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
      setBusy(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <p className="text-xs uppercase tracking-[0.22em] text-teal">Blog</p>
      <h1 className="mt-2 font-display text-3xl">
        {isNew ? "New post" : form.title || "Edit post"}
      </h1>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <Field label="Title" required>
          <Input
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            required
          />
        </Field>
        <Field label="Excerpt" required>
          <Textarea
            value={form.excerpt}
            onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
            required
          />
        </Field>
        <Field label="Body" required>
          <Textarea
            className="h-56"
            value={form.body}
            onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
            required
          />
        </Field>
        <Field label="Cover image URL">
          <Input
            value={form.cover_image ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, cover_image: e.target.value }))}
          />
        </Field>
        <Field label="Upload cover">
          <Input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              try {
                const url = await readImageFile(file);
                setForm((f) => ({ ...f, cover_image: url }));
              } catch (err) {
                setError(err instanceof Error ? err.message : "Could not read photo.");
              }
            }}
          />
        </Field>
        {form.cover_image ? (
          <img
            src={form.cover_image}
            alt=""
            className="h-40 w-full object-cover rounded-lg border border-line"
          />
        ) : null}
        <Field label="Author">
          <Input
            value={form.author_name ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, author_name: e.target.value }))}
          />
        </Field>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
          />
          Publish on the site
        </label>
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        <div className="flex gap-3">
          <Button type="submit" disabled={busy}>
            {busy ? "Saving…" : "Save post"}
          </Button>
          <Button asChild variant="outline">
            <Link to="/admin/blogs">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
