import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Ensure form submission is prevented before handling logic
    setError('');

    try {
      const response = await axios.post('/api/auth/signup', { email, password });
      console.log('Signup successful', response.data);

      // Redirect to the login page after successful sign-up
      router.push('/login');
    } catch (error: any) {
      setError(error.response?.data?.message || 'An error occurred during signup.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/2 bg-black p-12 flex flex-col justify-center">
        <h2 className="text-white text-3xl font-bold mb-4">Welcome to Fotis Agro</h2>
      </div>
      <div className="w-1/2 p-12 flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-8">Sign Up</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
