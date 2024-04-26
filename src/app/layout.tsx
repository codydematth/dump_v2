import type {Metadata} from 'next';
import {Rosario} from 'next/font/google';
import './globals.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const rosario = Rosario({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Mathias Amire',
  description: `An independent Software Engineer web developer based in Nigeria, I seek opportunities where I can use my skills in developing amazing technologies to meet user's needs.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={rosario.className}>
        <ToastContainer />

        {children}
      </body>
    </html>
  );
}
