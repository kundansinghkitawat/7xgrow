export type ProcessItem = {
  id: string;
  step: string;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  caseStudy: string;
  // radar chart: name of the axis, and scores from 0 to 100
  metric: string;
  ours: number;
  average: number;
};

export const processItems: ProcessItem[] = [
  {
    id: "audit",
    step: "01",
    title: "Audit & Discovery",
    description:
      "Comprehensive audit of your digital ecosystem to uncover technical bottlenecks, missed opportunities, and quick wins.",
    stat: "2.5s",
    statLabel: "Page load, down from 8.4s",
    caseStudy: "Enterprise Platform Revamp · Web Dev",
    metric: "Speed",
    ours: 92,
    average: 45,
  },
  {
    id: "strategy",
    step: "02",
    title: "Strategy Blueprint",
    description:
      "Custom roadmap using the CLARITY framework to address your specific growth blockers and set measurable KPIs.",
    stat: "+120%",
    statLabel: "Leads, year over year",
    caseStudy: "Tech Startup Dominance · SaaS SEO",
    metric: "Leads",
    ours: 88,
    average: 50,
  },
  {
    id: "execution",
    step: "03",
    title: "Execution & Launch",
    description:
      "Elite specialists implement campaigns, optimize technical assets, and activate all growth systems simultaneously.",
    stat: "300%",
    statLabel: "Increase in qualified users",
    caseStudy: "FinTech User Acquisition · Google Ads",
    metric: "Traffic",
    ours: 90,
    average: 48,
  },
  {
    id: "optimize",
    step: "04",
    title: "Optimize & Refine",
    description:
      "Continuous A/B testing and data analysis to maximize conversion efficiency and squeeze every drop of ROI.",
    stat: "-50%",
    statLabel: "Cost per acquisition",
    caseStudy: "Health Supplement Automation · Email",
    metric: "CPA",
    ours: 85,
    average: 52,
  },
  {
    id: "scale",
    step: "05",
    title: "Scale & Dominate",
    description:
      "With a proven baseline, we aggressively expand your reach to capture greater market share and build lasting momentum.",
    stat: "4.5x",
    statLabel: "ROAS in just 30 days",
    caseStudy: "Fashion Brand Scaling · E-Commerce",
    metric: "ROAS",
    ours: 95,
    average: 55,
  },
];