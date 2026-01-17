"use client";

import { useEffect, useState } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.openmation.dev";

type AccountState = {
  user?: { id: string; email: string };
  plan?: { id: string };
  usage?: {
    shares_created: number;
    share_views: number;
    scheduled_runs: number;
    period: string;
  };
};

export default function AccountPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [account, setAccount] = useState<AccountState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("openmation_token");
    if (saved) {
      setToken(saved);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    fetchAccount(token);
  }, [token]);

  async function fetchAccount(authToken: string) {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Failed to load account");
        return;
      }
      setAccount(data);
      setError(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleAuth() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Authentication failed");
        return;
      }
      localStorage.setItem("openmation_token", data.token);
      setToken(data.token);
      setAccount(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    if (!token) return;
    await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch(() => undefined);
    localStorage.removeItem("openmation_token");
    setToken(null);
    setAccount(null);
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="container-custom pt-28 pb-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-semibold tracking-tight mb-6">
            Account & Subscription
          </h1>
          <p className="text-muted-foreground mb-10">
            Sign in to manage your subscription, usage, and AI access.
          </p>

          {!token ? (
            <div className="card-elevated p-6 space-y-6">
              <div className="flex gap-3">
                <button
                  onClick={() => setMode("login")}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    mode === "login"
                      ? "bg-foreground text-white"
                      : "bg-secondary text-foreground"
                  }`}
                >
                  Log in
                </button>
                <button
                  onClick={() => setMode("signup")}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    mode === "signup"
                      ? "bg-foreground text-white"
                      : "bg-secondary text-foreground"
                  }`}
                >
                  Sign up
                </button>
              </div>

              <div className="space-y-3">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full h-11 rounded-xl border border-border px-4 text-sm"
                />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password (min 8 chars)"
                  type="password"
                  className="w-full h-11 rounded-xl border border-border px-4 text-sm"
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                onClick={handleAuth}
                disabled={loading}
                className="w-full h-11 rounded-xl bg-foreground text-white text-sm font-medium"
              >
                {loading ? "Working..." : mode === "login" ? "Log in" : "Create account"}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="card-elevated p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Signed in as</p>
                    <p className="text-base font-medium">{account?.user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Log out
                  </button>
                </div>
                {account?.plan && (
                  <p className="text-sm text-muted-foreground">
                    Plan: <span className="text-foreground">{account.plan.id}</span>
                  </p>
                )}
              </div>

              <div className="card-elevated p-6">
                <h2 className="text-lg font-semibold mb-4">Usage</h2>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="rounded-xl border border-border/50 p-4">
                    <p className="text-muted-foreground">Shares</p>
                    <p className="text-2xl font-semibold">
                      {account?.usage?.shares_created ?? 0}
                    </p>
                  </div>
                  <div className="rounded-xl border border-border/50 p-4">
                    <p className="text-muted-foreground">Shared views</p>
                    <p className="text-2xl font-semibold">
                      {account?.usage?.share_views ?? 0}
                    </p>
                  </div>
                  <div className="rounded-xl border border-border/50 p-4">
                    <p className="text-muted-foreground">Scheduled runs</p>
                    <p className="text-2xl font-semibold">
                      {account?.usage?.scheduled_runs ?? 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-elevated p-6">
                <h2 className="text-lg font-semibold mb-2">Upgrade</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Unlock higher limits and AI usage included with annual plans.
                </p>
                <a
                  href={process.env.NEXT_PUBLIC_EXTENSIONPAY_URL || "#"}
                  className="inline-flex items-center justify-center h-11 px-5 rounded-xl bg-foreground text-white text-sm font-medium"
                >
                  Manage subscription
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
