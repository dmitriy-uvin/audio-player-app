import { ReactNode } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onChange: (state: boolean) => void;
  title: string;
  description?: string;
  children?: ReactNode;
}