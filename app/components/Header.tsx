'use client'

import React from 'react';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';
import { useTheme } from './ThemeContext'; // Import your theme context
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa'; // Import icons
import Logo from '../../public/images/logo.png'; // path to logo
import Link from 'next/link';


<Link href="/signup" className="text-white">Sign Up</Link>

interface MarketDataItem {
  name: string;
  price: number;
  change: number;
  changePercentage: number;
}

interface HeaderProps {
  marketData?: MarketDataItem[];
}

const Header: React.FC<HeaderProps> = ({ marketData = [] }) => {
  const { theme, toggleTheme } = useTheme(); // Access theme and toggleTheme from context

  return (
    <header className={`p-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Section: Logo */}
        <div className="flex items-center space-x-4">
          <Image
            src={Logo}
            alt="Fotis Agro Logo"
            width={60}
            height={45}
            className="object-contain"
          />
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            {/* Title can be added here if needed */}
          </h1>
        </div>

        {/* Right Section: Buttons and Theme Toggle */}
        <div className="flex items-center space-x-4 ml-auto">
          {/* Buy Commodities Button */}
          <button
            className="

              font-sans text-xs font-semibold h-10 
              rounded-md px-4 text-gray-300 bg-black 
              hover:bg-gray-800 hover:text-gray-500
              shadow-lg focus:outline-none transition-all
            "
          >
            Buy Commodities
          </button>

          {/* Sign Up Button */}
          <button
            className="
              font-sans text-sm font-semibold h-10 
              rounded-md px-4 text-gray-300 bg-black 
              hover:bg-gray-800 hover:text-gray-500
              shadow-lg focus:outline-none transition-all
              flex items-center space-x-2
            "
          >
            <FaUserPlus /> {/* Icon for sign up */}
            <span>Sign Up</span>
          </button>

          {/* Log In Button */}
          <button
            className="
              font-sans text-sm font-semibold h-10 
              rounded-md px-4 text-gray-300 bg-black 
              hover:bg-gray-800 hover:text-gray-500
              shadow-lg focus:outline-none transition-all
              flex items-center space-x-2
            "
          >
            <FaSignInAlt /> {/* Icon for log in */}
            <span>Log In</span>
          </button>

          {/* Theme Toggle */}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>

      {/* Market Data Marquee */}
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
