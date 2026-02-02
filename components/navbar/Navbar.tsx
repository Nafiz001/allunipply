"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div className='bg-[#fff4ea] relative z-50'>
            <nav className='flex flex-row justify-between mx-auto max-w-7xl items-center px-2 py-3'>
                {/* Logo */}
                <Link href='/' className="logo flex items-center">
                    <Image src="/icons/logo.png" alt="allunipply logo" width={216} height={84} className="object-contain" />
                </Link>

                {/* Desktop Navigation */}
                <ul className='hidden lg:flex items-center gap-8 font-outfit font-semibold text-xl text-[#00000099]'>
                    <li>
                        <Link href="/" className={`nav-link px-5 py-2.5 rounded-full transition-colors ${
                            pathname === '/' ? 'bg-[#e3572b] text-white' : 'hover:text-[#d95d39]'
                        }`}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" className={`nav-link px-5 py-2.5 rounded-full transition-colors ${
                            pathname === '/contact' ? 'bg-[#e3572b] text-white' : 'hover:text-[#d95d39]'
                        }`}>
                            Contact
                        </Link>
                    </li>
                    <li className='relative'>
                        <button className='nav-link flex items-center gap-1.5  hover:text-[#d95d39] transition-colors'>
                            Scholarship
                            <ChevronDown size={16} strokeWidth={2.5} />
                        </button>
                    </li>
                    <li className='relative'>
                        <button className='nav-link flex items-center gap-1.5  hover:text-[#d95d39] transition-colors'>
                            Universities
                            <ChevronDown size={16} strokeWidth={2.5} />
                        </button>
                    </li>
                </ul>

                {/* Desktop Get Started Button */}
                <Link href="/sign-in" className='hidden lg:block nav-link px-8 py-2.5 border-2 border-[#d95d39] text-[#d95d39] rounded-full hover:bg-[#d95d39] hover:text-white transition-all'>
                    Get Started
                </Link>

                {/* Mobile Hamburger Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className='lg:hidden p-2 text-[#2d3748] hover:text-[#d95d39] transition-colors'
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={28} strokeWidth={2} /> : <Menu size={28} strokeWidth={2} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            <div className={`lg:hidden absolute top-full left-0 w-full bg-[#fff4ea] border-t border-[#e8dfd5] transition-all duration-300 ease-in-out z-50 shadow-lg ${
                isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}>
                <ul className='flex flex-col gap-2 px-4 py-6'>
                    <li>
                        <Link 
                            href="/" 
                            className={`nav-link block px-6 py-3 rounded-full transition-colors text-center ${
                                pathname === '/' ? 'bg-[#d95d39] text-white' : 'text-[#2d3748] hover:text-[#d95d39] hover:bg-[#e8dfd5]'
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="/contact" 
                            className={`nav-link block px-6 py-3 rounded-full transition-colors text-center ${
                                pathname === '/contact' ? 'bg-[#d95d39] text-white' : 'text-[#2d3748] hover:text-[#d95d39] hover:bg-[#e8dfd5]'
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Contact
                        </Link>
                    </li>
                    <li>
                        <button className='nav-link w-full flex items-center justify-center gap-1.5 px-6 py-3 text-[#2d3748] hover:text-[#d95d39] hover:bg-[#e8dfd5] rounded-full transition-colors'>
                            Scholarship
                            <ChevronDown size={16} strokeWidth={2.5} />
                        </button>
                    </li>
                    <li>
                        <button className='nav-link w-full flex items-center justify-center gap-1.5 px-6 py-3 text-[#2d3748] hover:text-[#d95d39] hover:bg-[#e8dfd5] rounded-full transition-colors'>
                            Universities
                            <ChevronDown size={16} strokeWidth={2.5} />
                        </button>
                    </li>
                    <li className='mt-4'>
                        <Link 
                            href="/sign-in" 
                            className='nav-link block px-8 py-3 border border-[#e3572b] text-[#e3572b] rounded-full hover:bg-[#e3572b] hover:text-white transition-all text-center'
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Get Started
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;