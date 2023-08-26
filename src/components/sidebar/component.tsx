'use client';

import { SidebarProps } from '@/components/sidebar/types';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { IconType } from 'react-icons';
import { SidebarBlock, SidebarItem } from '@/components/sidebar/sub-components';
import { Library } from '../library';

interface Route {
  label: string;
  isActive: boolean;
  href: string;
  icon: IconType;
}

export const Sidebar = ({ }: SidebarProps) => {
  const path = usePathname();
  const routes = useMemo<Route[]>(() => [
    {
      label: 'Home',
      isActive: path === '/',
      href: '/',
      icon: HiHome,
    },
    {
      label: 'Search',
      isActive: path === '/search',
      href: '/search',
      icon: BiSearch,
    }
  ], [path]);

  return (
    <div className='flex h-full'>
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <SidebarBlock>
          <div className='flex flex-col gap-y-4 px-5 py-4'>
            {!!routes.length && routes.map((r: Route, idx: number) => {
              return <SidebarItem
                key={idx}
                label={r.label}
                href={r.href}
                icon={r.icon}
                isActive={r.isActive}
              />;
            })}
          </div>
        </SidebarBlock>
        <SidebarBlock className='overflow-y-auto h-full'>
          <Library />
        </SidebarBlock>
      </div>
    </div>
  );
}