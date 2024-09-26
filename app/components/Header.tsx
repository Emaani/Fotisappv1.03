'use client';

import React from 'react';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';
import { useTheme } from './ThemeContext'; // Import your theme context
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa'; // Import icons
import Logo from '../../public/images/logo.png'; // path to logo
import Link from 'next/link'; // Import Link for routing

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
    <header
      className={`sticky top-0 z-50 p-4 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      } shadow-md`} // Apply sticky, top-0 and z-50 to keep it at the top of the page
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Section: Logo */}
        <div className="flex items-center space-x-4">
          <Image
            src={Logo}
            alt="Fotis Agro Logo"
            width={70}
            height={55}
            className="object-contain"
          />
        </div>

        {/* Right Section: Buttons and Theme Toggle */}
        <div className="flex items-center space-x-4 ml-auto">
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

          <Link href="/signup">
            <button
              className="
                font-sans text-sm font-semibold h-10 
                rounded-md px-4 text-gray-300 bg-black 
                hover:bg-gray-800 hover:text-gray-500
                shadow-lg focus:outline-none transition-all
                flex items-center space-x-2
              "
            >
              <FaUserPlus /> <span>Sign Up</span>
            </button>
          </Link>

          <Link href="/Login"> {/* Wrap the button with Link */}
            <button
              className="
                font-sans text-sm font-semibold h-10 
                rounded-md px-4 text-gray-300 bg-black 
                hover:bg-gray-800 hover:text-gray-500
                shadow-lg focus:outline-none transition-all
                flex items-center space-x-2
              "
            >
              <FaSignInAlt /> <span>Log In</span>
            </button>
          </Link>

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
