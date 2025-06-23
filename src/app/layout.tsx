import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const roboto = Geist({
  variable: '--font-roboto',
  subsets: ['latin', 'latin-ext'],
});


const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'THPTQG Countdown - Đếm Ngược Thi Tốt Nghiệp',
  description: 'Ứng dụng đếm ngược thời gian thi tốt nghiệp THPTQG với tin nhắn động viên và dự đoán điểm chuẩn đại học.',
  keywords: ['THPTQG', 'thi tốt nghiệp', 'đếm ngược', 'điểm chuẩn đại học', 'Vietnam', 'graduation exam'],
  authors: [{ name: 'THPTQG Countdown Team' }],
  creator: 'THPTQG Countdown',
  publisher: 'THPTQG Countdown',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icon', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-icon', sizes: '180x180', type: 'image/png' }
    ],
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#3b82f6',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${roboto.variable} ${geistMono.variable} antialiased font-sans`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
