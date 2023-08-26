import { TbPlaylist } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';

export const Library = () => {
  return (
    <div className='flex flex-col'>
      <div className="flex items-center justify-between pl-5 pr-3 py-4">
        <div className='gap-x-2 items-center flex cursor-pointer transition text-neutral-400 hover:text-white'>
          <TbPlaylist size={26} />
          <div className='font-medium text-md'>Your Library</div>
        </div>
        <div className="text-neutral-400 p-2 cursor-pointer rounded-full hover:bg-neutral-700 transition hover:text-white">
          <AiOutlinePlus
            fontSize={20}
          />
        </div>
      </div>
      <div className='flex flex-col gap-y-2 mt-4 px-3'>
        List of songs
      </div>
    </div>
  );
}
