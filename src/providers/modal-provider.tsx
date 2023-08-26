'use client'
import { useEffect, useState } from 'react';
import { AuthModal } from '@/components/auth-modal';
import { UploadModal } from '@/components/upload-modal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return null;
  }
  
  return (
    <>
      <AuthModal />
      <UploadModal />
    </>
  );
}