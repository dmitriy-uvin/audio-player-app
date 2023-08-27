import { getSongs } from '@/requests';
import { SongsList } from '@/components/songs-list';
import { Song } from '@/types';

export default async function Home() {
  const songs: Song[] = await getSongs();
  console.log(songs);
  
  return (
    <div className='mt-2 mb-7'>
      <div className="flex items-center justify-between">
        <h1 className="text-white text-2xl font-semibold">Newest songs</h1>
      </div>
      <div>
        <SongsList songs={songs} />
      </div>
    </div>
  )
}
