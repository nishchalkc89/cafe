export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  rating: number;
  verified: boolean;
  avatar: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Aurora Roast is the only place I trust with a single-origin pour. Every visit feels like the first time.",
    name: "Elena Marchetti",
    role: "Café Regular, since 2019",
    rating: 5,
    verified: true,
    avatar: "/images/testimonials/elena-marchetti.png",
  },
  {
    quote: "The honey amber latte ruined every other coffee shop for me. Impossibly good, every single time.",
    name: "Jonas Reyes",
    role: "Local Illustrator",
    rating: 5,
    verified: true,
    avatar: "/images/testimonials/jonas-reyes.png",
  },
  {
    quote: "You can taste the care. It's slow in the best way — a genuine ritual, not just caffeine.",
    name: "Priya Anand",
    role: "Food Journalist",
    rating: 5,
    verified: true,
    avatar: "/images/testimonials/priya-anand.png",
  },
  {
    quote: "I've brought every visiting friend here since it opened. Not one has left unimpressed.",
    name: "Marcus Webb",
    role: "Product Designer",
    rating: 5,
    verified: true,
    avatar: "/images/testimonials/marcus-webb.png",
  },
  {
    quote: "The bakery case alone is worth the trip. Everything tastes like it was made an hour ago — because it was.",
    name: "Sofia Lindqvist",
    role: "Pastry Enthusiast",
    rating: 4.9,
    verified: true,
    avatar: "/images/testimonials/sofia-lindqvist.png",
  },
  {
    quote: "Quietly the best cup in the city. No gimmicks, just people who clearly care about the craft.",
    name: "Daniel Osei",
    role: "Barista Trainer",
    rating: 5,
    verified: true,
    avatar: "/images/testimonials/daniel-osei.png",
  },
];
