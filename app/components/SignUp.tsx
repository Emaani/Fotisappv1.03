import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/api/auth/signup', { email, password });
      console.log('Signup successful', response.data);
      
      // Redirect to the login page or directly log the user in
      router.push('/login');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during signup.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/2 bg-black p-12 flex flex-col justify-center">
        {/* ... (previous content remains the same) ... */}
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
        <p className="mt-4 text-center">
          Already have an account? <a href="/login" className="text-blue-600">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;