import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ContactPanel, type ContactType } from './components/ContactPanel';
import { HeroSection } from './components/HeroSection';
import { ProfileSection } from './components/ProfileSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TechStackSection } from './components/TechStackSection';
import { ThemeToggle } from './components/ThemeToggle';
import { ThreadsBackground } from './components/ThreadsBackground';
import { profile } from './data/profile';

type Theme = 'dark' | 'light';

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = window.localStorage.getItem('portfolio-theme');
    return saved === 'light' ? 'light' : 'dark';
  });
  const [contactPanelOpen, setContactPanelOpen] = useState(false);
  const [initialContactType, setInitialContactType] = useState<ContactType>('email');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  function openContactPanel(type: ContactType = 'email') {
    setInitialContactType(type);
    setContactPanelOpen(true);
  }

  return (
    <>
      <ThreadsBackground />
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-ink/64 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="#" className="flex items-center gap-3 text-sm font-medium text-white">
            <span className="grid h-8 w-8 place-items-center rounded-md border border-white/12 bg-white/[0.05] text-cyanx">
              HCZ
            </span>
            <span>{profile.name}</span>
          </a>
          <div className="hidden items-center gap-1 md:flex">
            {[
              ['个人信息', '#profile'],
              ['技术栈', '#skills'],
              ['项目经历', '#projects'],
              ['联系', 'contact'],
            ].map(([label, href]) => (
              href === 'contact' ? (
                <button key={label} type="button" className="nav-link nav-button" onClick={() => openContactPanel('email')}>
                  {label}
                </button>
              ) : (
                <a key={label} href={href} className="nav-link">
                  {label}
                </a>
              )
            ))}
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))} />
            <button type="button" className="top-cta" onClick={() => openContactPanel('email')}>
              联系我
              <ArrowUpRight size={15} />
            </button>
          </div>
        </nav>
      </header>

      <main>
        <HeroSection onOpenContact={openContactPanel} />
        <ProfileSection />
        <TechStackSection />
        <ProjectsSection />
      </main>

      <ContactPanel open={contactPanelOpen} initialType={initialContactType} onClose={() => setContactPanelOpen(false)} />

      <footer className="mx-auto max-w-7xl px-5 pb-10 pt-8 text-sm text-white/38 md:px-8">
        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p>© 2026 胡传政 · Go Backend & AI Application Development</p>
          <p>Built with React, TypeScript, Tailwind CSS and Framer Motion.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
