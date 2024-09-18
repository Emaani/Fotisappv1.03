'use client'

import React from 'react';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';
import Logo from '../public/images/logo.png';

interface MarketDataItem {
  name: string;
  price: number;
  change: number;
  changePercentage: number;
}

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  marketData?: MarketDataItem[];
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, marketData = [] }) => {
  return (
    <header className={`p-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image
            src={Logo}
            alt="Fotis Agro Logo"
            width={70}
            height={50}
            className="object-contain"
          />
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            
          </h1>
        </div>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
      {marketData.length > 0 && (
        <div className="mt-4 overflow-hidden">
          <div className="whitespace-nowrap animate-marquee">
            {[...marketData, ...marketData].map((item, index) => (
              <span key={index} className="inline-block mx-4">
                <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  {item.name}
                </span>
                <span className={`ml-2 ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {item.price.toFixed(2)} ({item.changePercentage.toFixed(2)}%)
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;