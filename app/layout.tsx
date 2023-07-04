import getAllPosts from './actions/getAllPosts';
import getCurrentUser from './actions/getCurrentUser';
import ClientOnly from './components/ClientOnly';
import Footer from './components/footer/Footer';
import LoginModal from './components/modals/LoginModal';
import ProfileModal from './components/modals/ProfileModal';
import RegisterModal from './components/modals/RegisterModal';
import Navbar from './components/navbar/Navbar';
import Posts from './components/posts/Posts';
import ToasterProvider from './components/providers/ToasterProvider';
import './globals.css'
import { Roboto } from 'next/font/google';

export const metadata = {
  title: 'Dambel Estates',
  description: 'Dambel Estates home page',
}

const font = Roboto({
  subsets: ['latin'],
  weight: ['400']
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser()

  

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <ProfileModal/>
          <Navbar currentUser={currentUser}/>
        </ClientOnly>

        {children}

        </body>
    </html>
  )
}
