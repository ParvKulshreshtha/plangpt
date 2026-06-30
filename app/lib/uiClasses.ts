export const ui = {
  pillActive:
    "bg-neon-pink/10 text-neon-pink border-neon-pink/40 shadow-sm shadow-neon-pink/5",
  pillInactive:
    "bg-white/90 text-gray-600 border-gray-200 hover:border-neon-blue/30 hover:text-neon-blue hover:bg-pastel-blue/10",
  card: "rounded-xl border border-gray-200/80 bg-white/90 backdrop-blur-sm hover:border-neon-blue/25 hover:shadow-md hover:shadow-neon-pink/5 transition",
  link: "text-sm font-medium text-neon-blue hover:text-neon-pink transition",
  sectionTitle: "text-lg font-semibold text-gray-900",
  input:
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white/80 text-gray-900 focus:outline-none focus:ring-2 focus:ring-neon-blue/30 focus:border-neon-blue/40",
};

export const categoryAccents: Record<
  string,
  { bar: string; title: string; cardHover: string }
> = {
  travel: {
    bar: "bg-neon-blue",
    title: "text-neon-blue",
    cardHover: "hover:border-neon-blue/30",
  },
  fitness: {
    bar: "bg-neon-green",
    title: "text-neon-green",
    cardHover: "hover:border-neon-green/30",
  },
  wedding: {
    bar: "bg-neon-pink",
    title: "text-neon-pink",
    cardHover: "hover:border-neon-pink/30",
  },
  finance: {
    bar: "bg-accent-orange",
    title: "text-accent-orange",
    cardHover: "hover:border-accent-orange/30",
  },
  events: {
    bar: "bg-neon-purple",
    title: "text-neon-purple",
    cardHover: "hover:border-neon-purple/30",
  },
  health: {
    bar: "bg-pastel-green",
    title: "text-emerald-600",
    cardHover: "hover:border-pastel-green/50",
  },
};
