import { Modal } from '@/components/modal';
import { useAuthModal } from '@/hooks';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useEffect } from 'react';

export const AuthModal = () => {
  const { isOpen, onOpen, onClose } = useAuthModal();
  const sClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  
  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [router, onClose, session]);
  
  return (
    <Modal
      isOpen={isOpen}
      onChange={(value: boolean) => value ? 1 : onClose()}
      title={'Welcome!'}
      description={'Log in into your account!'}
    >
      <Auth
        providers={['google', 'github']}
        magicLink
        theme={'dark'}
        supabaseClient={sClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e'
              }
            }
          }
        }}
      />
    </Modal>
  );
}