'use client';
import { usePathname, useRouter } from 'next/navigation';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { Button } from '@/components/button';

import { useAuthModal, useUser } from '@/hooks';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { FaUserAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { ReactNode } from 'react';
import { LikedItemsBlock } from '@/components/liked-items-block';

export const Header = () => {
  const router = useRouter();
  const { onOpen } = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const path = usePathname();
  
  const logout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    // TODO: reset all things that are in progress
    router.refresh();
    
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged out!');
    }
  }

  return (
    <div className='h-fit bg-gradient-to-b from-emerald-800 p-6'>
      <div className='w-full mb-4 flex items-center justify-between'>
        <div className='hidden md:flex gap-x-2 items-center'>
          <button
            className='rounded-full bg-black flex items-center justify-between hover:opacity-75 transition'
            onClick={() => router.back()}
          >
            <RxCaretLeft size={35} className={'text-white'}/>
          </button>
          <button
            className='rounded-full bg-black flex items-center justify-between hover:opacity-75 transition'
            onClick={() => router.forward()}
          >
            <RxCaretRight size={35} className={'text-white'}/>
          </button>
        </div>
        <div className='flex items-center md:hidden gap-x-2'>
          <button className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'>
            <HiHome className={'text-black'} size={20} />
          </button>
          <button className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'>
            <BiSearch className={'text-black'} size={20} />
          </button>
        </div>
        <div className='flex items-center justify-between gap-x-4'>
          {!user && <>
            <div><Button className='bg-transparent text-neutral-300 font-medium'>Sign up</Button></div>
            <div><Button className='bg-white px-6 py-2' onClick={onOpen}>Log In</Button></div>
          </>}
          {user && <div className='flex items-center gap-x-4'>
            <div>
              <Button className='bg-white px-6 py-2' onClick={logout}>Log Out</Button>
            </div>
            <div>
              <Button onClick={() => router.push('/account')}><FaUserAlt /></Button>
            </div>
          </div>}
        </div>
      </div>
      {path === '/' && <div className='mb-2'>
        <h1 className='text-white text-3xl font-semibold'>Welcome!</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4'>
          <LikedItemsBlock
            img='/images/liked.png'
            name='Liked songs'
            href='/liked'
          />
        </div>
      </div>}
    </div>
  );
}