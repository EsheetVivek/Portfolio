import type { AppDef } from "@/components/os/registry";
import { cn } from "@/lib/utils";

/** Rounded-square app tile with a glossy gradient, like a home-screen icon. */
export function AppIcon({ app, className }: { app: AppDef; className?: string }) {
  const Icon = app.icon;
  return (
    <span aria-hidden className={cn("relative grid place-items-center overflow-hidden rounded-[22%] bg-linear-to-br text-white shadow-[0_6px_14px_-6px_rgb(0_0_0/.45),inset_0_1px_0_rgb(255_255_255/.45)]", app.tint, className)}>
      <span className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white/30 to-transparent" />
      <Icon className="relative size-[48%]" strokeWidth={2} />
    </span>
  );
}
