export type DashboardStat = {
  label: string;
  value: string;
  note: string;
};

export type DashboardItem = {
  id: string;
  menu: string;
  category: string;
  stats: DashboardStat[];
};

export type YearlyGrowth = {
  year: string;
  value: number; // 0 to 100
};

// Case studies shown in the four small cards (first stat of each is used)
export const dashboardItems: DashboardItem[] = [
  {
    id: "fashion",
    menu: "Fashion Brand",
    category: "E-Commerce · Meta Ads",
    stats: [{ label: "ROAS", value: "4.5x", note: "in just 30 days" }],
  },
  {
    id: "saas",
    menu: "Tech Startup",
    category: "SaaS · SEO",
    stats: [{ label: "Leads", value: "+120%", note: "organic growth YOY" }],
  },
  {
    id: "fintech",
    menu: "FinTech",
    category: "FinTech · Google Ads",
    stats: [{ label: "Traffic", value: "+300%", note: "qualified users" }],
  },
  {
    id: "platform",
    menu: "Enterprise Platform",
    category: "Web Dev · Next.js",
    stats: [{ label: "Load time", value: "2.5s", note: "reduced from 8.4s" }],
  },
];

// Average campaign lift by year (sample data, replace with real data)
export const yearlyGrowth: YearlyGrowth[] = [
  { year: "2018", value: 34 },
  { year: "2019", value: 41 },
  { year: "2020", value: 38 },
  { year: "2021", value: 52 },
  { year: "2022", value: 61 },
  { year: "2023", value: 68 },
  { year: "2024", value: 79 },
  { year: "2025", value: 92 },
];

// Industry benchmark drawn as the dashed mid line
export const industryAverage = 48;

// Y axis gridlines and labels, 0 to 100
export const yAxisTicks = [0, 25, 50, 75, 100];