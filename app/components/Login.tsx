import React, { useState } from 'react';

const LoginPage = () => {
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Login submitted with phone:', phone);
    // Implement actual login logic here
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/2 bg-black p-12 flex flex-col justify-center">
        <h2 className="text-white text-3xl font-bold mb-4">Trade with confidence</h2>
        <p className="text-gray-400 mb-8">Your funds are always backed 1:1 on OKX with our regularly published audits on our Proof of Reserves</p>
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center justify-between text-white mb-4">
            <span>BTC/USDT</span>
            <span>⭐ ↗</span>
          </div>
          <div className="text-green-500 text-4xl font-bold">72,859.8</div>
          <div className="text-green-500">+$72,880.20 +1.97%</div>
          {/* Add more chart details here */}
        </div>
      </div>
      <div className="w-1/2 p-12 flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-8">Log in</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="flex border-b border-gray-300">
              <button className="text-gray-500 px-2">Phone</button>
              <button className="text-gray-500 px-2">Email / Sub-account</button>
              <button className="text-gray-500 px-2">QR code</button>
            </div>
          </div>
          <div className="mb-4">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              className="w-full p-2 border rounded"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
            Next
          </button>
        </form>
        <p className="mt-4 text-center">
          Dont have an account? <a href="#" className="text-blue-600">Sign up</a>
        </p>
        <div className="flex justify-center mt-4">
          <button className="mx-2">Google</button>
          <button className="mx-2">Apple</button>
          <button className="mx-2">Telegram</button>
          <button className="mx-2">Wallet</button>
        </div>
        <p className="text-xs text-center mt-4 text-gray-500">
           All Rights Reserved to Fotis Agro
        </p>
      </div>
    </div>
  );
};

export default LoginPage;