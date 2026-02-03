"use client";

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const SignInPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = ['/icons/laptop.png', '/icons/slider2.png', '/icons/slider3.png'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate credentials here if needed
    router.push('/dashboard');
  };

  return (
    <div className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen lg:h-screen">
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
        <div className="hidden lg:flex flex-col items-center justify-center p-4 md:p-8 lg:p-12 relative overflow-hidden bg-gray-50">
          {/* Decorative circles - hide on very small screens */}
          <div className="hidden md:block absolute top-12 right-12 w-2 h-2 md:w-3 md:h-3 bg-[#E3572B] rounded-full"></div>
          <div className="hidden md:block absolute bottom-32 left-12 w-2 h-2 md:w-3 md:h-3 bg-[#E3572B] rounded-full"></div>
          <div className="hidden md:block absolute top-32 left-32 w-2 h-2 md:w-3 md:h-3 bg-[#FF8B22] rounded-full"></div>
          <div className="hidden md:block absolute bottom-24 right-24 w-2 h-2 md:w-3 md:h-3 bg-[#FF8B22] rounded-full"></div>

          {/* Feature badges - responsive sizing */}
          <div className="absolute top-12 md:top-24 left-4 md:left-12 bg-[#FFD4B8] rounded-xl md:rounded-2xl p-2 md:p-4 shadow-lg z-20">
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center mb-1 md:mb-2">
              <Image 
                src="/icons/smooth.png" 
                alt="Streamline Icon" 
                width={45} 
                height={45}
                className="w-6 h-6 md:w-10 md:h-10"
              ></Image>
            </div>
            <p className="text-[10px] md:text-xs font-outfit font-semibold text-gray-700">Smooth<br />Application<br />Process</p>
          </div>

          <div className="absolute top-16 md:top-32 right-4 md:right-12 bg-[#B8E6FF] rounded-xl md:rounded-2xl p-2 md:p-4 shadow-lg z-20">
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center mb-1 md:mb-2">
              <Image 
                src="/icons/wwu.png" 
                alt="Streamline Icon" 
                width={45} 
                height={45}
                className="w-6 h-6 md:w-10 md:h-10"
              ></Image>
            </div>
            <p className="text-[10px] md:text-xs font-outfit font-semibold text-gray-700">Worldwide<br />Universities</p>
          </div>

          <div className="hidden md:block absolute bottom-32 left-12 bg-[#FFE4B8] rounded-xl md:rounded-2xl p-2 md:p-4 shadow-lg">
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center mb-1 md:mb-2">
              <Image 
                src="/icons/rupee.png" 
                alt="Streamline Icon" 
                width={45} 
                height={45}
                className="w-6 h-6 md:w-10 md:h-10"
              ></Image>
            </div>
            <p className="text-[10px] md:text-xs font-outfit font-semibold text-gray-700">Scholarship</p>
          </div>

          <div className="hidden md:block absolute bottom-24 right-12 bg-[#B8FFE6] rounded-xl md:rounded-2xl p-2 md:p-4 shadow-lg">
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center mb-1 md:mb-2">
              <Image 
                src="/icons/cv.png" 
                alt="Streamline Icon" 
                width={100} 
                height={100}
                className="w-6 h-6 md:w-10 md:h-10"
              ></Image>
            </div>
            <p className="text-[10px] md:text-xs font-outfit font-semibold text-gray-700">SCP/CV<br />Writing</p>
          </div>

          {/* Laptop Illustration - Slider */}
          <div className="relative z-0 mb-6 md:mb-8 w-[240px] h-[160px] sm:w-[320px] sm:h-[220px] md:w-[400px] md:h-[280px] lg:w-[480px] lg:h-[320px]">
            <Image 
              src={slides[currentSlide]} 
              alt="Slider Illustration" 
              fill
              className="transition-opacity duration-500 object-contain"
            />
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 md:mb-4 font-outfit text-center px-4">
            Introducing allunipply
          </h2>
          <p className="text-sm md:text-base text-gray-600 font-outfit text-center max-w-md px-4">
            Streamline Your University Applications – One Submission,<br className="hidden sm:block" />
            Multiple Choices. 🎓
          </p>

          {/* Dots indicator */}
          <div className="flex gap-2 mt-4 md:mt-8">
            {slides.map((_, index) => (
              <div 
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-[#E3572B]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
