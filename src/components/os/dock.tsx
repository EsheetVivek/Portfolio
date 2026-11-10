"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react";
import { FileText } from "lucide-react";
import { APPS, type AppId } from "@/components/os/registry";
import { AppIcon } from "@/components/os/app-icon";

/** macOS-style magnifying dock, adapted from Magic UI "dock" (MIT). */
function DockItem({ mouseX, label, running, onClick, href, children }: { mouseX: MotionValue<number>; label: string; running?: boolean; onClick?: () => void; href?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const dist = useTransform(mouseX, (v) => { const b = ref.current?.getBoundingClientRect(); return b ? v - b.x - b.width / 2 : Infinity; });
  const size = useSpring(useTransform(dist, [-140, 0, 140], [48, reduce ? 48 : 72, 48]), { mass: 0.1, stiffness: 170, damping: 14 });
  const inner = (
    <>
      <motion.span ref={ref} style={{ width: size, height: size }} className="block">{children}</motion.span>
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2 py-1 text-xs text-win opacity-0 transition-opacity group-hover/item:opacity-100 group-focus-visible/item:opacity-100">{label}</span>
      <span aria-hidden className={`absolute -bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-ink transition-opacity ${running ? "opacity-70" : "opacity-0"}`} />
    </>
  );
  const cls = "group/item relative flex items-end rounded-[22%] active:brightness-90";
  return href ? <a href={href} aria-label={label} className={cls}>{inner}</a> : <button type="button" onClick={onClick} aria-label={`Open ${label}`} className={cls}>{inner}</button>;
}

export function Dock({ items, running, onOpen }: { items: AppId[]; running: Set<AppId>; onOpen: (id: AppId) => void }) {
  const mouseX = useMotionValue(Infinity);
  return (
    <nav aria-label="Dock" className="pointer-events-none absolute inset-x-0 bottom-3 z-[900] flex justify-center">
      <div onMouseMove={(e) => mouseX.set(e.pageX)} onMouseLeave={() => mouseX.set(Infinity)}
        className="glass pointer-events-auto flex h-[68px] items-end gap-3 rounded-[22px] px-3 pb-2.5 shadow-win">
        {items.map((id) => (
          <DockItem key={id} mouseX={mouseX} label={APPS[id].title} running={running.has(id)} onClick={() => onOpen(id)}>
            <AppIcon app={APPS[id]} className="size-full" />
          </DockItem>
        ))}
        <span aria-hidden className="mb-1 h-10 w-px self-end bg-ink/15" />
        <DockItem mouseX={mouseX} label="CV (one page)" href="/cv">
          <span className="grid size-full place-items-center rounded-[22%] border border-line bg-win text-ink shadow-[0_6px_14px_-6px_rgb(0_0_0/.35)]"><FileText className="size-[46%]" /></span>
        </DockItem>
      </div>
    </nav>
  );
}
