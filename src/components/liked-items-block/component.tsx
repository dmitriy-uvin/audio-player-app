'use client'

import { SongItemProps } from '@/components/liked-items-block/types';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export const LikedItemsBlock = ({ img, name, href }: SongItemProps) => {
  const router = useRouter();
  const onClick = () => {
    router.push(href);
  }

  return (
    <button
      onClick={onClick}
      className='
        relative group flex items-center rounded-md
        overflow-hidden gap-x-4 bg-neutral-100/10
        hover:bg-neutral-100/20 transition pr-4
      '
    >
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image src={img} alt={name} className='object-cover' fill />
      </div>
      <p className='font-medium truncate py-5'>{name}</p>
      <div
        className='absolute opacity-0 transition
        rounded-full flex items-center
        justify-center bg-green-500 p-4
        drop-shadow-md right-5 group-hover:opacity-100
        hover:scale-110'
      >
        <FaPlay className={'text-black'} />
      </div>
    </button>
  );
}