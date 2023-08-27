import { Song } from '@/types';

export interface LibraryItemsProps {
  data: Song;
  onClick?: (id: string) => void;
}