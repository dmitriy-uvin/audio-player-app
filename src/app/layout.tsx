import './globals.css';
import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import { ReactNode } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { ModalProvider, SupabaseProvider, ToastProvider, UserProvider } from '@/providers';
import { getOwnSongs } from '@/requests';
import { Player } from '@/components/player';

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify',
  description: 'Listen to music!',
}

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const ownSongs = await getOwnSongs();
  
  return (
    <html lang="en">
      <body className={font.className}>
      <ToastProvider />
      <SupabaseProvider>
        <UserProvider>
          <ModalProvider />
          <div className='flex flex-row h-full'>
            <Sidebar songs={ownSongs} />
            <main className="h-full flex-1 overflow-y-auto p-2 pl-0">
              <div className='bg-neutral-900 h-full w-full overflow-y-auto overflow-hidden rounded-lg'>
                <Header />
                <div className='px-6'>
                  {children}
                </div>
              </div>
            </main>
          </div>
          <Player />
        </UserProvider>
      </SupabaseProvider>
      </body>
    </html>
  )
}
