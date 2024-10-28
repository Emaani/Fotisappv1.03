
//app/ProfileSetup/page.tsx

"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  profilePicture: File | null;
}

interface ProfileSetupPageProps {
  userId: number;
}

const ProfileSetupPage: React.FC<ProfileSetupPageProps> = ({ userId }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: "",
    profilePicture: null,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, profilePicture: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("userId", userId.toString());

      // Append all form fields except profilePicture
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && key !== "profilePicture") {
          formDataToSend.append(key, value.toString());
        }
      });

      // Append profile picture if exists
      if (formData.profilePicture) {
        formDataToSend.append("profilePicture", formData.profilePicture);
      }

      await axios.post("/api/profile/setup", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      router.push("/TradeCommodities");
    } catch (err) {
      console.error("Profile setup failed:", err);
      setError("Failed to complete profile setup. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderProfilePicture = () => (
    <div className="flex flex-col items-center mb-6">
      <p className="text-sm text-gray-600 mb-2">Upload Profile Picture</p>
      <div className="relative h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="Profile preview"
            fill
            className="rounded-full object-cover"
          />
        ) : (
          <span className="text-sm text-gray-400">No image</span>
        )}
      </div>
      <label className="mt-2 cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
        Change Photo
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );

  const renderFormField = (
    name: keyof FormData,
    placeholder: string,
    type: string = "text",
    required: boolean = false
  ) => (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      value={formData[name]?.toString() || ""}
      onChange={handleInputChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
    />
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Complete Your Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {renderProfilePicture()}

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {renderFormField("firstName", "First Name", "text", true)}
                {renderFormField("lastName", "Last Name", "text", true)}
              </div>
              {renderFormField("phoneNumber", "Phone Number", "tel", true)}
              {renderFormField("address", "Address")}
              <div className="grid grid-cols-2 gap-4">
                {renderFormField("city", "City")}
                {renderFormField("country", "Country")}
              </div>
            </div>

            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            
            <div className="space-y-4">
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Complete Profile Setup"}
              </button>
              
              <div className="text-center">
                <Link 
                  href="/Login"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Already have an account? Log in
                </Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ProfileSetupPage;