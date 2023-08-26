import { create } from 'zustand';

interface UploadModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useUploadModal = create<UploadModalProps>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false, }),
  onOpen: () => set({ isOpen: true, })
}))