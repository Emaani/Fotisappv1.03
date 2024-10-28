"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FeedbackForm from '../components/FeedbackForm';

const AdminPage = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated (for example, from session storage)
  useEffect(() => {
    const authStatus = sessionStorage.getItem("isAuthenticated");
    if (authStatus !== "true") {
      router.push("/login"); // Redirect to login if not authenticated
    } else {
      setIsAuthenticated(true); // Allow rendering of the Admin page
    }
  }, [router]);

  if (!isAuthenticated) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      {/* Admin dashboard content */}
      <p>Welcome to the Fotis Agro admin panel.</p>
      <button
        className="bg-red-500 text-white py-2 px-4 rounded mt-4"
        onClick={() => {
          sessionStorage.removeItem("isAuthenticated");
          router.push("/login"); // Log out and redirect to login
        }}
      >
        Log out
      </button>
    </div>
  );
};

export default AdminPage;
