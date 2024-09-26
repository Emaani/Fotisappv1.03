"use client"

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
  const [email, setEmail] = useState(''); // Added initial state for email
  const [password, setPassword] = useState(''); // Added initial state for password
  const [error, setError] = useState(''); // Added initial state for error
  const router = useRouter(); // Call useRouter directly

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/api/auth/signup', { email, password });
      console.log('Signup successful', response.data);
      router.push('/login'); // Use router here
    } catch (error: any) {
      setError(error.response?.data?.message || 'An error occurred during signup.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/2 bg-[#111826] p-12 flex flex-col justify-center">
        <h2 style={{ color: '#9ABF49' }} className="text-3xl font-bold mb-4 text-center">Welcome to Fotis Agro</h2>
        <p className="text-white text-center">The harvest is plenty, the Labourers are few.</p>
      </div>
      <div className="w-1/2 p-12 flex flex-col justify-center">
        <h1 style={{ color: '#9ABF49' }} className="text-4xl font-bold mb-8 text-center">Sign Up</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full p-2 border rounded text-gray-800" // Added text color
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full p-2 border rounded text-gray-800" // Added text color
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
            Create Account
          </button>
          <div className="mt-4 flex justify-center">
            <button className="bg-red-600 text-white py-2 px-4 rounded mx-2">
              Login with Google
            </button>
            <button className="bg-blue-800 text-white py-2 px-4 rounded mx-2">
              Login with Facebook
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
