"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { BUILDING, EXPERIENCE, ME, PROCESS, STATS, TICKETRUSH, TOOLKIT, WORK } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useOS } from "@/components/os/os-context";

const Out = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}<ArrowUpRight aria-hidden className="size-3.5" /></a>
);

/** Adapted from Watermelon UI "copy-confirm": the icon morphs to a check once copied. */
function CopyRow({ label, value }: { label: string; value: string }) {
  const [done, setDone] = useState(false);
  const reduce = useReducedMotion();
  const copy = async () => {
    try { await navigator.clipboard.writeText(value); setDone(true); setTimeout(() => setDone(false), 1600); } catch { /* clipboard blocked */ }
  };
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-win px-4 py-3">
      <div className="min-w-0"><p className="k">{label}</p><p className="mt-0.5 truncate font-medium">{value}</p></div>
      <button type="button" onClick={copy} aria-label={done ? `${label} copied` : `Copy ${label}`}
        className="relative grid size-10 shrink-0 place-items-center rounded-full border border-line bg-win-2 hover:border-ink">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={done ? "y" : "n"} initial={reduce ? false : { scale: 0.4, opacity: 0, filter: "blur(4px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }} exit={{ scale: 0.4, opacity: 0 }} transition={{ type: "spring", bounce: 0.3, duration: 0.35 }}>
            {done ? <Check className="size-4 text-ok" /> : <Copy className="size-4" />}
          </motion.span>
        </AnimatePresence>
      </button>
      <span role="status" aria-live="polite" className="sr-only">{done ? "Copied" : ""}</span>
    </div>
  );
}

export function AboutApp() {
  const { open } = useOS();
  return (
    <div className="p-6 sm:p-8">
      <p className="flex items-center gap-2 text-sm text-muted"><span className="relative flex size-2"><span className="absolute size-full animate-ping rounded-full bg-ok/60" /><span className="relative size-2 rounded-full bg-ok" /></span>{ME.availability}</p>
      <h2 className="mt-4 text-3xl font-semibold leading-[1.08] tracking-tight sm:text-[2.6rem]">Hi, I&apos;m Esheet.<br /><span className="text-muted">I design and build products that stay calm under pressure.</span></h2>
      <p className="mt-5 max-w-xl leading-relaxed text-muted">{ME.intro}</p>
      <div className="mt-5 flex flex-wrap gap-2">{ME.roles.map((r) => <span key={r} className="chip">{r}</span>)}</div>
      <dl className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.l} className="rounded-2xl border border-line bg-win-2 p-3">
            <dt className="sr-only">{s.l}</dt>
            <dd className="text-2xl font-semibold tabular-nums tracking-tight">{s.v}</dd>
            <dd className="mt-1 text-xs leading-snug text-muted">{s.l}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-7 flex flex-wrap gap-2">
        <button type="button" className="btn-main" onClick={() => open("ticketrush")}>Open TicketRush</button>
        <button type="button" className="btn-alt" onClick={() => open("work")}>Work that shipped</button>
        <button type="button" className="btn-alt" onClick={() => open("contact")}>Say hello</button>
      </div>
    </div>
  );
}

