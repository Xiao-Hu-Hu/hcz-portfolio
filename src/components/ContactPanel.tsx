import { Check, Copy, Download, ExternalLink, Mail, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { copyWithFallback } from '../lib/clipboard';
import { profile } from '../data/profile';

export type ContactType = 'email' | 'phone';

interface ContactPanelProps {
  open: boolean;
  initialType?: ContactType;
  onClose: () => void;
}

const methods = {
  phone: {
    label: '电话',
    value: '18437309985',
    href: 'tel:18437309985',
    actionLabel: '拨打电话',
    Icon: Phone,
  },
  email: {
    label: '邮箱',
    value: '3624435880@qq.com',
    href: 'mailto:3624435880@qq.com',
    actionLabel: '打开邮箱',
    Icon: Mail,
  },
} as const;

export function ContactPanel({ open, initialType = 'email', onClose }: ContactPanelProps) {
  const [copied, setCopied] = useState<ContactType | null>(null);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(null), 1500);
    return () => window.clearTimeout(timer);
  }, [copied]);

  if (!open) return null;

  async function handleCopy(type: ContactType) {
    await copyWithFallback(methods[type].value);
    setCopied(type);
  }

  return (
    <div className="contact-panel-overlay" role="presentation" onMouseDown={onClose}>
      <section
        className="contact-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-panel-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button type="button" className="contact-panel-close" onClick={onClose} aria-label="关闭联系面板">
          <X size={18} />
        </button>

        <div className="contact-panel-header">
          <p className="text-sm uppercase text-cyanx/80">Contact</p>
          <h2 id="contact-panel-title">联系胡传政</h2>
          <p>后端实习生 · Go 后端工程师 / AI 应用开发 · {profile.availability}</p>
        </div>

        <div className="contact-panel-meta">
          <span>{profile.intent}</span>
          <span>{profile.education.school} · {profile.education.major}</span>
          <span>可实习半年及以上</span>
        </div>

        <div className="contact-method-grid">
          {(Object.keys(methods) as ContactType[]).map((type) => {
            const method = methods[type];
            return (
              <article key={type} className="contact-method-card">
                <div className="contact-method-icon">
                  <method.Icon size={20} />
                </div>
                <div className="min-w-0">
                  <p>{method.label}</p>
                  <strong>{method.value}</strong>
                </div>
                <div className="contact-method-actions">
                  <button type="button" className="contact-action-button" onClick={() => handleCopy(type)}>
                    {copied === type ? <Check size={16} /> : <Copy size={16} />}
                    {copied === type ? '已复制' : '复制'}
                  </button>
                  <a className="contact-action-button secondary" href={method.href}>
                    {method.actionLabel}
                    <ExternalLink size={14} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="contact-panel-footer">
          <a className="contact-download-link" href="/胡传政-后端开发(AI应用开发)-golang.pdf" download>
            <Download size={18} />
            下载 PDF 简历
          </a>
          <p>推荐通过邮箱发送岗位信息、面试时间和技术栈要求；电话适合快速沟通到岗时间。</p>
        </div>
      </section>
    </div>
  );
}
