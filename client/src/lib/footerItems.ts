import type { ComponentType } from "react";
import {
  InstagramIcon,
  GithubIcon,
  TwitterIcon,
  FacebookIcon,
  YoutubeIcon,
  WhatsappIcon,
  type Props as IconProps,
} from "@/components/Icons";

export type FooterLink = {
  label: string;
  href: string;
};

export type SocialLink = FooterLink & {
  Icon: ComponentType<IconProps>;
};

export const footerContent = {
  brand: "7xGrow",
  wordmark: "7xGrow",
  description:
    "7xGrow is a premier digital marketing agency in Udaipur specializing in SEO, PPC, social media marketing, and data-driven growth strategies.",
  address: "Udaipur, Rajasthan, India",
  followTitle: "Follow Us",
  servicesTitle: "Services",
  companyTitle: "Company",
  visitTitle: "Visit Us",
  rights: "All rights reserved.",
  newsletter: {
    title: "Newsletter",
    description: "Get weekly growth insights delivered to your inbox.",
    placeholder: "Enter your email..",
    button: "Subscribe",
  },
};

export const footerServices: FooterLink[] = [
  { label: "Search Engine Optimization", href: "/services/seo" },
  { label: "Social Media Marketing", href: "/services/social-media-marketing" },
  { label: "Google Ads / PPC", href: "/services/google-ads" },
  { label: "Website Design & Dev", href: "/services/website-design" },
  { label: "Content Marketing", href: "/services/content-marketing" },
  { label: "Branding & Creative", href: "/services/branding" },
  { label: "Email Marketing", href: "/services/email-marketing" },
];

export const footerCompany: FooterLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Cases", href: "/cases" },
  { label: "Career", href: "/career" },
  { label: "Contact", href: "/contact" },
];

export const footerLegalLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "/policy" },
  { label: "Terms of Service", href: "/terms" },
];

export const footerSocialLinks: SocialLink[] = [
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "GitHub", href: "#", Icon: GithubIcon },
  { label: "X", href: "#", Icon: TwitterIcon },
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "Youtube", href: "#", Icon: YoutubeIcon },
  { label: "Whatsapp", href: "#", Icon: WhatsappIcon },
];