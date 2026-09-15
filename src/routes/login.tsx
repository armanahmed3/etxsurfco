import { useState, type FormEvent } from "react";
import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";
import {
  GROK_PROVIDERS,
  authClient,
  authEnabled,
  signIn,
} from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const { user, isPending } = useCurrentUserState();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (isPending) {
    return (
      <div className="min-h-dvh bg-navy grid place-items-center">
        <div className="size-10 rounded-full bg-navy-3 animate-pulse" />
      </div>
    );
  }
  if (user) return <Navigate to="/admin" />;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "up") {
        const { error: err } = await authClient.signUp.email({
          email,
          password,
          name: name.trim() || email.split("@")[0],
          callbackURL: "/admin",
        });
        if (err) throw new Error(err.message ?? "Could not create the account.");
      } else {
        const { error: err } = await authClient.signIn.email({
          email,
          password,
          callbackURL: "/admin",
        });
        if (err) throw new Error(err.message ?? "Could not sign in.");
      }
      window.location.href = "/admin";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed.");
      setBusy(false);
    }
  }

  return (
    <div className="min-h-dvh bg-navy text-cream grid place-items-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="flex justify-center mb-8">
          <Logo />
        </Link>
        <div className="rounded-2xl border border-line-dark bg-navy-2 p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.22em] text-teal">Staff desk</p>
          <h1 className="mt-2 font-display text-3xl">
            {mode === "in" ? "Sign in" : "Create desk login"}
          </h1>
          <p className="mt-2 text-sm text-foam">
            Listings, leads, blogs, and staff live here. Customers never see this
            page.
          </p>

          {authEnabled ? (
            <>
              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                {mode === "up" ? (
                  <Field label="Full name" required>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-navy-3 border-line-dark text-cream"
                      required
                    />
                  </Field>
                ) : null}
                <Field label="Email" required>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-navy-3 border-line-dark text-cream"
                    autoComplete="username"
                    required
                  />
                </Field>
                <Field label="Password" required>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-navy-3 border-line-dark text-cream"
                    autoComplete={mode === "up" ? "new-password" : "current-password"}
                    minLength={8}
                    required
                  />
                </Field>
                {error ? <p className="text-sm text-danger">{error}</p> : null}
                <Button type="submit" className="w-full" size="lg" disabled={busy}>
                  {busy
                    ? "Working…"
                    : mode === "in"
                      ? "Sign in"
                      : "Create account"}
                </Button>
              </form>

              <button
                type="button"
                className="mt-4 text-sm text-foam hover:text-cream"
                onClick={() => {
                  setMode((m) => (m === "in" ? "up" : "in"));
                  setError(null);
                }}
              >
                {mode === "in"
                  ? "Need a login? Create an account"
                  : "Already have a login? Sign in"}
              </button>

              <div className="mt-6 pt-6 border-t border-line-dark space-y-2">
                <p className="text-xs uppercase tracking-widest text-muted">
                  Or continue with
                </p>
                {GROK_PROVIDERS.map((p) => (
                  <button
                    key={p.providerId}
                    type="button"
                    onClick={() => signIn(p.providerId, { callbackURL: "/admin" })}
                    className="w-full h-11 rounded-md border border-line-dark text-cream hover:bg-navy-3"
                  >
                    Continue with {p.label}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p className="mt-6 text-sm text-foam">Sign-in is disabled.</p>
          )}
        </div>
        <p className="mt-6 text-center text-sm text-foam">
          <Link to="/" className="hover:text-cream">
            Back to the lot
          </Link>
        </p>
      </div>
    </div>
  );
}
