import { LikeButtonProps } from '@/components/like-button/types';
import { useRouter } from 'next/navigation';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useAuthModal, useUser } from '@/hooks';
import { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import toast from 'react-hot-toast';

export const LikeButton = ({ id }: LikeButtonProps) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const authModal = useAuthModal();
  const { user } = useUser();
  
  const [isLiked, setIsLiked] = useState(false);
  
  useEffect(() => {
    if (!user?.id) {
      return;
    }
    
    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from('liked_songs')
        .select('*')
        .eq('user_id', user.id)
        .eq('song_id', id)
        .single();
      if (!error && data) {
        setIsLiked(true);
      }
    }
    fetchData()
  }, [id, supabaseClient, user?.id]);
  
  const clickHandler = async () => {
    if (!user) {
      return authModal.onOpen();
    }
    if (isLiked) {
      const { error } = await supabaseClient
        .from('liked_songs')
        .delete()
        .eq('user_id', user.id)
        .eq('song_id', id);
      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
      }
    } else if (!isLiked) {
      const { error } = await supabaseClient
        .from('liked_songs')
        .insert({
          song_id: id,
          user_id: user.id,
        });
      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success('Liked');
      }
    }
    router.refresh();
  }
  
  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <div className='cursor-pointer text-xl' onClick={clickHandler}>
      <Icon color={isLiked ? '#ff0040' : 'white'} size={25} />
    </div>
  );
}
