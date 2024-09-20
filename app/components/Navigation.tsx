import React from 'react';
import Link from 'next/link';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Fotis Commodities</div>
        <div>
          <Link href="/signup" className="mr-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Sign Up
          </Link>
          <Link href="/login" className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black">
            Log In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;