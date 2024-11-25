"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaGoogle, FaFacebook } from "react-icons/fa";

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpPage = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    const { email, password, confirmPassword } = formData;

    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return false;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post("/api/auth/signup", {
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      localStorage.setItem("userId", response.data.userId);
      router.push("/ProfileSetup");
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider: "google" | "facebook") => {
    console.log(`${provider} signup clicked`);
    // Implement social sign-up logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-bold text-gray-900 mb-2">
          Welcome to Fotis Agro
        </h1>
        <p className="text-center text-gray-600 mb-8">
          The harvest is plenty, the Labourers are few.
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <InputField
              id="email"
              name="email"
              type="email"
              label="Email address"
              value={formData.email}
              onChange={handleInputChange}
            />
            <InputField
              id="password"
              name="password"
              type="password"
              label="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <InputField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />

            {error && <div className="text-red-600 text-sm text-center">{error}</div>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <SocialSignupButtons handleSocialSignup={handleSocialSignup} />

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/Login" className="font-medium text-blue-600 hover:text-blue-500">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const InputField = ({
  id,
  name,
  type,
  label,
  value,
  onChange,
}: {
  id: string;
  name: string;
  type: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
      required
    />
  </div>
);

const SocialSignupButtons = ({
  handleSocialSignup,
}: {
  handleSocialSignup: (provider: "google" | "facebook") => void;
}) => (
  <div className="mt-6">
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-white text-gray-500">Or continue with</span>
      </div>
    </div>

    <div className="mt-6 grid grid-cols-2 gap-3">
      <button
        onClick={() => handleSocialSignup("google")}
        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
      >
        <FaGoogle className="h-5 w-5 text-red-500" />
        <span className="ml-2">Google</span>
      </button>
      <button
        onClick={() => handleSocialSignup("facebook")}
        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
      >
        <FaFacebook className="h-5 w-5 text-blue-600" />
        <span className="ml-2">Facebook</span>
      </button>
    </div>
  </div>
);

export default SignUpPage;
