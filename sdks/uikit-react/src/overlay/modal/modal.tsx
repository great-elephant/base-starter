import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Fade, FadeSlide } from '@uikit-react/animation';
import { useModal } from './modal-context';
import { X } from 'lucide-react';

type ModalSize = 'xs' | 'sm' | 'none';

type ModalProps = PropsWithChildren<{
  title?: React.ReactNode;
  className?: string;

  /**
   * Default: "sm".
   */
  size?: ModalSize;
}>;

const DURATION_IN_MS = 150;
const DURATION_IN_SECOND = DURATION_IN_MS / 1000;

export function Modal({ children, className, size = 'sm' }: ModalProps) {
  const [show, setShow] = useState(false);
  const { modal } = useModal();
  const closeFuncRef = useRef(modal.modalRef.close);
  const { options } = modal;

  useEffect(() => {
    setShow(true);
  }, []);

  useEffect(() => {
    modal.modalRef.close = (data?: unknown) => {
      setShow(false);
      setTimeout(() => {
        closeFuncRef.current?.(data);
      }, DURATION_IN_MS);
    };
  }, [modal.modalRef]);

  return (
    <div className='w-screen h-screen overflow-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 grid items-center justify-center py-8'>
      <Fade
        duration={DURATION_IN_SECOND}
        className='bg-black/20 absolute top-0 right-0 bottom-0 left-0'
        show={show}
      >
        <div onClick={() => !options.disableEsc && modal.modalRef.close()} className='absolute top-0 right-0 bottom-0 left-0' />
      </Fade>

      <FadeSlide
        duration={DURATION_IN_SECOND}
        show={show}
      >
        <div className={clsx(
          'relative bg-white mx-auto shadow-md rounded-lg',
          {
            'min-w-[300px] max-w-[300px] sm:min-w-[380px] sm:max-w-[380px]': size === 'sm',
            'min-w-[300px] max-w-[300px] sm:min-w-[320px] sm:max-w-[320px]': size === 'xs',
          },
          className,
        )}>
          {children}
        </div>
      </FadeSlide>
    </div>
  );
}

type ModalTitleProps = PropsWithChildren<{
  hasCloseBtn?: boolean;
  className?: string;
}>

export function ModalHeader({
  children,
  className,
  hasCloseBtn = true,
}: ModalTitleProps) {
  const { modal } = useModal();

  return (
    <div className='flex justify-between items-center gap-4 px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg'>
      <span className={clsx('font-semibold', className)}>{children}</span>

      {hasCloseBtn && <button onClick={() => modal.modalRef.close()} className='duration-200 min-w-[28px] w-[28px] h-[28px] rounded-md outline-none focus:bg-gray-200 hover:bg-gray-200 flex items-center justify-center' aria-label='Close'>
        <X className='text-gray-600' width={22} height={20} />
      </button>}
    </div>
  );
};

type BodyProps = PropsWithChildren<{
  className?: string;
}>;

export function ModalBody({ children, className }: BodyProps) {
  return (
    <div className={clsx(className, 'p-4')}>{children}</div>
  );
};

type FooterProps = PropsWithChildren<{
  className?: string;
}>;

export function ModalFooter({ children, className }: FooterProps) {
  return (
    <div className={clsx(className, 'p-4')}>{children}</div>
  );
};