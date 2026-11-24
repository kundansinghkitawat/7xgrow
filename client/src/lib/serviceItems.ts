export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  textColor?: string;
};

export const heroServiceItems: ServiceItem[] = [
  {
    id: "seo",
    title: "SEO Strategy",
    description:
      "Maximize organic visibility with technical SEO, on-page optimization, and high-authority link building strategies.",
    imageUrl: "/black-hand.webp",
    textColor: "#ffffff",
  },
  {
    id: "ppc",
    title: "PPC Management",
    description:
      "Drive immediate results with expert Google Ads, Bing, and display management focused on ROI and conversions.",
  },
  {
    id: "social",
    title: "Social Media Ads",
    description:
      "Engage and convert your audience across Meta, LinkedIn, and TikTok using high-performance creative and targeting.",
    imageUrl: "/gray-indoor.webp",
    textColor: "#ffffff",
  },
  {
    id: "content",
    title: "Content Marketing",
    description:
      "Build authority and trust with data-driven content strategies that nurture prospects through every stage of the buyer's journey.",
    imageUrl: "/green-tree.webp",
    textColor: "#ffffff",
  },
  {
    id: "analytics",
    title: "Web Analytics",
    description:
      "Turn raw data into actionable insights with full-funnel tracking, custom dashboards, and deep behavioral analysis.",
  },
  {
    id: "cro",
    title: "Conversion Optimization",
    description:
      "Increase your conversion rates through rigorous A/B testing, UX improvements, and data-backed landing page design.",
  },
];
