'use client'

import { LikedContentProps } from '@/components/liked-content/types';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks';
import { useEffect } from 'react';
import { AppRoutes, Song } from '@/types';
import { LibraryItem } from '@/components/library-item';
import { LikeButton } from '@/components/like-button';

export const LikedContent = ({ songs }: LikedContentProps) => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(AppRoutes.MAIN_PAGE);
    }
  }, [router, isLoading, user]);
  
  if (!songs.length) {
    return <div
      className='flex flex-col gap-y-2 w-full px-6 text-neutral-400'
    >
      No liked songs.
    </div>
  }

  return (
    <div className='flex flex-col gap-y-2 w-full p-6'>
      {songs.map((s: Song) => <div key={s.id} className='flex items-center gap-x-4 w-full'>
        <div className="flex-1">
          <LibraryItem data={s} />
        </div>
        <LikeButton id={s.id} />
      </div>)}
    </div>
  )
}