export default function JourneyIcon({ kind }: { kind: string }) {
  switch (kind) {
    case "harvest":
      return (
        <div className="relative flex h-16 w-16 items-center justify-center">
          <span className="absolute h-10 w-px bg-forest/40" />
          <span className="absolute h-3 w-3 rounded-full bg-coffee-dark animate-sway [animation-delay:-.2s]" style={{ transformOrigin: "50% -14px" }} />
          <span className="absolute left-[calc(50%+8px)] h-3 w-3 rounded-full bg-coffee-dark animate-sway [animation-delay:-.6s]" style={{ transformOrigin: "50% -14px" }} />
          <span className="absolute left-[calc(50%-8px)] h-3 w-3 rounded-full bg-coffee-dark animate-sway" style={{ transformOrigin: "50% -14px" }} />
        </div>
      );
    case "roasting":
      return (
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="h-12 w-12 rounded-full border-2 border-dashed border-honey/60 animate-spin-slow [animation-duration:6s]" />
          <div className="absolute h-5 w-5 rounded-full bg-coffee-dark" />
        </div>
      );
    case "grinding":
      return (
        <div className="relative flex h-16 w-16 items-end justify-center gap-1.5 overflow-hidden">
          <span className="h-1.5 w-1.5 rounded-full bg-coffee-dark animate-fall [animation-delay:0s]" />
          <span className="h-1.5 w-1.5 rounded-full bg-coffee-dark animate-fall [animation-delay:.3s]" />
          <span className="h-1.5 w-1.5 rounded-full bg-coffee-dark animate-fall [animation-delay:.6s]" />
          <span className="h-1.5 w-1.5 rounded-full bg-coffee-dark animate-fall [animation-delay:.9s]" />
        </div>
      );
    case "brewing":
      return (
        <div className="relative flex h-16 w-16 items-center justify-center">
          <span className="h-10 w-1.5 origin-top rounded-full bg-honey/70 animate-pour" />
          <span className="absolute bottom-2 h-3 w-8 rounded-full bg-coffee-dark/70" />
        </div>
      );
    case "serving":
      return (
        <div className="relative flex h-16 w-16 items-center justify-center">
          <span className="absolute -top-1 h-8 w-1 rounded-full bg-latte/70 blur-[2px] animate-drift" />
          <span className="absolute -top-1 left-[calc(50%+6px)] h-6 w-1 rounded-full bg-latte/60 blur-[2px] animate-drift [animation-delay:.5s]" />
          <span className="absolute bottom-3 h-4 w-9 rounded-b-xl border-2 border-coffee-dark" />
        </div>
      );
    default:
      return null;
  }
}
