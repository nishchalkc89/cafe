export default function WhyIcon({ name }: { name: string }) {
  const common = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none" } as const;

  switch (name) {
    case "plant":
      return (
        <svg {...common}>
          <path d="M12 21V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path
            d="M12 12c0-4 3-6.5 7-6.5C19 9.5 16 12 12 12Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path
            d="M12 15c0-3.5-2.5-6-6-6-.5 4 2 6.5 6 6Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "sunrise":
      return (
        <svg {...common}>
          <path d="M12 3v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M4.2 13a7.8 7.8 0 0115.6 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M2 17h20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M2 21h20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />
          <path d="M5.5 7.5l2 2M18.5 7.5l-2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "award":
      return (
        <svg {...common}>
          <circle cx="12" cy="9" r="5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M8.5 13.2 7 21l5-2.5L17 21l-1.5-7.8" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      );
    case "lamp":
      return (
        <svg {...common}>
          <path d="M7 4h10l-2.5 6h-5L7 4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M12 10v7" stroke="currentColor" strokeWidth="1.4" />
          <path d="M8 21h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M9 21c0-1.7 1.3-3 3-3s3 1.3 3 3" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    default:
      return null;
  }
}
