import { getSongsByTitle } from '@/requests';
import { SearchInput } from '@/components/search-input';
import { SearchContent } from '@/components/search-content';

interface SearchProps {
  searchParams: {
    title: string;
  }
}

export default async function Search({ searchParams }: SearchProps) {
  const songs = await getSongsByTitle(searchParams.title);
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
      <div className="from-bg-neutral-900 mb-4">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">Search</h1>
          <SearchInput />
        </div>
      </div>
      <SearchContent songs={songs} />
    </div>
  );
}