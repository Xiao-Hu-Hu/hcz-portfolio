import { ArrowDownRight, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import { ContactAction } from './ContactAction';
import { Magnet } from './Magnet';
import { SignalMap } from './SignalMap';
import { SurfaceCard } from './SurfaceCard';
import type { ContactType } from './ContactPanel';

interface HeroSectionProps {
  onOpenContact: (type: ContactType) => void;
}

export function HeroSection({ onOpenContact }: HeroSectionProps) {
  return (
    <section className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 gap-8 px-5 pb-14 pt-8 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/70"
        >
          <span className="h-2 w-2 rounded-full bg-limex shadow-[0_0_18px_rgba(190,242,100,0.8)]" />
          {profile.intent} · {profile.availability}
        </motion.div>

        <div className="space-y-5">
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-sm uppercase text-cyanx/80"
          >
            Backend Engineer · AI Application Developer
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-3xl text-[44px] font-semibold leading-[1.04] text-white sm:text-[64px] lg:text-[76px]"
          >
            {profile.name}
            <span className="block text-white/50">{profile.role}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="max-w-2xl text-base leading-8 text-white/66 md:text-lg"
          >
            聚焦 Go 后端工程化、AI Agent 编排、RAG 检索增强与真实业务链路落地。能从认证、缓存、消息队列、数据访问到流式 AI 交互完整推进服务端能力建设。
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="relative z-40 flex flex-wrap gap-3"
        >
          <Magnet
            padding={90}
            magnetStrength={10}
            activeTransition="transform 0.18s ease-out"
            inactiveTransition="transform 0.42s ease-in-out"
            wrapperClassName="magnet-wrap"
          >
            <a className="magnetic-button primary-action" href="/胡传政-后端开发(AI应用开发)-golang.pdf" download>
              <Download size={18} />
              下载简历
            </a>
          </Magnet>
          <Magnet
            padding={90}
            magnetStrength={10}
            activeTransition="transform 0.18s ease-out"
            inactiveTransition="transform 0.42s ease-in-out"
            wrapperClassName="magnet-wrap"
          >
            <ContactAction type="email" onOpen={onOpenContact} />
          </Magnet>
          <Magnet
            padding={90}
            magnetStrength={10}
            activeTransition="transform 0.18s ease-out"
            inactiveTransition="transform 0.42s ease-in-out"
            wrapperClassName="magnet-wrap"
          >
            <ContactAction type="phone" onOpen={onOpenContact} />
          </Magnet>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28 }}
          className="relative z-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {[
            ['核心语言', 'Go'],
            ['主攻方向', 'AI 应用开发'],
            ['可实习', '半年以上'],
            ['到岗周期', '一周内'],
          ].map(([label, value]) => (
            <SurfaceCard key={label} className="px-4 py-4">
              <p className="text-xs text-white/42">{label}</p>
              <p className="mt-2 text-lg font-semibold text-white">{value}</p>
            </SurfaceCard>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.75, delay: 0.18 }}
        className="space-y-4"
      >
        <SignalMap />
        <SurfaceCard className="p-5">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-sm text-white/50">Current Focus</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">让 LLM 成为可控的业务服务层</h2>
            </div>
            <ArrowDownRight className="mt-1 text-cyanx" />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {profile.headlineTags.map((tag) => (
              <span key={tag} className="skill-chip">
                {tag}
              </span>
            ))}
          </div>
        </SurfaceCard>
      </motion.div>
    </section>
  );
}
