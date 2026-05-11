import type { LucideIcon } from 'lucide-react';

export interface ContactItem {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
}

export interface SkillItem {
  name: string;
  /** 'core' items get visually highlighted */
  level: 'core' | 'familiar' | 'learning';
}

export interface SkillGroup {
  title: string;
  summary: string;
  items: SkillItem[];
  accent: 'cyan' | 'lime' | 'amber' | 'rose';
}

export interface Project {
  name: string;
  period: string;
  stack: string[];
  description: string;
  /** Use **text** markers around keywords for bold rendering */
  highlights: string[];
  tags: string[];
  metrics: Array<{
    label: string;
    value: string;
    detail?: string;
  }>;
  github?: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface ProfileData {
  name: string;
  role: string;
  intent: string;
  availability: string;
  education: {
    school: string;
    degree: string;
    major: string;
    period: string;
    label: string;
  };
  contacts: ContactItem[];
  headlineTags: string[];
  skillGroups: SkillGroup[];
  projects: Project[];
  strengths: string[];
  socialLinks: SocialLink[];
}
