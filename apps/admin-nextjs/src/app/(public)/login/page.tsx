import { Metadata } from 'next';
import { Text, Heading } from '@sdks/uikit-react';
import { FormLogin } from './form-login';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.',
};

export default function AuthenticationPage() {
  return (
    <div className='relative h-screen md:max-h-screen flex flex-row items-center justify-center '>
      <div className='w-full relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
        <div className='absolute inset-0 bg-zinc-900' />
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='mr-2 h-6 w-6'
          >
            <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
          </svg>
          <Text size='lg'>Yolo Inc</Text>
        </div>
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <Text size='lg'>
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than
              ever before.&rdquo;
            </Text>
            <Text size='sm'>Sofia Davis</Text>
          </blockquote>
        </div>
      </div>

      <div className='w-full p-4'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <Heading className='font-semibold tracking-tight'>
              Sign-in to Admin
            </Heading>
          </div>

          <FormLogin />
        </div>
      </div>
    </div>
  );
}