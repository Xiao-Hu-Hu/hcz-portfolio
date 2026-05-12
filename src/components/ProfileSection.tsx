import { CalendarDays, CheckCircle2, GraduationCap, Sparkles } from 'lucide-react';
import { profile } from '../data/profile';
import { ScrollReveal } from './ScrollReveal';
import { SectionTitle } from './SectionTitle';
import { SurfaceCard } from './SurfaceCard';

export function ProfileSection() {
  return (
    <section id="profile" className="section-shell">
      <ScrollReveal>
        <SectionTitle
          eyebrow="Profile"
          title="个人信息与教育背景"
        />
      </ScrollReveal>

      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <ScrollReveal>
          <SurfaceCard className="h-full p-6">
            <div className="flex items-start gap-4">
              <div className="icon-tile text-cyanx">
                <GraduationCap size={22} />
              </div>
              <div>
                <p className="text-sm text-white/48">Education</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">{profile.education.school}</h3>
                <p className="mt-2 text-white/62">
                  {profile.education.degree} · {profile.education.major} · {profile.education.label}
                </p>
              </div>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="dense-stat">
                <CalendarDays size={17} />
                <span>{profile.education.period}</span>
              </div>
              <div className="dense-stat">
                <Sparkles size={17} />
                <span>{profile.availability}</span>
              </div>
            </div>
          </SurfaceCard>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <SurfaceCard className="h-full p-6">
            <p className="text-sm text-white/48">Self Evaluation</p>
            <div className="mt-5 grid gap-4">
              {profile.strengths.map((strength) => (
                <div key={strength} className="flex gap-3 rounded-md border border-white/10 bg-white/[0.035] p-4">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-limex" size={18} />
                  <p className="text-sm leading-7 text-white/68">{strength}</p>
                </div>
              ))}
            </div>
          </SurfaceCard>
        </ScrollReveal>
      </div>
    </section>
  );
}
