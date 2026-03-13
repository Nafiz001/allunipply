"use client";

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";

const slides = ['/icons/laptop.png', '/icons/slider2.png', '/icons/slider3.png'];

const SignUpPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleAvailable, setIsGoogleAvailable] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [nextDestination, setNextDestination] = useState("/dashboard?openFilter=true");
  const signInHref = `/sign-in?next=${encodeURIComponent(nextDestination)}`;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const rawNext = new URLSearchParams(window.location.search).get("next");
    if (rawNext && rawNext.startsWith("/")) {
      setNextDestination(rawNext);
    }
  }, []);

  useEffect(() => {
    const checkProviders = async () => {
      try {
        const response = await fetch("/api/auth/providers", { cache: "no-store" });
        if (!response.ok) return;
        const providers = (await response.json()) as Record<string, unknown>;
        setIsGoogleAvailable(Boolean(providers.google));
      } catch {
        setIsGoogleAvailable(false);
      }
    };

    void checkProviders();
  }, []);

  const handleCreateAccount = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setAuthError("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setAuthError("Name, email and password are required.");
      return;
    }

    if (password !== confirmPassword) {
      setAuthError("Password and confirm password do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: name,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const result = (await response.json()) as { error?: string };
        setAuthError(result.error ?? "Unable to create account. Please try again.");
        return;
      }

      const loginResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: nextDestination,
      });

      if (!loginResult || loginResult.error) {
        setAuthError("Account created, but auto sign-in failed. Please sign in manually.");
        router.push(signInHref);
        return;
      }

      router.push(loginResult.url ?? nextDestination);
      router.refresh();
    } catch {
      setAuthError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setAuthError("");
    await signIn("google", {
      callbackUrl: nextDestination,
    });
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
              Sign up
            </h1>
            <p className="text-gray-700 mb-8 font-outfit">
              Sign up to start your journey
            </p>

            {/* Name Input */}
            <div className="mb-6">
              <label className="block text-gray-900 font-semibold mb-2 font-outfit">
                Name
              </label>
              <input
                type="text"
                placeholder="Shivani Chauhan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-[#0000001a] rounded-[40px] font-outfit focus:outline-none focus:border-[#E3572B] transition-colors"
              />
            </div>

            {/* Email Input */}
            <div className="mb-6">
              <label className="block text-gray-900 font-semibold mb-2 font-outfit">
                Email
              </label>
              <input
                type="email"
                placeholder="shivani2@suwiki.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-[#0000001a] rounded-[40px] font-outfit focus:outline-none focus:border-[#E3572B] transition-colors"
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label className="block text-gray-900 font-semibold mb-2 font-outfit">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#0000001a] rounded-[40px] font-outfit focus:outline-none focus:border-[#E3572B] transition-colors"
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

            {/* Confirm Password Input */}
            <div className="mb-6">
              <label className="block text-gray-900 font-semibold mb-2 font-outfit">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#0000001a] rounded-[40px] font-outfit focus:outline-none focus:border-[#E3572B] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center mb-8">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-[#E3572B] border-gray-300 rounded focus:ring-[#E3572B]"
              />
              <label htmlFor="remember" className="ml-2 text-gray-700 font-outfit">
                Remember me
              </label>
            </div>

            {/* Create Account Button */}
            {authError ? (
              <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-outfit text-red-700">
                {authError}
              </p>
            ) : null}

            <button 
              type="button"
              onClick={handleCreateAccount}
              disabled={isSubmitting}
              className="w-full py-4 bg-[#E3572B] text-white rounded-full font-outfit font-semibold text-lg hover:bg-[#c24d2b] transition-all mb-6"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>

            {/* Google Sign Up */}
            <button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={isSubmitting || !isGoogleAvailable}
              className="w-full py-3 border-2 border-gray-200 rounded-full font-outfit font-semibold text-gray-700 hover:border-[#E3572B] transition-all flex items-center justify-center gap-3 mb-8 disabled:opacity-70"
            >
              <Image src="/icons/google.png" alt="Google" width={20} height={20} />
              Google
            </button>

            {/* Sign In Link */}
            <p className="text-center text-gray-600 font-outfit">
              Already have an account?{' '}
              <Link href={signInHref} className="text-[#E3572B] font-semibold hover:underline">
                Sign In
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

export default SignUpPage;
