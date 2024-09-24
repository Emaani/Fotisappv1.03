'use client'

import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import Header from './components/Header';
import BackgroundContainer from './components/BackgroundContainer';

const inter = Inter({ subsets: ['latin'] });

// Define hardcodedData here or import it from a shared file
const hardcodedData = [
  { name: 'Soybeans', price: 2500, change: -0.14, changePercentage: -1.32 },
  { name: 'Coffee', price: 13000, change: 1.27, changePercentage: 0.52 },
  { name: 'Maize', price: 900, change: -0.02, changePercentage: -0.41 },
  { name: 'Sesame', price: 6000, change: 0.05, changePercentage: 0.52 },
  { name: 'Sunflower', price: 1300, change: 0.01, changePercentage: 0.52 },
  // ... other commodities
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, toggleTheme } = useTheme();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <BackgroundContainer>
            <div className="app-layout">
              <Header theme={theme} toggleTheme={toggleTheme} marketData={hardcodedData} />
              <main className="container mx-auto p-4">{children}</main>
              <footer className="footer text-center p-4">
                <p>© 2024 Fotis Agro Trading Platform</p>
              </footer>
            </div>
          </BackgroundContainer>
        </ThemeProvider>
      </body>
    </html>
  );
}
