import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/context/authContext';
import { Toaster } from '@/components/ui/sonner';

const poppins = Poppins({
  weight: '500',
  variable: '--font-poppins',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'bags shop',
  description: 'We are selling bags',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col min-h-screen {poppins.variable} antialiased`}
      >
        <main className="flex-grow">
          <AuthProvider>{children}</AuthProvider>
          <Toaster theme="light" />
        </main>
      </body>
    </html>
  );
}
