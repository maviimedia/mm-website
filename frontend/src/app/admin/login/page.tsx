"use client";

import { useState } from "react";
import { loginAdmin } from "../actions";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main 
      style={{ backgroundColor: "var(--page-bg)", color: "var(--page-ink)" }} 
      className="min-h-[100dvh] flex flex-col items-center justify-center px-6"
    >
      <div className="w-full max-w-sm flex flex-col gap-10 z-10">
        
        <div className="text-center flex flex-col gap-1">
          <h1 
            style={{ fontFamily: "var(--ff-head)" }} 
            className="text-3xl font-medium tracking-tight"
          >
            System Access
          </h1>
          <p 
            style={{ fontFamily: "var(--ff-body)", color: "var(--pp-muted)" }} 
            className="text-xs"
          >
            Authenticate to manage Maviimedia Studio works.
          </p>
        </div>

        <form 
          action={async (formData) => {
            await loginAdmin(formData);
          }} 
          className="flex flex-col gap-10"
        >
          
          <div className="flex flex-col gap-8">
            <div className="relative flex flex-col">
              <label htmlFor="username" className="text-[11px] font-semibold tracking-widest uppercase text-white/80">
                Username
              </label>
              <div className="relative flex items-center">
                <svg className="absolute left-0 w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  style={{ fontFamily: "var(--ff-body)" }}
                  className="w-full py-2.5 pl-7 bg-transparent border-b border-white/20 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors"
                  placeholder="e.g., admin.maviimedia"
                />
              </div>
            </div>

            <div className="relative flex flex-col">
              <label htmlFor="password" className="text-[11px] font-semibold tracking-widest uppercase text-white/80">
                Password
              </label>
              <div className="relative flex items-center">
                <svg className="absolute left-0 w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  style={{ fontFamily: "var(--ff-body)" }}
                  className="w-full py-2.5 pl-7 pr-9 bg-transparent border-b border-white/20 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors"
                  placeholder="Enter your secure password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 p-1.5 text-white/40 hover:text-white transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0l-3.59-3.59m-1.22-1.22l-3.29-3.29" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="w-3.5 h-3.5 bg-transparent border-white/20 rounded accent-[var(--pp-card-red)] focus:ring-0 focus:outline-none cursor-pointer"
              />
              <label 
                htmlFor="remember" 
                style={{ fontFamily: "var(--ff-body)", color: "var(--pp-muted)" }}
                className="text-[11px] cursor-pointer select-none"
              >
                Remember my credentials
              </label>
            </div>

            <button
              type="submit"
              style={{ 
                fontFamily: "var(--ff-label)", 
                backgroundColor: "var(--pp-card-red)", 
                color: "var(--page-ink)" 
              }}
              className="w-full py-3 text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 ease-out transform hover:bg-white hover:text-black hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(255,255,255,0.1)] active:translate-y-0"
            >
              Authenticate
            </button>

            <p 
              style={{ fontFamily: "var(--ff-body)", color: "var(--pp-muted)" }} 
              className="text-[9px] text-center opacity-40 tracking-widest leading-relaxed uppercase"
            >
              Authorized personnel only. By authenticating, you agree to internal access policies and data guidelines.
            </p>
          </div>
          
        </form>
      </div>
    </main>
  );
}