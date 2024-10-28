"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "./ThemeContext"; // For light/dark mode support

const LoginPage = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);

    // Simulating an authentication check
    const { email, password } = credentials;
    if (email === "admin@fotis.com" && password === "admin123") {
      // Storing login state in session storage
      sessionStorage.setItem("isAuthenticated", "true");
      router.push("/admin"); // Redirecting to the AdminPage upon successful login
    } else {
      setError("Invalid email or password.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(); // Handle the login logic when the form is submitted
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <div className={`max-w-md w-full space-y-8 p-10 ${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl shadow-md`}>
        <h2 className="mt-6 text-center text-3xl font-extrabold">Sign in to your account</h2>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${theme === "dark" ? "border-gray-700 bg-gray-700" : "border-gray-300"} placeholder-gray-500 text-gray-900 rounded-t-md`}
                placeholder="Email address"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${theme === "dark" ? "border-gray-700 bg-gray-700" : "border-gray-300"} placeholder-gray-500 text-gray-900 rounded-b-md`}
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white ${theme === "dark" ? "bg-indigo-600" : "bg-indigo-600"} hover:bg-indigo-700`}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
