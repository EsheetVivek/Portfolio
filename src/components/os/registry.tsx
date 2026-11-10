import type { ComponentType } from "react";
import { Briefcase, Clock3, Hammer, Mail, SquareTerminal, Ticket, Workflow, Smile } from "lucide-react";
import { AboutApp, BuildingApp, ContactApp, ExperienceApp, ProcessApp, TicketRushApp, WorkApp } from "@/components/apps/content";
import { TerminalApp } from "@/components/apps/terminal";

export type AppId = "about" | "ticketrush" | "work" | "building" | "process" | "experience" | "contact" | "terminal";

export interface AppDef {
  id: AppId; title: string; file: string; icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  tint: string; // icon tile gradient
  w: number; h: number; x: string; y: number; // default desktop size and position
  Body: ComponentType; flush?: boolean;
}

export const APPS: Record<AppId, AppDef> = {
  about: { id: "about", title: "Welcome", file: "welcome.txt", icon: Smile, tint: "from-[#ffb36b] to-[#e8501a]", w: 580, h: 590, x: "5%", y: 56, Body: AboutApp },
  ticketrush: { id: "ticketrush", title: "TicketRush", file: "TicketRush.app", icon: Ticket, tint: "from-[#ff7a5c] to-[#c8321f]", w: 620, h: 620, x: "46%", y: 92, Body: TicketRushApp },
  work: { id: "work", title: "Work", file: "Work — shipped", icon: Briefcase, tint: "from-[#7fb2ff] to-[#3666d6]", w: 720, h: 520, x: "18%", y: 120, Body: WorkApp, flush: true },
  building: { id: "building", title: "Building", file: "Building next", icon: Hammer, tint: "from-[#ffd56b] to-[#d99a0b]", w: 520, h: 480, x: "30%", y: 90, Body: BuildingApp },
  process: { id: "process", title: "How I work", file: "how-i-work.md", icon: Workflow, tint: "from-[#7be0a8] to-[#2f8f5b]", w: 560, h: 460, x: "24%", y: 140, Body: ProcessApp },
  experience: { id: "experience", title: "Experience", file: "Experience", icon: Clock3, tint: "from-[#c9a2ff] to-[#7346d1]", w: 560, h: 560, x: "36%", y: 80, Body: ExperienceApp },
  contact: { id: "contact", title: "Mail", file: "Mail — say hello", icon: Mail, tint: "from-[#7ad8ff] to-[#1f8fd6]", w: 520, h: 480, x: "40%", y: 130, Body: ContactApp },
  terminal: { id: "terminal", title: "Terminal", file: "esheet@os: ~", icon: SquareTerminal, tint: "from-[#4a4a55] to-[#16161c]", w: 560, h: 380, x: "12%", y: 300, Body: TerminalApp, flush: true },
};

export const ORDER: AppId[] = ["about", "ticketrush", "work", "building", "process", "experience", "contact", "terminal"];
export const isAppId = (s: string): s is AppId => s in APPS;
