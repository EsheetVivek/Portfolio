"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, FileText } from "lucide-react";
import { APPS, ORDER, isAppId, type AppId } from "@/components/os/registry";
import { OSContext } from "@/components/os/os-context";
import { AppIcon } from "@/components/os/app-icon";
import { ThemeToggle, fmtIST, useClock } from "@/components/os/menubar";
import { ME, TICKETRUSH } from "@/lib/content";

const DOCK: AppId[] = ["about", "ticketrush", "contact", "terminal"];

/** Phone layout: a home screen; apps open full screen and the back gesture closes them. */
export function Phone() {
  const [app, setApp] = useState<AppId | null>(null);
  const reduce = useReducedMotion();
  const now = useClock();

  const open = useCallback((id: AppId) => {
    setApp(id);
    try { history.pushState({ app: id }, "", `#${id}`); } catch { /* ignore */ }
  }, []);
  const close = useCallback(() => {
    if (history.state?.app) history.back(); else setApp(null);
  }, []);
  useEffect(() => {
    const onPop = () => { const h = location.hash.slice(1); setApp(isAppId(h) && history.state?.app ? h : null); };
    addEventListener("popstate", onPop);
    const h = location.hash.slice(1);
    const t = isAppId(h) && matchMedia("(max-width: 767px)").matches ? setTimeout(() => setApp(h), 0) : undefined;
    return () => { removeEventListener("popstate", onPop); clearTimeout(t); };
  }, []);
  useEffect(() => { document.body.style.overflow = app ? "hidden" : ""; }, [app]);

  const ctx = useMemo(() => ({ open, close: () => close() }), [open, close]);
  const A = app ? APPS[app] : null;

  return (
    <OSContext.Provider value={ctx}>
      <div className="wallpaper grain relative min-h-dvh overflow-hidden pb-32 md:hidden">
        <div className="flex items-center justify-between px-5 pt-3 text-[13px] font-semibold">
          <span className="tabular-nums" suppressHydrationWarning>{now ? fmtIST(now, false) : ""}</span>
          <span className="flex items-center gap-2"><span className="flex items-center gap-1.5 font-medium"><span className="size-1.5 rounded-full bg-ok" />Open to work</span><ThemeToggle /></span>
        </div>

        <section className="mx-4 mt-6 rounded-3xl glass p-5 shadow-win" aria-label="About">
          <p className="font-hand text-4xl leading-none text-accent">hi, I&apos;m Esheet</p>
          <h1 className="mt-2 text-2xl font-semibold leading-tight tracking-tight">Design engineer. I build products that stay calm under pressure.</h1>
          <p className="mt-2 text-sm text-muted">{ME.roles.join(" · ")}</p>
        </section>

        <button type="button" onClick={() => open("ticketrush")} className="relative mx-4 mt-4 block w-[calc(100%-2rem)] overflow-hidden rounded-3xl bg-[#c8321f] p-5 text-left text-[#fff8ee] shadow-win active:scale-[.98]">
          <span aria-hidden className="absolute -right-8 -top-8 size-32 rounded-full bg-[#f3c32f]/90" />
          <span className="relative font-mono text-[11px] uppercase tracking-wider opacity-90">Featured · {TICKETRUSH.status}</span>
          <span className="relative mt-2 block text-2xl font-semibold leading-tight">TicketRush</span>
          <span className="relative mt-1 block text-sm opacity-90">0 seats sold twice with 3,000 buyers racing for 500 seats.</span>
        </button>

        <ul className="mt-6 grid grid-cols-4 gap-x-2 gap-y-5 px-4" aria-label="Apps">
          {ORDER.filter((id) => id !== "about").map((id) => (
            <li key={id}>
              <button type="button" onClick={() => open(id)} className="flex w-full flex-col items-center gap-1.5 active:opacity-70">
                <AppIcon app={APPS[id]} className="size-[60px]" />
                <span className="w-full truncate text-center text-[11px] font-medium">{APPS[id].title}</span>
              </button>
            </li>
          ))}
          <li>
            <a href="/cv" className="flex w-full flex-col items-center gap-1.5 active:opacity-70">
              <span className="grid size-[60px] place-items-center rounded-[22%] border border-line bg-win shadow-md"><FileText className="size-7" /></span>
              <span className="text-[11px] font-medium">CV</span>
            </a>
          </li>
        </ul>

        <p aria-hidden className="mt-8 text-center font-hand text-2xl text-ink/40">tap an app to open it</p>

        <nav aria-label="Dock" className="glass fixed inset-x-3 bottom-3 z-30 flex justify-around rounded-[28px] p-3 shadow-win">
          {DOCK.map((id) => (
            <button key={id} type="button" onClick={() => open(id)} aria-label={`Open ${APPS[id].title}`} className="active:scale-90"><AppIcon app={APPS[id]} className="size-14" /></button>
          ))}
        </nav>

        <AnimatePresence>
          {A && (
            <motion.div key={A.id} role="dialog" aria-modal="true" aria-label={A.title}
              initial={reduce ? { opacity: 0 } : { y: "100%", borderRadius: 32 }} animate={{ y: 0, opacity: 1, borderRadius: 0 }} exit={reduce ? { opacity: 0 } : { y: "100%", borderRadius: 32 }}
              transition={{ type: "spring", bounce: 0.08, duration: 0.45 }}
              className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-win">
              <div className="flex h-12 shrink-0 items-center border-b border-line bg-chrome px-2">
                <button type="button" onClick={close} className="flex min-h-11 items-center gap-0.5 rounded-lg px-2 font-medium text-accent"><ChevronLeft className="size-5" />Home</button>
                <p className="absolute inset-x-24 truncate text-center text-sm font-semibold">{A.title}</p>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto"><A.Body /></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </OSContext.Provider>
  );
}
