import { getLikedSongs } from '@/requests';
import { LikedContent } from '@/components/liked-content';

export default async function Liked() {
  const songs = await getLikedSongs();

  return (
    <div
      className='
        bg-neutral-900
        rounded-lg
        h-full
        w-full
        overflow-hidden
        overflow-y-auto
      '
    >
      <LikedContent songs={songs} />
    </div>
  )
}