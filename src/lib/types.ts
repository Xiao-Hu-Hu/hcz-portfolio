import type { LucideIcon } from 'lucide-react';

export interface ContactItem {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
}

export interface SkillGroup {
  title: string;
  summary: string;
  items: string[];
  accent: 'cyan' | 'lime' | 'amber' | 'rose';
}

export interface Project {
  name: string;
  period: string;
  stack: string[];
  description: string;
  highlights: string[];
  tags: string[];
  metrics: Array<{
    label: string;
    value: string;
    detail?: string;
  }>;
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
}
