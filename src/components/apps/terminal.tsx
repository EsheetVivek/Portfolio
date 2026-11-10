"use client";

import { useEffect, useRef, useState } from "react";
import { ME, TICKETRUSH } from "@/lib/content";
import { useOS } from "@/components/os/os-context";
import { APPS, ORDER, isAppId } from "@/components/os/registry";

type Line = { kind: "in" | "out"; text: string };

const HELP = [
  "help              this list",
  "whoami            the short version",
  "ls                apps on this desktop",
  "open <app>        open an app, e.g. open ticketrush",
  "contact           how to reach me",
  "stack             what I build with",
  "clear             clear the screen",
];

/** A tiny pretend shell. Everything it prints comes from the same content as the rest of the site. */
export function TerminalApp() {
  const { open } = useOS();
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: "esheet.os terminal · type `help` and press Enter" },
  ]);
  const [value, setValue] = useState("");
  const [hist, setHist] = useState<string[]>([]);
  const [hi, setHi] = useState(-1);
  const end = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => { end.current?.scrollIntoView({ block: "nearest" }); }, [lines]);

  function run(raw: string) {
    const cmd = raw.trim();
    const [c, ...args] = cmd.split(/\s+/);
    let out: string[] = [];
    switch (c?.toLowerCase()) {
      case "": break;
      case "help": out = HELP; break;
      case "whoami": out = [`${ME.name} · ${ME.role} · ${ME.location}`, ME.intro]; break;
      case "ls": out = [ORDER.map((id) => APPS[id].file).join("   ")]; break;
      case "open": {
        const id = (args[0] ?? "").toLowerCase().replace(/\.app$/, "");
        if (isAppId(id)) { open(id); out = [`opening ${APPS[id].file}…`]; } else out = [`open: no such app "${args[0] ?? ""}". try: ${ORDER.join(", ")}`];
        break;
      }
      case "contact": out = [`email   ${ME.email}`, `phone   ${ME.phone}`, `linkedin ${ME.linkedin}`, `github  ${ME.github}`]; break;
      case "stack": out = ["React · Next.js · TypeScript · Node.js · Postgres · Tailwind · Figma"]; break;
      case "ticketrush": out = [TICKETRUSH.status, ...TICKETRUSH.metrics.slice(0, 3).map((m) => `${m.v.padEnd(14)} ${m.l}`)]; break;
      case "sudo": out = args.join(" ") === "hire-me" ? ["permission granted. opening Mail…"] : ["nice try."]; if (args.join(" ") === "hire-me") open("contact"); break;
      case "clear": setLines([]); return;
      default: out = [`${c}: command not found. type \`help\``];
    }
    setLines((l) => [...l, { kind: "in", text: cmd }, ...out.map((text) => ({ kind: "out" as const, text }))]);
  }

  return (
    <div className="flex h-full min-h-[260px] flex-col bg-[#16161c] font-mono text-[13px] leading-relaxed text-[#e8e6e1]" onClick={() => input.current?.focus()}>
      <div className="flex-1 overflow-y-auto p-4 scroll-soft" aria-live="polite">
        {lines.map((l, i) => (
          <p key={i} className={l.kind === "in" ? "text-[#ffb36b]" : "whitespace-pre-wrap text-[#cfcac2]"}>{l.kind === "in" ? `➜ ~ ${l.text}` : l.text}</p>
        ))}
        <div ref={end} />
      </div>
      <form className="flex items-center gap-2 border-t border-white/10 px-4 py-3" onSubmit={(e) => { e.preventDefault(); run(value); if (value.trim()) setHist((h) => [value, ...h].slice(0, 30)); setValue(""); setHi(-1); }}>
        <label htmlFor="term-in" className="text-[#7be0a8]">➜ ~</label>
        <input id="term-in" ref={input} value={value} onChange={(e) => setValue(e.target.value)} autoComplete="off" spellCheck={false}
          aria-label="Terminal command" placeholder="help"
          onKeyDown={(e) => {
            if (e.key === "ArrowUp" && hist.length) { e.preventDefault(); const n = Math.min(hi + 1, hist.length - 1); setHi(n); setValue(hist[n]); }
            if (e.key === "ArrowDown") { e.preventDefault(); const n = hi - 1; setHi(n); setValue(n >= 0 ? hist[n] : ""); }
          }}
          className="min-w-0 flex-1 bg-transparent focus-visible:outline-none text-[16px] text-white outline-none placeholder:text-white/30 sm:text-[13px]" />
      </form>
    </div>
  );
}
