import Link from "next/link";
export default function NotFound() {
  return (
    <main className="wallpaper grid min-h-dvh place-items-center p-6 text-center">
      <div className="glass rounded-3xl p-8 shadow-win">
        <p className="font-hand text-5xl text-accent">404</p>
        <p className="mt-2 font-semibold">This file isn&apos;t on the desktop.</p>
        <Link href="/" className="btn-main mt-5">Back to esheet.os</Link>
      </div>
    </main>
  );
}
