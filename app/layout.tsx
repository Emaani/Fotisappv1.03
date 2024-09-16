'use client'

import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from './components/ThemeContext';
import Header from './components/Header';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <div className="app-layout">
            <Header />
            <main className="container mx-auto p-4">{children}</main>
            <footer className="footer text-center p-4">
              <p>© 2024 Fotis Agro Trading Platform</p>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}