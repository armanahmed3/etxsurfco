import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { deleteLead, listDeskLeads, updateLeadStatus, type DeskLead } from "@/lib/desk";

export const Route = createFileRoute("/admin/leads")({ component: Page });

function Page() {
  const [rows, setRows] = useState<DeskLead[]>([]);

  function load() {
    listDeskLeads()
      .then(setRows)
      .catch(() => setRows([]));
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.22em] text-teal">Inbox</p>
      <h1 className="mt-2 font-display text-3xl">Leads</h1>
      <p className="mt-2 text-muted">Every form submitted on the public site lands here.</p>
      <div className="mt-8 space-y-4">
        {rows.length === 0 ? (
          <p className="rounded-xl border border-line bg-cream p-8 text-muted">
            No leads yet.
          </p>
        ) : (
          rows.map((lead) => {
            let fields: Record<string, string> = {};
            try {
              fields = JSON.parse(lead.fields || "{}");
            } catch {
              fields = {};
            }
            return (
              <article
                key={lead.id}
                className="rounded-xl border border-line bg-cream p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-teal">
                      {lead.kind}
                    </p>
                    <h2 className="font-display text-xl mt-1">
                      {lead.name || "No name"}
                    </h2>
                    <p className="text-sm text-muted mt-1">
                      {lead.email}
                      {lead.phone ? ` · ${lead.phone}` : ""}
                    </p>
                    <p className="text-xs text-muted mt-1 tabular-nums">
                      {new Date(lead.created_at).toLocaleString()}
                    </p>
                  </div>
                  <select
                    value={lead.status}
                    onChange={async (e) => {
                      await updateLeadStatus({
                        data: { id: lead.id, status: e.target.value },
                      });
                      load();
                    }}
                    className="h-11 rounded-md border border-line bg-cream px-3 text-sm"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <dl className="mt-4 grid sm:grid-cols-2 gap-2 text-sm">
                  {Object.entries(fields)
                    .filter(([k, v]) => v && !["firstName", "lastName", "email", "phone", "name"].includes(k))
                    .map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-muted">
                        {k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}
                      </dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
                <button
                  type="button"
                  className="mt-4 text-sm text-danger"
                  onClick={async () => {
                    if (!confirm("Delete this lead?")) return;
                    await deleteLead({ data: lead.id });
                    load();
                  }}
                >
                  Delete
                </button>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
