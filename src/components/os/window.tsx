"use client";

import { useEffect, type RefObject } from "react";
import { motion, useDragControls, useMotionValue, useReducedMotion, animate } from "motion/react";
import { Maximize2, Minus, X } from "lucide-react";
import type { AppDef } from "@/components/os/registry";
import { cn } from "@/lib/utils";

interface Props {
  app: AppDef; z: number; focused: boolean; max: boolean; bounds: RefObject<HTMLDivElement | null>;
  onFocus: () => void; onClose: () => void; onMin: () => void; onMax: () => void;
}

/** A draggable desktop window. Drag by the title bar; double-click it to maximise. */
export function Window({ app, z, focused, max, bounds, onFocus, onClose, onMin, onMax }: Props) {
  const controls = useDragControls();
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const Body = app.Body;

  useEffect(() => {
    if (!max) return;
    animate(x, 0, { duration: reduce ? 0 : 0.25 });
    animate(y, 0, { duration: reduce ? 0 : 0.25 });
  }, [max, x, y, reduce]);

  const box = max
    ? { left: 12, top: 44, width: "calc(100vw - 24px)", height: "calc(100dvh - 44px - 104px)" }
    : { left: `clamp(12px, ${app.x}, calc(100vw - ${app.w + 140}px))`, top: app.y, width: `min(${app.w}px, calc(100vw - 24px))`, height: `min(${app.h}px, calc(100dvh - ${app.y + 112}px))` };

  return (
    <motion.section aria-label={app.title} data-focused={focused}
      drag={!max} dragControls={controls} dragListener={false} dragMomentum={false} dragConstraints={bounds} dragElastic={0.03}
      initial={reduce ? false : { opacity: 0, scale: 0.94, y: 14 }} animate={{ opacity: 1, scale: 1 }} exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92, transition: { duration: 0.16 } }}
      transition={{ type: "spring", bounce: 0.18, duration: 0.42 }}
      style={{ ...box, x, y, zIndex: 10 + z }} onPointerDownCapture={onFocus}
      className={cn("absolute flex flex-col overflow-hidden rounded-2xl border bg-win shadow-win transition-[border-color,filter] duration-200",
        focused ? "border-line" : "border-line/70 saturate-[.92]")}>
      <header onPointerDown={(e) => !max && controls.start(e)} onDoubleClick={onMax}
        className="group/bar relative flex h-10 shrink-0 cursor-grab touch-none select-none items-center border-b border-line bg-chrome px-3 active:cursor-grabbing">
        <div className="flex gap-2" onPointerDown={(e) => e.stopPropagation()}>
          <button type="button" onClick={onClose} aria-label={`Close ${app.title}`} className="grid size-3.5 place-items-center rounded-full bg-[#ff5f57] text-black/60 ring-1 ring-black/10"><X className="size-2.5 opacity-0 group-hover/bar:opacity-100" strokeWidth={3} /></button>
          <button type="button" onClick={onMin} aria-label={`Minimise ${app.title}`} className="grid size-3.5 place-items-center rounded-full bg-[#febc2e] text-black/60 ring-1 ring-black/10"><Minus className="size-2.5 opacity-0 group-hover/bar:opacity-100" strokeWidth={3} /></button>
          <button type="button" onClick={onMax} aria-label={`${max ? "Restore" : "Maximise"} ${app.title}`} className="grid size-3.5 place-items-center rounded-full bg-[#28c840] text-black/60 ring-1 ring-black/10"><Maximize2 className="size-2 opacity-0 group-hover/bar:opacity-100" strokeWidth={3} /></button>
        </div>
        <p className={cn("pointer-events-none absolute inset-x-24 truncate text-center text-[13px] font-medium", focused ? "text-ink" : "text-muted")}>{app.file}</p>
      </header>
      <div className={cn("min-h-0 flex-1 scroll-soft", app.flush ? "overflow-hidden" : "overflow-y-auto")}><Body /></div>
    </motion.section>
  );
}
