"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => { const first = setTimeout(() => setNow(new Date()), 0); const t = setInterval(() => setNow(new Date()), 15_000); return () => { clearTimeout(first); clearInterval(t); }; }, []);
  return now;
}

export const fmtIST = (d: Date, withDay = true) =>
  new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", ...(withDay ? { weekday: "short", day: "numeric", month: "short" } : {}), hour: "2-digit", minute: "2-digit", hour12: false }).format(d);

/** Light/dark toggle. Saved choice wins over the system setting; storage failures are ignored. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    const next = dark ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch { /* private mode */ }
  };
  return (
    <button type="button" onClick={toggle} aria-label="Toggle light or dark theme" className={`grid size-7 place-items-center rounded-md hover:bg-ink/10 ${className}`}>
      <Sun className="size-4 dark:hidden" /><Moon className="hidden size-4 dark:block" />
    </button>
  );
}

export function MenuBar({ focusedTitle, onAbout }: { focusedTitle: string; onAbout: () => void }) {
  const now = useClock();
  return (
    <header className="glass absolute inset-x-0 top-0 z-[950] flex h-8 items-center justify-between rounded-none border-x-0 border-t-0 px-3 text-[13px]">
      <div className="flex items-center gap-4">
        <button type="button" onClick={onAbout} className="flex items-center gap-1.5 rounded-md px-1.5 font-semibold hover:bg-ink/10">
          <span aria-hidden className="size-2.5 rotate-45 rounded-[2px] bg-accent" />esheet.os
        </button>
        <span className="font-semibold">{focusedTitle}</span>
        <span className="hidden text-muted lg:inline">Product · Design · Engineering</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden items-center gap-1.5 sm:flex"><span className="size-1.5 rounded-full bg-ok" />Open to remote roles</span>
        <ThemeToggle />
        <span className="tabular-nums" suppressHydrationWarning>{now ? `${fmtIST(now)} IST` : ""}</span>
      </div>
    </header>
  );
}
