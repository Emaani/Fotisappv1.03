"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Ensure correct import

const LoginPage = () => {
  const router = useRouter(); // This should work if the component is a Client Component
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null); // Define error state

  const handleLogin = async () => {
    const { username, password } = credentials; // Extract username and password
    console.log('Login button clicked', { username, password }); // Debugging log
    // ... perform login logic with username and password ...
    try {
      // Assume login logic here
      // If login fails, set the error
      throw new Error('Login failed'); // Simulating a login failure
    } catch (err: unknown) { // Specify the type of err
      if (err instanceof Error) { // Check if err is an instance of Error
        setError(err.message); // Update error state on failure
      } else {
        setError('An unknown error occurred'); // Handle unknown error
      }
    }
    // After successful login
    router.push('/dashboard'); // Navigate to dashboard
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { // Define handleSubmit
    e.preventDefault(); // Prevent default form submission
    handleLogin(); // Call handleLogin on form submit
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/2 bg-[#111826] p-12 flex flex-col justify-center items-center"> {/* Added items-center */}
        <h2 style={{ color: '#9ABF49' }} className="text-white text-3xl font-bold mb-4 text-center">Welcome Back!</h2> {/* Added text-center class */}
      </div>
      <div className="w-1/2 p-12 flex flex-col justify-center">
        <h1 style={{ color: '#9ABF49' }} className="text-3xl font-bold mb-8 text-black">Log In</h1> {/* Added text-black class */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              value={credentials.username} // Update to use credentials
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} // Update to set username
              placeholder="Enter email"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={credentials.password} // Update to use credentials
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} // Update to set password
              placeholder="Enter password"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded" onClick={handleLogin}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;