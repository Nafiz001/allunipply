"use client";

import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const OTPVerificationPage = () => {
  const router = useRouter();
  const [otp, setOtp] = useState('');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('OTP submitted:', otp);
    // Handle OTP verification logic here
  };

  return (
    <div className="h-screen bg-white overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        {/* Left Side - Form */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12">
          {/* Logo */}
          <Link href="/" className="mb-12">
            <div className="flex items-center gap-2">
              <span className="text-2xl md:text-3xl font-bold text-gray-900">all</span>
              <div className="w-8 h-8 bg-[#E3572B] rounded-full flex items-center justify-center">
                <span className="text-white text-xl">U</span>
              </div>
              <span className="text-2xl md:text-3xl font-bold text-gray-900">nipply</span>
            </div>
          </Link>

          {/* Form */}
          <div className="max-w-md">
            <h1 className="text-4xl md:text-5xl font-bold text-[#E3572B] mb-3 font-outfit">
              Create Account
            </h1>
            <p className="text-gray-700 mb-8 font-outfit">
              A OTP code has been send to your number or email.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 font-outfit">
              OTP Verification
            </h2>
            <p className="text-gray-500 text-sm mb-6 font-outfit">
              Code is valid for 01:59
            </p>

            {/* OTP Input */}
            <form onSubmit={handleVerify}>
              <div className="mb-8">
                <input
                  type="text"
                  placeholder="ID 01 09"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-outfit focus:outline-none focus:border-[#E3572B] transition-colors text-lg tracking-widest"
                />
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                className="w-full py-4 bg-[#E3572B] text-white rounded-lg font-outfit font-semibold text-lg hover:bg-[#c24d2b] transition-all"
              >
                Verify
              </button>
            </form>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF4EA] to-[#FFE5D9] p-12 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-12 right-12 w-3 h-3 bg-[#E3572B] rounded-full"></div>
          <div className="absolute bottom-32 left-12 w-3 h-3 bg-[#E3572B] rounded-full"></div>
          <div className="absolute top-32 left-32 w-3 h-3 bg-[#FF8B22] rounded-full"></div>
          <div className="absolute bottom-24 right-24 w-3 h-3 bg-[#FF8B22] rounded-full"></div>
          <div className="absolute top-6 left-1/4 w-2 h-2 bg-[#E3572B] rounded-full"></div>
          <div className="absolute top-1/3 right-32 w-2 h-2 bg-[#FF8B22] rounded-full"></div>

          {/* Feature badges */}
          <div className="absolute top-16 left-8 bg-[#FFD4B8] rounded-2xl p-4 shadow-lg">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-2">
              <span className="text-2xl">📄</span>
            </div>
            <p className="text-xs font-outfit font-semibold text-gray-700">Smooth<br />Application<br />Process</p>
          </div>

          <div className="absolute top-12 right-8 bg-[#B8E6FF] rounded-2xl p-4 shadow-lg">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-2">
              <span className="text-2xl">🌍</span>
            </div>
            <p className="text-xs font-outfit font-semibold text-gray-700">Worldwide<br />Universities</p>
          </div>

          <div className="absolute bottom-24 left-8 bg-[#FFE4B8] rounded-2xl p-4 shadow-lg">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-2">
              <span className="text-2xl">💰</span>
            </div>
            <p className="text-xs font-outfit font-semibold text-gray-700">Scholarship<br />Support</p>
          </div>

          <div className="absolute bottom-16 right-8 bg-[#B8FFE6] rounded-2xl p-4 shadow-lg">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-2">
              <span className="text-2xl">✍️</span>
            </div>
            <p className="text-xs font-outfit font-semibold text-gray-700">Contract<br />Writing</p>
          </div>

          {/* Laptop Illustration */}
          <div className="relative z-10 mb-12">
            <div className="w-[500px] h-[300px] relative">
              <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-900 rounded-t-2xl shadow-2xl">
                {/* Screen */}
                <div className="absolute top-3 left-3 right-3 bottom-3 bg-white rounded-lg overflow-hidden">
                  {/* Browser bar */}
                  <div className="h-8 bg-[#7CB5CC] flex items-center px-3 gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-6">
                    <div className="h-16 bg-[#FFB27D] rounded-lg mb-4"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="h-3 bg-[#E8B4CE] rounded"></div>
                        <div className="h-3 bg-[#E8B4CE] rounded"></div>
                        <div className="h-3 bg-[#E8B4CE] rounded"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-[#E8B4CE] rounded"></div>
                        <div className="h-3 bg-[#E8B4CE] rounded"></div>
                        <div className="h-3 bg-[#E8B4CE] rounded"></div>
                      </div>
                    </div>
                  </div>
                  {/* Gear overlay */}
                  <div className="absolute left-4 top-16 w-16 h-16 bg-[#FFB4D1] rounded-full flex items-center justify-center">
                    <span className="text-3xl">⚙️</span>
                  </div>
                </div>
              </div>
              {/* Keyboard */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-[520px] h-3 bg-gradient-to-b from-gray-700 to-gray-900 rounded-b-2xl"></div>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-outfit text-center">
            Introducing allunipply
          </h2>
          <p className="text-gray-600 font-outfit text-center max-w-md">
            Streamline Your University Applications – One Submission,<br />
            Multiple Choices. 🎓
          </p>

          {/* Dots indicator */}
          <div className="flex gap-2 mt-8">
            <div className="w-3 h-3 bg-[#E3572B] rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
