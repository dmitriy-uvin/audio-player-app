"use client";

import { Song } from "@/types";
import { LibraryItem } from '@/components/library-item';


interface SearchContentProps {
  songs: Song[];
}

export const SearchContent = ({ songs }: SearchContentProps) => {
  if (songs.length === 0) {
    return (
      <div
        className="
          flex
          flex-col
          gap-y-2
          w-full
          px-6
          text-neutral-400
        "
      >
        No songs found.
      </div>
    )
  }
  
  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {songs.map((song: Song) => (
        <div
          key={song.id}
          className="flex items-center gap-x-4 w-full"
        >
          <div className="flex-1">
            <LibraryItem data={song} />
          </div>
        </div>
      ))}
    </div>
  );
}
