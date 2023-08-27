'use client'

import { useLoadSong, usePlayer, useSongById } from '@/hooks';
import { PlayerControls } from '@/components/player/player-controls';

export const Player = () => {
  const player = usePlayer();
  const { song } = useSongById(player.activeId);
  const songUrl = useLoadSong(song!);
  
  if (!songUrl || !song || !player.activeId) {
    return null;
  }

  return (
    <div
      className='
      fixed
      bottom-0
      bg-black
      w-full
      py-2
      h-[80px]
      px-4
      '
    >
      <PlayerControls song={song} songUrl={songUrl} key={songUrl} />
    </div>
  )
}