import { LibraryItemsProps } from '@/components/library-item/types';
import { useLoadImg } from '@/hooks';
import Image from 'next/image';

export const LibraryItem = ({ data, onClick }: LibraryItemsProps) => {
  const imgPath = useLoadImg(data);
  const clickHandler = () => {
    if (!onClick) {
      return;
    }
    return onClick(data.id);
  }
  return (
    <div
      onClick={clickHandler}
      className='
       flex
       items-center
       gap-x-3
       cursor-pointer
       hover:bg-neutral-800/50
       w-full
       p-2
       rounded-md
      '
    >
      <div
        className='
         relative
         rounded-md
         min-h-[48px]
         min-w-[48px]
         overflow-hidden
        '
      >
        <Image src={`${imgPath}`} alt={data.title} fill className='object-cover' />
      </div>
      <div className='flex flex-col gap-y-1 overflow-hidden'>
        <p className='text-white truncate'>{data.title}</p>
        <p className='text-neutral-400 text-sm truncate'>{data.author}</p>
      </div>
    </div>
  );
}