export function TicketRushApp() {
  return (
    <div>
      <div className="relative overflow-hidden border-b border-line bg-[#c8321f] p-6 text-[#fff8ee] sm:p-8">
        <div aria-hidden className="absolute -right-6 -top-6 size-40 rounded-full bg-[#f3c32f]/90" />
        <div aria-hidden className="absolute right-14 top-10 hidden rotate-12 sm:block rounded-md border-2 border-[#15120e] bg-[#fbf6ec] px-3 py-1 font-mono text-[11px] font-bold uppercase text-[#15120e] shadow-[3px_3px_0_#15120e]">0 sold twice</div>
        <p className="relative font-mono text-[11px] uppercase tracking-[0.16em] opacity-90">{TICKETRUSH.status}</p>
        <h2 className="relative mt-3 max-w-md text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">Ticketing that holds up when everyone buys at once</h2>
        <div className="relative mt-5 flex flex-wrap gap-2">
          <Out href={TICKETRUSH.url} className="btn bg-[#15120e] text-[#fff8ee] hover:bg-black">Try the live app</Out>
          <Out href={TICKETRUSH.repo} className="btn border border-white/40 hover:bg-white/10">Code</Out>
          <Out href={TICKETRUSH.design} className="btn border border-white/40 hover:bg-white/10">System design</Out>
        </div>
      </div>
      <div className="space-y-6 p-6 sm:p-8">
        <p className="leading-relaxed text-muted">{TICKETRUSH.pitch}</p>
        <p className="leading-relaxed"><span className="font-semibold">My role · </span><span className="text-muted">{TICKETRUSH.role}</span></p>
        <section aria-label="Measured results">
          <p className="k">Measured, not promised</p>
          <dl className="mt-3 grid gap-3 sm:grid-cols-2">
            {TICKETRUSH.metrics.map((m) => (
              <div key={m.l} className="rounded-2xl border border-line bg-win-2 p-4">
                <dd className="text-2xl font-semibold tabular-nums tracking-tight">{m.v}</dd>
                <dt className="mt-1 text-sm leading-snug text-muted">{m.l}</dt>
              </div>
            ))}
          </dl>
        </section>
        <section aria-label="Failures handled">
          <p className="k">Failures it&apos;s built for</p>
          <ul className="mt-3 divide-y divide-line rounded-2xl border border-line">
            {TICKETRUSH.failures.map((f) => (
              <li key={f.t} className="flex gap-4 p-4"><span aria-hidden className="mt-1.5 size-2 shrink-0 rounded-full bg-accent" /><div><p className="font-medium">{f.t}</p><p className="mt-0.5 text-sm text-muted">{f.d}</p></div></li>
            ))}
          </ul>
        </section>
        <div className="flex flex-wrap gap-2">{TICKETRUSH.stack.map((s) => <span key={s} className="chip">{s}</span>)}</div>
        <p className="text-sm text-muted">Results in <Out href={TICKETRUSH.results} className="a inline-flex items-center gap-0.5">docs/results</Out>. {TICKETRUSH.next}</p>
      </div>
    </div>
  );
}

