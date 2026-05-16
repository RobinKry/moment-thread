import { Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  listening: boolean;
  onClick: () => void;
  size?: number;
};

export function VoiceOrb({ listening, onClick, size = 168 }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={listening}
      aria-label={listening ? "Stop listening" : "Start listening"}
      className="relative grid place-items-center rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
      style={{ width: size, height: size }}
    >
      {/* halo rings */}
      <span
        className={cn(
          "absolute inset-0 rounded-full bg-primary/15 transition-all duration-700",
          listening ? "scale-125 opacity-100 animate-ping" : "scale-100 opacity-60"
        )}
      />
      <span
        className={cn(
          "absolute inset-3 rounded-full bg-primary/20 transition-all duration-700",
          listening ? "scale-110 opacity-90" : "scale-100 opacity-70"
        )}
      />
      <span
        className={cn(
          "absolute inset-6 rounded-full bg-primary/30 transition-all duration-500",
          listening && "animate-pulse"
        )}
      />
      {/* core */}
      <span
        className={cn(
          "relative grid place-items-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform",
          listening ? "scale-105" : "scale-100"
        )}
        style={{ width: size * 0.45, height: size * 0.45 }}
      >
        {listening ? <MicOff className="h-7 w-7" /> : <Mic className="h-7 w-7" />}
      </span>
    </button>
  );
}
