import { ModalProps } from '@/components/modal/types';
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle
} from '@radix-ui/react-dialog';
import { IoMdClose } from 'react-icons/io';

export const Modal = ({ isOpen, onChange, title, description = '', children = null }: ModalProps) => {
  return (
    <Dialog open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <DialogPortal>
        <DialogOverlay className='bg-neutral-900/90 backdrop-blur-sm fixed inset-0' />
        <DialogContent
          className='
            fixed
            drop-shadow-md
            border
            border-neutral-700
            top-[50%]
            left-[50%]
            max-h-full
            h-full
            md:h-auto
            md:max-h-[85vh]
            w-full
            md:w-[90vw]
            md:max-w-[450px]
            translate-x-[-50%]
            translate-y-[-50%]
            rounded-md
            bg-neutral-800
            p-5
            focus:outline-none
          '
        >
          <DialogTitle className='text-xl text-white text-center font-bold mb-4'>{title}</DialogTitle>
          {description &&
            <DialogDescription className='mb-5 text-sm leading-normal text-center'>{description}</DialogDescription>
          }
          {!!children && <div>{children}</div>}
          <DialogClose asChild>
            <button className='
              text-neutral-400
              hover:text-white
              absolute
              top-[10px]
              right-[10px]
              inline-flex
              h-[25px]
              w-[25px]
              appearance-none
              items-center
              justify-center
              rounded-full
              focus:outline-none
            '><IoMdClose/></button>
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}