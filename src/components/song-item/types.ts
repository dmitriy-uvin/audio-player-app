import { Song } from '@/types';

export interface SongItemProps {
  song: Song;
  onClick: (id: string) => void;
}