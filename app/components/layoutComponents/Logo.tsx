import Link from "next/link";
import PlanGptMark from "./PlanGptMark";

type LogoProps = {
  className?: string;
  onClick?: () => void;
};

export default function Logo({ className = "", onClick }: LogoProps) {
  const mark = (
    <span
      className={`inline-flex items-center gap-2.5 select-none ${className}`}
      aria-label="PlanGPT"
    >
      <PlanGptMark className="w-7 h-7 shrink-0" />
      <span className="inline-flex items-baseline">
        <span className="text-[1.0625rem] font-semibold tracking-[-0.02em] text-neon-pink">
          Plan
        </span>
        <span className="text-[0.8125rem] font-medium tracking-[0.08em] uppercase text-neon-blue ml-1 translate-y-[-1px]">
          GPT
        </span>
      </span>
    </span>
  );

  if (onClick) {
    return (
      <Link
        href="/"
        onClick={onClick}
        className="inline-block rounded-lg hover:opacity-80 transition-opacity"
      >
        {mark}
      </Link>
    );
  }

  return (
    <Link href="/" className="inline-block rounded-lg hover:opacity-80 transition-opacity">
      {mark}
    </Link>
  );
}
