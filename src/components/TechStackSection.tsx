import { Cpu, Database, Layers3, Workflow } from 'lucide-react';
import { profile } from '../data/profile';
import { ScrollReveal } from './ScrollReveal';
import { SectionTitle } from './SectionTitle';
import { SurfaceCard } from './SurfaceCard';

const icons = [Cpu, Layers3, Database, Workflow];

export function TechStackSection() {
  return (
    <section id="skills" className="section-shell">
      <ScrollReveal>
        <SectionTitle
          eyebrow="Tech Stack"
          title="技术栈矩阵"
        />
      </ScrollReveal>

      <div className="grid gap-4 md:grid-cols-2">
        {profile.skillGroups.map((group, index) => {
          const Icon = icons[index] ?? Cpu;
          return (
            <ScrollReveal key={group.title} delay={index * 0.04}>
              <SurfaceCard className={`skill-card accent-${group.accent}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-white/48">{group.summary}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{group.title}</h3>
                  </div>
                  <div className="icon-tile">
                    <Icon size={22} />
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="skill-chip">
                      {item}
                    </span>
                  ))}
                </div>
              </SurfaceCard>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
