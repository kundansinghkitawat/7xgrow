export type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

export const heroFaqs: FaqItem[] = [
  {
    id: 1,
    question: "How long until I see results from SEO?",
    answer:
      "SEO is a long-term investment. Most clients see meaningful improvements in 3–6 months, with significant ranking gains by month 6–12.",
  },
  {
    id: 2,
    question: "Do you work with small businesses?",
    answer:
      "Yes. We work with startups, local shops, and growing brands. Every plan is adjusted to your budget and goals.",
  },
  {
    id: 3,
    question: "Are there any long-term contracts?",
    answer:
      "No. We offer flexible month-to-month plans, so you can pause or cancel any time with a short notice.",
  },
  {
    id: 4,
    question: "How do you report progress?",
    answer:
      "You get a clear monthly report with traffic, rankings, and leads, and we also schedule a call to explain the numbers.",
  },
  {
    id: 5,
    question: "How do I get started?",
    answer:
      "Just fill out the contact form or book a free call. We will review your website and send a custom plan within 2 business days.",
  },
];
