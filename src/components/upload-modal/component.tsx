import { useLoading, useUploadModal, useUser } from '@/hooks';
import { Modal } from '@/components/modal';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import toast from 'react-hot-toast';
import uniqid from 'uniqid';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

export const UploadModal = () => {
  const { isLoading, loading, notloading } = useLoading();
  const { isOpen, onClose } = useUploadModal();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null,
    }
  });
  
  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      onClose();
    }
  }
  
  const submitHandler: SubmitHandler<FieldValues> = async (values, event) => {
    try {
      loading();
      console.log(values);
      const imageFile: File = values.image[0];
      const songFile: File = values.song[0];
      
      if (!imageFile || !songFile || !user) {
        toast.error('Missing fields!');
        return;
      }
      
      const uniqueID = uniqid();
      
      const songName = `song-${uniqueID}-${values.title}`;
      const { data: songData, error: songError } = await supabaseClient
        .storage
        .from('songs')
        .upload(songName, songFile, {
          upsert: false,
        });
      if (songError) {
        notloading();
        toast.error('Song upload failed!');
        return;
      }
      
      const imageName = `song-${uniqueID}-${values.title}`;
      const { data: imageData, error: imageError } = await supabaseClient
        .storage
        .from('images')
        .upload(imageName, imageFile, {
          upsert: false,
        });
      if (imageError) {
        notloading();
        toast.error('Image upload failed!');
        return;
      }
      
      const { error } = await supabaseClient
        .from('songs')
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData?.path,
        });
      if (error) {
        notloading();
        toast.error(error.message);
        return;
      }
      router.refresh();
      notloading();
      toast.success('Song successfully uploaded!');
      reset();
      onClose();
    } catch (e) {
      notloading();
      console.log(e);
      toast.error('Something went wrong!');
    }
  }
  
  return (
    <Modal
      isOpen={isOpen}
      description={'Upload an mp3 file'}
      onChange={onChange}
      title={'Add song'}
    >
      <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-y-4'>
        <Input
          id='title'
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder={'Song title'}
        />
        <Input
          id='author'
          disabled={isLoading}
          {...register('author', { required: true })}
          placeholder={'Song author'}
        />
        <div>
          <div className="pb-1">
            Select song file
          </div>
          <Input
            id='song'
            type='file'
            disabled={isLoading}
            accept='.mp3'
            {...register('song', { required: true })}
          />
        </div>
        <div>
          <div className="pb-1">
            Select image
          </div>
          <Input
            id='image'
            type='file'
            disabled={isLoading}
            accept='image/*'
            {...register('image', { required: true })}
          />
        </div>
        <Button disabled={isLoading} type={'submit'}>Create</Button>
      </form>
    </Modal>
  );
}