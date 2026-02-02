"use client";

import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const SignInPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate credentials here if needed
    router.push('/dashboard');
  };

  return (
    <div className="max-h-screen bg-white ">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        {/* Left Side - Form */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12">
          {/* Logo */}
          <Link href="/" className="mb-12">
            <Image src="/icons/logo.png" alt="allunipply logo" width={216} height={84} className="object-contain" />
          </Link>

          {/* Form */}
          <div className="max-w-md">
            <h1 className="text-4xl md:text-5xl font-bold text-[#E3572B] mb-3 font-outfit">
              Get Started
            </h1>
            <p className="text-gray-700 mb-8 font-outfit">
              Welcome! We're thrilled to have you
            </p>

            {/* Email Input */}
            <div className="mb-6">
              <label className="block text-gray-900 font-semibold mb-2 font-outfit">
                Email
              </label>
              <input
                type="email"
                placeholder="hello@skyline.co"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-outfit focus:outline-none focus:border-[#E3572B] transition-colors"
              />
            </div>

            {/* Password Input */}
            <div className="mb-2">
              <label className="block text-gray-900 font-semibold mb-2 font-outfit">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-outfit focus:outline-none focus:border-[#E3572B] transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right mb-8">
              <Link href="/forgot-password" className="text-[#E3572B] text-sm font-outfit hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button 
              type="button"
              onClick={handleSignIn}
              className="w-full py-4 bg-[#E3572B] text-white rounded-full font-outfit font-semibold text-lg hover:bg-[#c24d2b] transition-all mb-4"
            >
              Sign in
            </button>

            {/* Create Account Button */}
            <Link href="/sign-up">
              <button className="w-full py-4 bg-[#E3572B] text-white rounded-full font-outfit font-semibold text-lg hover:bg-[#c24d2b] transition-all mb-6">
                Create Account
              </button>
            </Link>

            {/* Google Sign In */}
            <button className="w-full py-3 border-2 border-gray-200 rounded-full font-outfit font-semibold text-gray-700 hover:border-[#E3572B] transition-all flex items-center justify-center gap-3 mb-8">
              <Image src="/icons/google.png" alt="Google" width={20} height={20} />
              Google
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-gray-600 font-outfit">
              Don't have an account yet?{' '}
              <Link href="/sign-up" className="text-[#E3572B] font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="hidden lg:flex flex-col items-center justify-center p-12 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-12 right-12 w-3 h-3 bg-[#E3572B] rounded-full"></div>
          <div className="absolute bottom-32 left-12 w-3 h-3 bg-[#E3572B] rounded-full"></div>
          <div className="absolute top-32 left-32 w-3 h-3 bg-[#FF8B22] rounded-full"></div>
          <div className="absolute bottom-24 right-24 w-3 h-3 bg-[#FF8B22] rounded-full"></div>

          {/* Feature badges */}
          <div className="absolute top-24 left-12 bg-[#FFD4B8] rounded-2xl p-4 shadow-lg">
            <div className="w-12 h-12  rounded-xl flex items-center justify-center mb-2">
              <Image 
                src="/icons/smooth.png" 
                alt="Streamline Icon" 
                width={45} 
                height={45}
              ></Image>
            </div>
            <p className="text-xs font-outfit font-semibold text-gray-700">Smooth<br />Application<br />Process</p>
          </div>

          <div className="absolute top-32 right-12 bg-[#B8E6FF] rounded-2xl p-4 shadow-lg">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-2">
              <Image 
                src="/icons/wwu.png" 
                alt="Streamline Icon" 
                width={45} 
                height={45}
              ></Image>
            </div>
            <p className="text-xs font-outfit font-semibold text-gray-700">Worldwide<br />Universities</p>
          </div>

          <div className="absolute bottom-32 left-12 bg-[#FFE4B8] rounded-2xl p-4 shadow-lg">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-2">
              <Image 
                src="/icons/rupee.png" 
                alt="Streamline Icon" 
                width={45} 
                height={45}
              ></Image>
            </div>
            <p className="text-xs font-outfit font-semibold text-gray-700">Scholarship</p>
          </div>

          <div className="absolute bottom-24 right-12 bg-[#B8FFE6] rounded-2xl p-4 shadow-lg">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-2">
              <Image 
                src="/icons/cv.png" 
                alt="Streamline Icon" 
                width={100} 
                height={100}
              ></Image>
            </div>
            <p className="text-xs font-outfit font-semibold text-gray-700">SCP/CV<br />Writing</p>
          </div>

          {/* Laptop Illustration */}
          <div className="relative z-10 mb-12 left-15 top-20">
            <Image src="/icons/laptop.png" alt="Laptop Illustration" width={600} height={400}>

            </Image>
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

export default SignInPage;
