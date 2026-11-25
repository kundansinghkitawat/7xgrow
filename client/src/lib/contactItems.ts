export type ContactIcon = "mail" | "call" | "location";

export interface ContactInfoItem {
  id: string;
  icon: ContactIcon;
  label: string;
  /** Main line (email, phone number, or first address line) */
  value: string;
  /** Extra lines under the value (used for the address) */
  extraLines?: string[];
  /** Optional link (mailto: or tel:). Leave out for plain text. */
  href?: string;
}

export interface ServiceOption {
  id: string;
  label: string;
}

export const contactHeader = {
  title: "Reach Us",
  description:
    "Tell us about your project and which services you need. We’ll reply with next steps within one business day.",
};

export const contactInfoTitle = "Contact Information";

export const contactInfo: ContactInfoItem[] = [
  {
    id: "email",
    icon: "mail",
    label: "Chat to us",
    value: "hello@7xgrow.in",
    href: "mailto:hello@7xgrow.in",
  },
  {
    id: "phone",
    icon: "call",
    label: "Call us",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    id: "address",
    icon: "location",
    label: "Visit us",
    value: "Udaipur, Rajasthan, India",
    // extraLines: ["Tech City, CA 94000"],
  },
];

export const services: ServiceOption[] = [
  { id: "seo", label: "SEO" },
  { id: "google-ads", label: "Google Ads" },
  { id: "meta-ads", label: "Meta Ads" },
  { id: "web-development", label: "Web Development" },
  { id: "email-marketing", label: "Email Marketing" },
];

export const formContent = {
  fullName: { label: "Full Name", placeholder: "John Doe" },
  workEmail: { label: "Work Email", placeholder: "johndoe@company.com" },
  website: { label: "Company Website URL", placeholder: "https://examplecompany.com" },
  services: { label: "Which services do you need?" },
  goals: { label: "Project Goals", placeholder: "Write your message..." },
  submit: "Send Message",
  success: "Message Sent",
  privacyText: "By submitting this form, you agree to our",
  privacyLabel: "Privacy Policy",
  privacyHref: "/policy",
};