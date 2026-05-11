import { Boxes, Check, GitBranch, TimerReset } from 'lucide-react';
import { profile } from '../data/profile';
import { ScrollReveal } from './ScrollReveal';
import { SectionTitle } from './SectionTitle';
import { SpotlightCard } from './SpotlightCard';

export function ProjectsSection() {
  return (
    <section id="projects" className="section-shell">
      <ScrollReveal>
        <SectionTitle
          eyebrow="Projects"
          title="项目经历"
          description="围绕真实业务系统展示工程拆分、数据链路、AI 编排、异步处理、流式交互和模型推理能力。"
        />
      </ScrollReveal>

      <div className="relative space-y-5">
        <div className="timeline-line" />
        {profile.projects.map((project, index) => (
          <ScrollReveal key={project.name} delay={index * 0.08}>
            <article className="relative pl-0 md:pl-9">
              <span className="timeline-dot" />
              <SpotlightCard className="project-card">
                <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-white/50">
                      <span className="inline-flex items-center gap-2">
                        <TimerReset size={16} />
                        {project.period}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <GitBranch size={16} />
                        {project.tags.join(' · ')}
                      </span>
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold leading-tight text-white md:text-3xl">{project.name}</h3>
                    <p className="mt-4 text-sm leading-7 text-white/64 md:text-base">{project.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span key={item} className="skill-chip">
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {project.metrics.map((metric) => (
                        <button key={metric.label} type="button" className="metric-card">
                          <p>{metric.label}</p>
                          <strong>{metric.value}</strong>
                          {metric.detail ? <span className="metric-detail">{metric.detail}</span> : null}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="mb-4 flex items-center gap-2 text-sm text-cyanx">
                      <Boxes size={17} />
                      Engineering Highlights
                    </div>
                    <div className="space-y-3">
                      {project.highlights.map((highlight) => (
                        <div key={highlight} className="highlight-row">
                          <Check size={16} />
                          <p>{highlight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
