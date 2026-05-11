import { Mail, Phone } from 'lucide-react';
import type { ContactType } from './ContactPanel';

interface ContactActionProps {
  type: ContactType;
  className?: string;
  onOpen: (type: ContactType) => void;
}

const contactMap = {
  email: {
    label: '发送邮件',
    Icon: Mail,
  },
  phone: {
    label: '电话沟通',
    Icon: Phone,
  },
} as const;

export function ContactAction({ type, className = '', onOpen }: ContactActionProps) {
  const contact = contactMap[type];

  return (
    <button type="button" className={`magnetic-button ${className}`} onClick={() => onOpen(type)}>
      <contact.Icon size={18} />
      <span>{contact.label}</span>
    </button>
  );
}
