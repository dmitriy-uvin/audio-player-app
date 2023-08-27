import { LikedItemsBlock } from '@/components/liked-items-block';

export const MainPageHeaderBlock = () => {
  return (
    <div className='mb-2'>
      <h1 className='text-white text-3xl font-semibold'>Welcome!</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4'>
        <LikedItemsBlock
          img='/images/liked.png'
          name='Liked songs'
          href='/liked'
        />
      </div>
    </div>
  );
}