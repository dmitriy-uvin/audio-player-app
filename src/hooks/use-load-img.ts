import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Song } from '@/types';

export const useLoadImg = (song: Song): null|string => {
  const supabaseClient = useSupabaseClient();
  if (!song) {
    return null;
  }
  const { data: imageData } = supabaseClient
    .storage
    .from('images')
    .getPublicUrl(song.image_path);
  
  return imageData.publicUrl;
}