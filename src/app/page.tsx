import { Desktop } from "@/components/os/desktop";
import { Phone } from "@/components/os/phone";

export default function Home() {
  return (
    <main>
      <h1 className="sr-only">Esheet Vivek, design engineer: portfolio</h1>
      <a href="/cv" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-10 focus:z-[999] focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-win">Skip to a plain one-page CV</a>
      <Desktop />
      <Phone />
    </main>
  );
}
