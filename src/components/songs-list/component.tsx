'use client'
import { SongsListProps } from '@/components/songs-list/types';
import { Song } from '@/types';
import { SongItem } from '@/components/song-item';
import { useOnPlay } from '@/hooks';

export const SongsList = ({ songs }: SongsListProps) => {
  const onPlay = useOnPlay(songs);
  
  if (!songs.length) {
    return <div className='mt-4 text-neutral-400'>No songs available!</div>;
  }
  
  return (
    <div
      className='
      grid
      grid-cols-2
      sm:grid-cols-3
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      2xl:grid-cols-8
      gap-4
      mt-4
      '
    >
      {songs.map(
        (s: Song) => <SongItem song={s} key={s.id} onClick={(id: string) => onPlay(id)} />
      )}
    </div>
  );
}
