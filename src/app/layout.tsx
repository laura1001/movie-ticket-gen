import type { Metadata } from 'next';
import { Inter, Playfair_Display, Montserrat, Oswald, Bebas_Neue } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic']
});
const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal']
});
const oswald = Oswald({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal']
});

const bebasNeue = Bebas_Neue({ 
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal']
});

export const metadata: Metadata = {
  title: '电影票根生成器',
  description: '生成个性化电影票根',
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className={montserrat.className}>
        {children}
      </body>
    </html>
  );
}