/** Work folder: a sidebar list of case studies (tabs) with the selected one on the right. */
export function WorkApp() {
  const [sel, setSel] = useState(WORK[0].id);
  const reduce = useReducedMotion();
  const w = WORK.find((x) => x.id === sel)!;
  return (
    <div className="flex h-full min-h-0 flex-col sm:flex-row">
      <div role="tablist" aria-label="Case studies" className="flex shrink-0 gap-1 overflow-x-auto border-b border-line bg-win-2 p-2 sm:w-52 sm:flex-col sm:border-b-0 sm:border-r">
        {WORK.map((x) => (
          <button key={x.id} role="tab" aria-selected={x.id === sel} aria-controls="work-panel" onClick={() => setSel(x.id)}
            className={cn("relative shrink-0 rounded-xl px-3 py-2 text-left text-sm", x.id === sel ? "text-ink" : "text-muted hover:text-ink")}>
            {x.id === sel && <motion.span layoutId="work-sel" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 32 }} className="absolute inset-0 rounded-xl border border-line bg-win shadow-sm" />}
            <span className="relative block font-medium">{x.org.split(" · ").at(-1)}</span>
            <span className="relative block font-mono text-[11px] text-muted">{x.when}</span>
          </button>
        ))}
      </div>
      <div id="work-panel" role="tabpanel" className="min-h-0 flex-1 overflow-y-auto scroll-soft">
        <AnimatePresence mode="wait" initial={false}>
          <motion.article key={w.id} initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="p-6 sm:p-7">
            <p className="k">{w.org} · {w.when}</p>
            <h2 className="mt-2 text-2xl font-semibold leading-tight tracking-tight">{w.title}</h2>
            <p className="mt-1 text-sm text-muted">{w.role}</p>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {w.outcome.map((o) => <div key={o.l} className="rounded-2xl bg-accent-soft p-3"><p className="text-xl font-semibold tabular-nums">{o.v}</p><p className="text-xs text-muted">{o.l}</p></div>)}
            </div>
            <p className="mt-5 leading-relaxed"><span className="font-semibold">Problem. </span><span className="text-muted">{w.problem}</span></p>
            <p className="mt-3 leading-relaxed"><span className="font-semibold">What I did. </span><span className="text-muted">{w.did}</span></p>
            <div className="mt-5 flex flex-wrap gap-2">{w.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
            <p className="mt-5 text-xs text-muted">Client work is under NDA, so it&apos;s written as a case study. Every number is from the real project.</p>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function BuildingApp() {
  return (
    <div className="space-y-4 p-6 sm:p-7">
      <p className="text-muted">Next up after TicketRush. Same standard: real auth, real failure handling, load-tested, with the design docs published.</p>
      {BUILDING.map((b) => (
        <article key={b.name} className="rounded-2xl border border-dashed border-line p-5">
          <div className="flex items-center justify-between"><h2 className="text-xl font-semibold">{b.name}</h2><span className="chip">{b.status}</span></div>
          <p className="mt-1 text-muted">{b.line}</p>
          <ul className="mt-3 space-y-1.5 text-sm">{b.points.map((p) => <li key={p} className="flex gap-2"><span aria-hidden className="text-accent">→</span>{p}</li>)}</ul>
        </article>
      ))}
    </div>
  );
}

export function ProcessApp() {
  return (
    <div className="p-6 sm:p-7">
      <p className="text-muted">The same loop whether the title says PM, designer or engineer.</p>
      <ol className="mt-5 grid gap-3 sm:grid-cols-2">
        {PROCESS.map((p, i) => (
          <li key={p.t} className="rounded-2xl border border-line bg-win-2 p-4">
            <span className="font-hand text-3xl text-accent">{i + 1}.</span>
            <h2 className="mt-1 font-semibold">{p.t}</h2>
            <p className="mt-1 text-sm text-muted">{p.d}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ExperienceApp() {
  return (
    <div className="grid gap-8 p-6 sm:p-7">
      <ol className="relative space-y-5 border-l border-line pl-5">
        {EXPERIENCE.map((e) => (
          <li key={e.org} className="relative">
            <span aria-hidden className="absolute -left-[25px] top-1.5 size-2.5 rounded-full border-2 border-win bg-accent" />
            <p className="k">{e.when}</p><p className="mt-0.5 font-semibold">{e.org}</p><p className="text-sm text-muted">{e.what}</p>
          </li>
        ))}
      </ol>
      <div>
        <p className="k">Toolkit</p>
        <dl className="mt-3 divide-y divide-line rounded-2xl border border-line">
          {TOOLKIT.map((t) => <div key={t.k} className="grid gap-1 p-3 sm:grid-cols-[120px_1fr]"><dt className="font-medium">{t.k}</dt><dd className="text-sm text-muted">{t.v}</dd></div>)}
        </dl>
      </div>
      <a href="/cv" className="btn-alt self-start">Open the one-page CV</a>
    </div>
  );
}

export function ContactApp() {
  return (
    <div className="space-y-4 p-6 sm:p-7">
      <h2 className="text-3xl font-semibold leading-tight tracking-tight">Let&apos;s build something that <span className="font-hand text-4xl text-accent">holds up.</span></h2>
      <p className="text-muted">Open to Associate PM, design engineer, product / UI-UX and frontend roles. Async-friendly, with overlap for US or European hours.</p>
      <CopyRow label="Email" value={ME.email} />
      <CopyRow label="Phone" value={ME.phone} />
      <div className="flex flex-wrap gap-2 pt-1">
        <a href={`mailto:${ME.email}`} className="btn-main">Write an email</a>
        <Out href={ME.linkedin} className="btn-alt">LinkedIn</Out>
        <Out href={ME.github} className="btn-alt">GitHub</Out>
      </div>
    </div>
  );
}
