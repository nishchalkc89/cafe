export interface MenuItem {
  name: string;
  desc: string;
  price: string;
  tag: string;
  gradient: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    name: "Honey Amber Latte",
    desc: "Espresso, steamed oat milk, wild honey, cinnamon dust",
    price: "$6.50",
    tag: "Signature",
    gradient: "linear-gradient(155deg, #F0C674 0%, #D9A441 55%, #B0812A 100%)",
  },
  {
    name: "Midnight Forest Pour",
    desc: "Single-origin Ethiopian, slow pour, notes of blackberry",
    price: "$5.75",
    tag: "Single Origin",
    gradient: "linear-gradient(155deg, #3E5240 0%, #2C3B2E 55%, #1B2619 100%)",
  },
  {
    name: "Caramel Fog Cortado",
    desc: "Double espresso, warm caramel, whisper of milk foam",
    price: "$5.25",
    tag: "House Favorite",
    gradient: "linear-gradient(155deg, #C68B4F 0%, #7A5B47 60%, #4A3327 100%)",
  },
  {
    name: "Aurora Cold Bloom",
    desc: "18-hour cold brew, citrus peel, sparkling finish",
    price: "$6.00",
    tag: "Cold Brew",
    gradient: "linear-gradient(155deg, #6B4C3A 0%, #4A3327 55%, #241812 100%)",
  },
  {
    name: "Espresso Reserve",
    desc: "Our rarest micro-lot, roasted in batches of twelve",
    price: "$7.25",
    tag: "Limited",
    gradient: "linear-gradient(155deg, #241812 0%, #14100C 100%)",
  },
  {
    name: "Olive & Oat Cortado",
    desc: "Oat milk, muted olive-leaf syrup, double ristretto",
    price: "$5.90",
    tag: "New",
    gradient: "linear-gradient(155deg, #8C8A63 0%, #6B6A4F 60%, #4A3327 100%)",
  },
];
