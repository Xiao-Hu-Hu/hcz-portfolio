import { Check, Copy, ExternalLink, Mail, Phone } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { copyWithFallback } from '../lib/clipboard';

type ContactType = 'email' | 'phone';

interface ContactActionProps {
  type: ContactType;
  className?: string;
}

const contactMap = {
  email: {
    label: '发送邮件',
    value: '3624435880@qq.com',
    href: 'mailto:3624435880@qq.com',
    actionLabel: '打开邮箱',
    Icon: Mail,
  },
  phone: {
    label: '电话沟通',
    value: '18437309985',
    href: 'tel:18437309985',
    actionLabel: '拨打电话',
    Icon: Phone,
  },
} as const;

export function ContactAction({ type, className = '' }: ContactActionProps) {
  const contact = contactMap[type];
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1500);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function handleCopy() {
    await copyWithFallback(contact.value);
    setCopied(true);
  }

  return (
    <div ref={wrapperRef} className="contact-action-wrapper">
      <button
        type="button"
        className={`magnetic-button ${className}`}
        onClick={() => setOpen((v) => !v)}
      >
        <contact.Icon size={18} />
        <span>{contact.label}</span>
      </button>

      {open && (
        <div className="contact-inline-popup">
          <p className="contact-inline-label">{type === 'email' ? '邮箱' : '电话'}</p>
          <strong className="contact-inline-value">{contact.value}</strong>
          <div className="contact-inline-actions">
            <button type="button" className="contact-action-button" onClick={handleCopy}>
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? '已复制' : '复制'}
            </button>
            <a className="contact-action-button secondary" href={contact.href}>
              {contact.actionLabel}
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
