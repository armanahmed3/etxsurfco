import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/input";
import {
  deleteStaff,
  listDeskStaff,
  saveStaff,
  type DeskStaff,
  type StaffDraft,
} from "@/lib/desk";

export const Route = createFileRoute("/admin/staff")({ component: Page });

const blank: StaffDraft = {
  email: "",
  name: "",
  title: "Sales",
  phone: "",
  bio: "",
  role: "staff",
  can_access: true,
};

function Page() {
  const [rows, setRows] = useState<DeskStaff[]>([]);
  const [form, setForm] = useState<StaffDraft>(blank);
  const [editing, setEditing] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function load() {
    listDeskStaff()
      .then(setRows)
      .catch(() => setRows([]));
  }

  useEffect(() => {
    load();
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await saveStaff({
        data: {
          ...form,
          id: editing ?? undefined,
          email: form.email.trim(),
          name: form.name.trim(),
        },
      });
      setForm(blank);
      setEditing(null);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save staff.");
    }
  }

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-8">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-teal">Team</p>
        <h1 className="mt-2 font-display text-3xl">Staff</h1>
        <p className="mt-2 text-muted">
          Turn on desk login for anyone who should manage listings and leads.
          They sign in at Staff desk with that email.
        </p>
        <div className="mt-6 space-y-3">
          {rows.map((s) => (
            <article
              key={s.id}
              className="rounded-xl border border-line bg-cream p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl">{s.name}</h2>
                  <p className="text-sm text-muted">
                    {s.title} · {s.email}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-teal mt-2">
                    {s.role}
                    {s.can_access ? " · desk login on" : " · no login"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={() => {
                      setEditing(s.id);
                      setForm({
                        id: s.id,
                        email: s.email,
                        name: s.name,
                        title: s.title,
                        phone: s.phone ?? "",
                        photo: s.photo ?? "",
                        bio: s.bio ?? "",
                        role: (s.role as StaffDraft["role"]) || "staff",
                        can_access: Boolean(s.can_access),
                      });
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={async () => {
                      if (!confirm(`Remove ${s.name}?`)) return;
                      try {
                        await deleteStaff({ data: s.id });
                        load();
                      } catch (err) {
                        setError(err instanceof Error ? err.message : "Could not remove.");
                      }
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
              {s.bio ? <p className="mt-3 text-sm text-ink-soft">{s.bio}</p> : null}
            </article>
          ))}
        </div>
      </div>
      <form
        onSubmit={onSubmit}
        className="rounded-xl border border-line bg-cream p-5 h-fit"
      >
        <h2 className="font-display text-xl">
          {editing ? "Edit staff" : "Add staff"}
        </h2>
        <div className="mt-4 space-y-3">
          <Field label="Name" required>
            <Input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
            />
          </Field>
          <Field label="Email" required>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              required
            />
          </Field>
          <Field label="Title" required>
            <Input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
            />
          </Field>
          <Field label="Phone">
            <Input
              value={form.phone ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            />
          </Field>
          <Field label="Role">
            <Select
              value={form.role}
              onChange={(e) =>
                setForm((f) => ({ ...f, role: e.target.value as StaffDraft["role"] }))
              }
            >
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
              <option value="owner">Owner</option>
            </Select>
          </Field>
          <Field label="Bio">
            <Textarea
              value={form.bio ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
            />
          </Field>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.can_access}
              onChange={(e) =>
                setForm((f) => ({ ...f, can_access: e.target.checked }))
              }
            />
            Allow admin panel login
          </label>
          {error ? <p className="text-sm text-danger">{error}</p> : null}
          <div className="flex gap-2">
            <Button type="submit">{editing ? "Save" : "Add"}</Button>
            {editing ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditing(null);
                  setForm(blank);
                }}
              >
                Cancel
              </Button>
            ) : null}
          </div>
        </div>
      </form>
    </div>
  );
}
