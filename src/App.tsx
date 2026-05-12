import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const sectionIds = ['profile', 'skills', 'projects'];

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-40% 0px -55% 0px' },
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

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
              ['个人信息', '#profile', 'profile'],
              ['技术栈', '#skills', 'skills'],
              ['项目经历', '#projects', 'projects'],
              ['联系', 'contact', ''],
            ].map(([label, href, sectionId]) => (
              href === 'contact' ? (
                <button key={label} type="button" className="nav-link nav-button" onClick={() => openContactPanel('email')}>
                  {label}
                </button>
              ) : (
                <a key={label} href={href} className={`nav-link ${activeSection === sectionId ? 'nav-link-active' : ''}`}>
                  {label}
                </a>
              )
            ))}
          </div>
          <button
            type="button"
            className="mobile-menu-toggle md:hidden"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? '关闭菜单' : '打开菜单'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))} />
            <button type="button" className="top-cta" onClick={() => openContactPanel('email')}>
              联系我
              <ArrowUpRight size={15} />
            </button>
          </div>
        </nav>
      </header>

      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" role="presentation" onClick={() => setMobileMenuOpen(false)}>
          <nav className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            {[
              ['个人信息', '#profile'],
              ['技术栈', '#skills'],
              ['项目经历', '#projects'],
              ['联系', 'contact'],
            ].map(([label, href]) => (
              href === 'contact' ? (
                <button
                  key={label}
                  type="button"
                  className="mobile-menu-link"
                  onClick={() => { setMobileMenuOpen(false); openContactPanel('email'); }}
                >
                  {label}
                </button>
              ) : (
                <a
                  key={label}
                  href={href}
                  className="mobile-menu-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </a>
              )
            ))}
          </nav>
        </div>
      )}

      <main>
        <HeroSection />
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
