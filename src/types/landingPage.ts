/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ButtonData {
  text: string;
  link: string;
  _id?: string;
}

export interface FloatingImage {
  url: string;
  position: "left-top" | "right-top" | "left-bottom" | "right-bottom";
  _id?: string;
}

export interface HeroSection {
  badge: string;
  title: string;
  description: string;
  primary_button: ButtonData;
  hero_image: string;
  floating_images: FloatingImage[];
  _id?: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon?: string;
  image?: string;
  _id?: string;
}

export interface FeaturesSection {
  badge: string;
  title: string;
  description: string;
  cta_button: ButtonData;
  features: FeatureItem[];
  _id?: string;
}

export interface PlatformItem {
  step: number;
  tagline: string;
  title: string;
  description: string;
  bullets: string[];
  image: string;
  _id?: string;
}

export interface PlatformSection {
  badge: string;
  title: string;
  items: PlatformItem[];
  _id?: string;
}

export interface PlanPopulated {
  _id: string;
  name: string;
  price: number;
  currency: any;
  billing_cycle: string;
  features: Record<string, any>;
  is_featured: boolean;
}

export interface PricingPlan {
  _id: PlanPopulated;
  features: string[];
  is_featured: boolean;
}

export interface PricingSection {
  title: string;
  badge: string;
  description: string;
  subscribed_count: string;
  subscribed_user: string;
  plans: PricingPlan[];
  _id?: string;
}

export interface TestimonialPopulated {
  _id: string;
  user_name: string;
  user_post: string;
  title: string;
  description: string;
  rating: number;
  user_image: string;
}

export interface TestimonialItem {
  _id: TestimonialPopulated;
}

export interface TestimonialsSection {
  title: string;
  badge: string;
  testimonials: TestimonialItem[];
  _id?: string;
}

export interface FaqPopulated {
  _id: string;
  title: string;
  description: string;
}

export interface FaqItem {
  _id: FaqPopulated;
}

export interface FaqSection {
  title: string;
  faqs: FaqItem[];
  badge: string;
  description: string;
  _id?: string;
}

export interface ContactSection {
  title: string;
  subtitle: string;
  form_enabled: boolean;
  phone_no: string;
  email: string;
  description?: string;
  _id?: string;
}

export interface SocialLinks {
  twitter: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  _id?: string;
}

export interface FooterSection {
  cta_title: string;
  cta_description: string;
  cta_buttons: ButtonData[];
  social_links: SocialLinks[];
  copy_rights_text: string;
  _id?: string;
}

export interface LandingPageData {
  _id?: string;
  hero_section: HeroSection;
  features_section: FeaturesSection;
  platform_section: PlatformSection;
  pricing_section: PricingSection;
  testimonials_section: TestimonialsSection;
  faq_section: FaqSection;
  contact_section: ContactSection;
  footer_section: FooterSection;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetLandingPageResponse {
  success: boolean;
  data: LandingPageData;
}

export interface ConnectProps {
  data: ContactSection;
}

export interface FaqProps {
  data: FaqSection;
}

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: string | undefined;
  image: string | undefined;
}

export interface FeaturesProps {
  data: FeaturesSection;
}

export interface FooterProps {
  data: FooterSection;
}

export interface HomeProps {
  data: HeroSection;
}

export interface PlatformProps {
  data: PlatformSection;
}

export interface PricingPlanProps {
  data: PricingSection;
}

export interface TestimonialProps {
  data: TestimonialsSection;
}
