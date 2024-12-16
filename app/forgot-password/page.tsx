'use client';

import React from 'react';


const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const email = event.currentTarget.email.value;

  const response = await fetch('/api/forgot-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    console.error('Failed to submit email');
  } else {
    console.log('Email submitted successfully');
  }
};

export default function ForgotPasswordPage() {
  return (
    <form className="forgot-password-form" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Enter your email"
        className="w-full p-3 mb-4 border rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
        required
      />
      <button
        type="submit"
        className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Submit
      </button>
    </form>
  );
}
