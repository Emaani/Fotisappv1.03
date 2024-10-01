import { useRouter } from 'next/router';
import { useState } from 'react';

const LoginPage = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    // Your login logic here
    console.log('Login button clicked'); // Debugging line
    // Simulate successful login for testing
    const success = true; // Replace with actual login logic
    if (!success) {
      setError('Login failed. Please try again.'); // Set error message
    } else {
      setError(null); // Clear error on successful login
      router.push('/dashboard'); // Ensure this is the correct path
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin(); // Call handleLogin on form submit
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/2 bg-black p-12 flex flex-col justify-center">
        <h2 className="text-white text-3xl font-bold mb-4">Welcome Back!</h2>
      </div>
      <div className="w-1/2 p-12 flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-8">Log In</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              placeholder="Enter email"
              className="w-full p-2 border rounded"
              style={{ color: 'black', backgroundColor: 'white' }} // Ensures visible input
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              placeholder="Enter password"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button 
            type="submit"  // Changed to "submit" to properly handle form submission
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
