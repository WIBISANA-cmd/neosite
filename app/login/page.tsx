/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login gagal.");
        setLoading(false);
        return;
      }
      const redirect = searchParams.get("redirect") || "/admin";
      window.location.href = redirect;
    } catch (err) {
      setError("Terjadi kesalahan. Coba lagi.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-neon-dark text-gray-200 min-h-screen flex items-center justify-center relative overflow-hidden selection:bg-neon-primary/30 selection:text-neon-dark">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-neon-secondary/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50vw] h-[50vw] bg-neon-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
      </div>
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="fixed inset-0 bg-noise opacity-30 pointer-events-none z-0 mix-blend-overlay" />

      <main className="w-full max-w-[420px] px-4 relative z-10">
        <div className="electric-container shadow-[0_0_50px_-12px_rgba(0,243,255,0.2)]">
          <div className="electric-spinner" />
          <div className="electric-spinner-2" />

          <div className="relative w-full h-full bg-[#0a0a15] rounded-[1.4rem] p-8 sm:p-10 backdrop-blur-md">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-neon-secondary/20 to-neon-primary/20 border border-neon-primary/30 text-neon-primary mb-4 shadow-[0_0_15px_-3px_rgba(0,247,255,0.4)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-2xl font-display font-bold text-white tracking-tight">Welcome Back</h1>
              <p className="text-sm text-gray-500 mt-2">Enter your credentials to access the portal.</p>
            </div>

            <form className="space-y-5" onSubmit={onSubmit}>
              <div className="space-y-1">
                <label htmlFor="email" className="label-text">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="input-field"
                  placeholder="name@company.com"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="label-text">
                    Password
                  </label>
                  <span className="text-xs text-neon-primary">Forgot password?</span>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="input-field pr-10"
                    placeholder="••••••••"
                    required
                    minLength={6}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-neon-primary transition-colors focus:outline-none"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input id="remember-me" type="checkbox" className="w-4 h-4 rounded bg-neon-dark border-white/20 text-neon-primary focus:ring-neon-primary focus:ring-offset-0 focus:ring-offset-transparent cursor-pointer" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400 cursor-pointer select-none">
                  Remember me
                </label>
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full relative group overflow-hidden rounded-lg bg-gradient-to-r from-neon-secondary to-neon-primary p-[1px] focus:outline-none focus:ring-2 focus:ring-neon-primary/50 focus:ring-offset-2 focus:ring-offset-[#0a0a15] transition-transform active:scale-[0.98]"
              >
                <span className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors" />
                <div className="relative bg-[#0a0a15] group-hover:bg-opacity-0 transition-all duration-300 rounded-[7px] h-full">
                  <div className="flex items-center justify-center py-3 px-4 text-white font-semibold tracking-wide h-[48px]">
                    {!loading ? (
                      <span className="group-hover:text-black transition-colors z-10">Sign In</span>
                    ) : (
                      <svg className="animate-spin h-5 w-5 text-white group-hover:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-500">
              Don&apos;t have an account?
              <span className="text-neon-primary pl-1">Contact admin.</span>
            </div>

            <div className="mt-6">
              <a
                href="/"
                className="w-full inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white rounded-lg px-4 py-2.5 transition-all duration-300 text-sm font-semibold"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
