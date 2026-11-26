export type BannerItem = {
  value: string;
  suffix?: string;
  label: string;
};

export const heroBannerItems: BannerItem[] = [
  { value: "100", suffix: "+", label: "Projects Completed" },
  { value: "98", suffix: "%", label: "Client Satisfaction" },
  { value: "5", suffix: "+", label: "Years Experience" },
  { value: "15", suffix: "+", label: "Team Members" },
];

export const aboutBannerItems: BannerItem[] = [
  { value: "500", suffix: "+", label: "Clients Served" },
  { value: "10", suffix: "+", label: "Years of Excellence" },
  { value: "$50M", suffix: "+", label: "Ad Spend Managed" },
];
