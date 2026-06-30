type PlanGptMarkProps = {
  className?: string;
};

export default function PlanGptMark({ className = "w-7 h-7" }: PlanGptMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <rect
        x="7"
        y="6"
        width="13"
        height="15"
        rx="3"
        className="fill-pastel-blue/50 stroke-neon-blue"
        strokeWidth="1.5"
      />
      <rect
        x="4"
        y="3"
        width="13"
        height="15"
        rx="3"
        className="fill-white stroke-neon-pink"
        strokeWidth="1.75"
      />
      <path
        d="M7.5 8.5h6.5"
        className="stroke-neon-pink"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M7.5 11.5h5"
        className="stroke-neon-blue"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M7.5 14.5h3.5"
        className="stroke-neon-green"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
