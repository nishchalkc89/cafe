export interface GalleryImage {
  id: string;
  caption: string;
  image: string;
  span: "tall" | "wide" | "square";
}

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "morning-light",
    caption: "Morning light through the front windows",
    image: "/images/gallery/morning-light.png",
    span: "tall",
  },
  {
    id: "pour-detail",
    caption: "Hand pour, table twelve",
    image: "/images/gallery/pour-detail.png",
    span: "square",
  },
  {
    id: "roasting-drum",
    caption: "The drum, mid-roast",
    image: "/images/gallery/roasting-drum.png",
    span: "square",
  },
  {
    id: "bar-view",
    caption: "The bar on a slow Sunday",
    image: "/images/gallery/bar-view.png",
    span: "wide",
  },
  {
    id: "green-corner",
    caption: "The reading corner, second floor",
    image: "/images/gallery/green-corner.png",
    span: "tall",
  },
  {
    id: "pastry-case",
    caption: "The case, seven in the morning",
    image: "/images/gallery/pastry-case.png",
    span: "square",
  },
  {
    id: "latte-art",
    caption: "A quiet rosette",
    image: "/images/gallery/latte-art.png",
    span: "square",
  },
  {
    id: "beans-macro",
    caption: "Fresh off the roaster",
    image: "/images/gallery/beans-macro.png",
    span: "wide",
  },
  {
    id: "window-seat",
    caption: "Window seat, golden hour",
    image: "/images/gallery/window-seat.png",
    span: "tall",
  },
  {
    id: "hands-cup",
    caption: "Warming hands, first sip",
    image: "/images/gallery/hands-cup.png",
    span: "square",
  },
];
