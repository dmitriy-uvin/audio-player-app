import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { IconType } from 'react-icons';
import Link from 'next/link';

interface SidebarBlockProps {
  children: ReactNode;
  className?: string;
}

export const SidebarBlock = ({ children, className }: SidebarBlockProps) => {
  return (
    <div className={twMerge(`bg-neutral-900 rounded-lg h-fit w-full`, className)}>
      {children}
    </div>
  );
}

interface SidebarItemProps {
  label: string;
  icon: IconType;
  isActive?: boolean;
  href: string;
}

export const SidebarItem = ({ label, icon: Icon, isActive = false, href}: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={
      twMerge(
        `flex flex-row h-auto
        items-center w-full gap-x-4
        text-md font-medium 
        cursor-pointer hover:text-white
        transition
        text-neutral-400
        py-1`,
        isActive && 'text-white',
      )
    }
    >
      <Icon size={26} />
      <p className='truncate w-full'>{label}</p>
    </Link>
  );
}