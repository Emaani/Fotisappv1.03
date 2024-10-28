"use client";

import React, { useState } from "react";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Feedback submitted:", feedback);
    setFeedback(""); // Clear feedback field
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold">Provide Feedback</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter your feedback here..."
          className="w-full p-4 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
