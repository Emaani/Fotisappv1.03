import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState(''); // Added password field for login
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/auth/login', { phone, password });
      setSuccessMessage('Login successful!');
      console.log('Login successful:', res.data);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Error logging in');
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/2 bg-black p-12 flex flex-col justify-center">
        <h2 className="text-white text-3xl font-bold mb-4">Trade with confidence</h2>
        <p className="text-gray-400 mb-8">The Harvest is plenty but the Labourers are few</p>
        <div className="bg-gray-900 rounded-lg p-4">
          {/* Add market details here */}
        </div>
      </div>
      <div className="w-1/2 p-12 flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-8">Log in</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
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
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
            Log in
          </button>
        </form>
        <p className="mt-4 text-center">
          Dont have an account? <a href="/signup" className="text-blue-600">Sign up</a>
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
