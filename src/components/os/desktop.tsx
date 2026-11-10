"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { FileText } from "lucide-react";
import { APPS, isAppId, type AppId } from "@/components/os/registry";
import { OSContext } from "@/components/os/os-context";
import { Window } from "@/components/os/window";
import { Dock } from "@/components/os/dock";
import { MenuBar } from "@/components/os/menubar";
import { AppIcon } from "@/components/os/app-icon";

type W = { id: AppId; z: number; min: boolean; max: boolean };
const START: W[] = [{ id: "ticketrush", z: 1, min: false, max: false }, { id: "about", z: 2, min: false, max: false }];
const DESK_ICONS: AppId[] = ["ticketrush", "work", "building", "process", "experience", "terminal"];
const DOCK: AppId[] = ["about", "ticketrush", "work", "experience", "contact", "terminal"];

const NOTES = [
  { text: "hi! I'm Esheet.\nI design + build products that stay calm under pressure.", color: "bg-[#ffe680] text-[#3b3200]", rot: -4, pos: "left-[3%] bottom-[104px]" },
  { text: "open to: APM · design eng\nUI/UX · frontend\nremote, IST ⇄ US/EU", color: "bg-[#ffc9d6] text-[#4a1022]", rot: 3, pos: "left-[16%] bottom-[92px]" },
  { text: "psst: drag windows around,\nor open Terminal and type help", color: "bg-[#c8f0d2] text-[#0f3b1d]", rot: -2, pos: "left-[28%] bottom-[112px]" },
];

/** The desktop window manager: which windows are open, their stacking order and states. */
export function Desktop() {
  const [wins, setWins] = useState<W[]>(START);
  const bounds = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const top = wins.filter((w) => !w.min).sort((a, b) => b.z - a.z)[0];

  const open = useCallback((id: AppId) => {
    setWins((cur) => {
      const z = Math.max(0, ...cur.map((w) => w.z)) + 1;
      return cur.some((w) => w.id === id) ? cur.map((w) => (w.id === id ? { ...w, min: false, z } : w)) : [...cur, { id, z, min: false, max: false }];
    });
    try { history.replaceState(null, "", `#${id}`); } catch { /* ignore */ }
  }, []);
  const close = useCallback((id: AppId) => setWins((cur) => cur.filter((w) => w.id !== id)), []);
  const patch = (id: AppId, p: Partial<W>) => setWins((cur) => cur.map((w) => (w.id === id ? { ...w, ...p } : w)));
  const focus = (id: AppId) => setWins((cur) => { const z = Math.max(...cur.map((w) => w.z)); const me = cur.find((w) => w.id === id); return me && me.z === z ? cur : cur.map((w) => (w.id === id ? { ...w, z: z + 1 } : w)); });

  // Deep links: esheetvivek.vercel.app/#ticketrush opens that window.
  useEffect(() => { const h = location.hash.slice(1); if (!isAppId(h)) return; const t = setTimeout(() => open(h), 0); return () => clearTimeout(t); }, [open]);
  // Escape closes the window in front.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && top && !(e.target as HTMLElement)?.closest("input")) close(top.id); };
    addEventListener("keydown", onKey); return () => removeEventListener("keydown", onKey);
  }, [top, close]);

  const ctx = useMemo(() => ({ open, close }), [open, close]);
  const running = useMemo(() => new Set(wins.map((w) => w.id)), [wins]);

  return (
    <OSContext.Provider value={ctx}>
      <div className="wallpaper grain relative hidden h-dvh overflow-hidden md:block">
        <MenuBar focusedTitle={top ? APPS[top.id].title : "Finder"} onAbout={() => open("about")} />
        <div ref={bounds} className="absolute inset-x-0 bottom-0 top-8">
          {/* Signature on the wallpaper */}
          <p aria-hidden className="pointer-events-none absolute bottom-24 right-36 select-none font-hand text-[9rem] leading-none text-ink/[.07]">esheet</p>

          {/* Sticky notes (draggable, decorative) */}
          {NOTES.map((n, i) => (
            <motion.div key={i} drag dragConstraints={bounds} dragMomentum={false} whileDrag={{ scale: 1.05, rotate: 0 }}
              initial={reduce ? false : { opacity: 0, y: 20, rotate: n.rot }} animate={{ opacity: 1, y: 0, rotate: n.rot }} transition={{ delay: 0.3 + i * 0.12, type: "spring", bounce: 0.35 }}
              className={`absolute ${n.pos} z-[5] hidden w-48 cursor-grab whitespace-pre-line p-4 font-hand text-[22px] leading-6 shadow-[0_14px_24px_-12px_rgb(0_0_0/.45)] active:cursor-grabbing xl:block ${n.color}`}>
              <span aria-hidden className="absolute -top-2 left-1/2 h-4 w-12 -translate-x-1/2 -rotate-2 bg-white/50 backdrop-blur-sm" />
              {n.text}
            </motion.div>
          ))}

          {/* Desktop icons */}
          <ul aria-label="Desktop" className="absolute right-4 top-4 z-[6] grid grid-flow-row gap-2">
            {DESK_ICONS.map((id) => (
              <li key={id}>
                <button type="button" onClick={() => open(id)} className="group flex w-24 flex-col items-center gap-1.5 rounded-xl p-2 hover:bg-ink/10 focus-visible:bg-ink/10">
                  <AppIcon app={APPS[id]} className="size-14 transition-transform group-active:scale-90" />
                  <span className="rounded px-1 text-center text-xs font-medium leading-tight [text-shadow:0_1px_2px_var(--wall-3)]">{id === "ticketrush" ? APPS[id].file : APPS[id].title}</span>
                </button>
              </li>
            ))}
            <li>
              <a href="/cv" className="group flex w-24 flex-col items-center gap-1.5 rounded-xl p-2 hover:bg-ink/10">
                <span className="grid size-14 place-items-center rounded-lg border border-line bg-win shadow-md"><FileText className="size-7" /></span>
                <span className="text-xs font-medium [text-shadow:0_1px_2px_var(--wall-3)]">CV.pdf</span>
              </a>
            </li>
          </ul>

          <AnimatePresence>
            {wins.filter((w) => !w.min).map((w) => (
              <Window key={w.id} app={APPS[w.id]} z={w.z} focused={top?.id === w.id} max={w.max} bounds={bounds}
                onFocus={() => focus(w.id)} onClose={() => close(w.id)} onMin={() => patch(w.id, { min: true })} onMax={() => patch(w.id, { max: !w.max })} />
            ))}
          </AnimatePresence>
        </div>
        <Dock items={DOCK} running={running} onOpen={open} />
      </div>
    </OSContext.Provider>
  );
}
