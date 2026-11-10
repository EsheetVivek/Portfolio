import Link from "next/link";
import type { Metadata } from "next";
import { EXPERIENCE, ME, STATS, TICKETRUSH, TOOLKIT, WORK } from "@/lib/content";

export const metadata: Metadata = { title: "CV", description: "Esheet Vivek: one-page CV. Design engineer, product and frontend." };

/** Plain, print-friendly CV: the whole site's content as one readable page (also what search engines read). */
export default function CV() {
  return (
    <main className="mx-auto max-w-3xl bg-win px-5 py-10 text-[15px] leading-relaxed sm:px-10 sm:py-14 print:max-w-none print:p-0 print:text-[12px]">
      <nav className="mb-8 flex items-center justify-between print:hidden">
        <Link href="/" className="a">← Back to esheet.os</Link>
        <span className="text-sm text-muted">Tip: print this page to save it as a PDF.</span>
      </nav>
      <header>
        <h1 className="text-4xl font-semibold tracking-tight">{ME.name}</h1>
        <p className="mt-1 text-lg text-muted">{ME.roles.join(" · ")}</p>
        <p className="mt-2 text-sm">{ME.location} · Remote · <a className="a" href={`mailto:${ME.email}`}>{ME.email}</a> · {ME.phone} · <a className="a" href={ME.linkedin}>LinkedIn</a> · <a className="a" href={ME.github}>GitHub</a></p>
        <p className="mt-4">{ME.intro}</p>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">{STATS.map((s) => <li key={s.l}><b>{s.v}</b> {s.l}</li>)}</ul>
      </header>

      <section className="mt-8">
        <h2 className="k border-b border-line pb-1">Featured build</h2>
        <h3 className="mt-3 font-semibold">TicketRush · <a className="a" href={TICKETRUSH.url}>live</a> · <a className="a" href={TICKETRUSH.repo}>code</a></h3>
        <p className="mt-1 text-muted">{TICKETRUSH.pitch}</p>
        <ul className="mt-2 list-disc space-y-0.5 pl-5">{TICKETRUSH.metrics.map((m) => <li key={m.l}><b>{m.v}</b>: {m.l}</li>)}</ul>
      </section>

      <section className="mt-8">
        <h2 className="k border-b border-line pb-1">Work that shipped</h2>
        {WORK.map((w) => (
          <article key={w.id} className="mt-4 break-inside-avoid">
            <h3 className="font-semibold">{w.org} <span className="font-normal text-muted">· {w.when}</span></h3>
            <p className="text-sm text-muted">{w.role}</p>
            <p className="mt-1">{w.did}</p>
            <p className="mt-1 text-sm">{w.outcome.map((o) => `${o.v} ${o.l}`).join(" · ")}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 grid gap-8 sm:grid-cols-2 print:grid-cols-2">
        <div>
          <h2 className="k border-b border-line pb-1">Experience</h2>
          <ul className="mt-3 space-y-2">{EXPERIENCE.map((e) => <li key={e.org}><b>{e.org}</b><br /><span className="text-sm text-muted">{e.when} · {e.what}</span></li>)}</ul>
        </div>
        <div>
          <h2 className="k border-b border-line pb-1">Toolkit</h2>
          <dl className="mt-3 space-y-2">{TOOLKIT.map((t) => <div key={t.k}><dt className="font-semibold">{t.k}</dt><dd className="text-sm text-muted">{t.v}</dd></div>)}</dl>
        </div>
      </section>
    </main>
  );
}
