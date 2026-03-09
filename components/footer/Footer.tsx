import Image from 'next/image'
import React from 'react'
import { Twitter, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
          <footer className="bg-[#fff4ea] pt-12 pb-6">
        <div className="max-w-full mx-auto px-4 md:px-6 font-outfit font-normal">
          {/* Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
            {/* Company Info */}
            <div className='col-span-2'>
              <div className="mb-4">
                <Image src="/icons/logo.png" alt="allunipply logo" width={150} height={50} className="object-contain" />
              </div>
              <p className="text-black text-sm leading-relaxed">
                iniAstra Tech is creating a simple, efficient, <br /> and affordable e-commerce platform for small entrepreneurs, helping <br /> them grow their businesses and improve their livelihoods.
              </p>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-bold text-lg mb-4">COMPANY</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-black hover:text-[#d95d39] hover:translate-x-1 transition-all duration-300 text-sm inline-block group">
                    <span className="border-b border-transparent group-hover:border-[#d95d39] transition-all">Home Page</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-black hover:text-[#d95d39] hover:translate-x-1 transition-all duration-300 text-sm inline-block group">
                    <span className="border-b border-transparent group-hover:border-[#d95d39] transition-all">About us</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-black hover:text-[#d95d39] hover:translate-x-1 transition-all duration-300 text-sm inline-block group">
                    <span className="border-b border-transparent group-hover:border-[#d95d39] transition-all">Listing</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-black hover:text-[#d95d39] hover:translate-x-1 transition-all duration-300 text-sm inline-block group">
                    <span className="border-b border-transparent group-hover:border-[#d95d39] transition-all">Agents</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="font-bold text-lg mb-4">SUPPORT</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-black hover:text-[#d95d39] hover:translate-x-1 transition-all duration-300 text-sm inline-block group">
                    <span className="border-b border-transparent group-hover:border-[#d95d39] transition-all">Contact us</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-black hover:text-[#d95d39] hover:translate-x-1 transition-all duration-300 text-sm inline-block group">
                    <span className="border-b border-transparent group-hover:border-[#d95d39] transition-all">Help</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-bold text-lg mb-4">SOCIAL</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-[#1DA1F2] text-white rounded-lg flex items-center justify-center hover:bg-[#1a8cd8] hover:scale-110 hover:-rotate-6 transition-all duration-300 shadow-md hover:shadow-lg">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://www.facebook.com/iniastratech" className="w-10 h-10 bg-[#1877F2] text-white rounded-lg flex items-center justify-center hover:bg-[#145dbf] hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-md hover:shadow-lg" target='_blank>
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white rounded-lg flex items-center justify-center hover:scale-110 hover:-rotate-6 transition-all duration-300 shadow-md hover:shadow-lg">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-[#FF0000] text-white rounded-lg flex items-center justify-center hover:bg-[#cc0000] hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-md hover:shadow-lg">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-[#0A66C2] text-white rounded-lg flex items-center justify-center hover:bg-[#084d94] hover:scale-110 hover:-rotate-6 transition-all duration-300 shadow-md hover:shadow-lg">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-300 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-black text-sm">© 2026 All Rights Reserved to iniAstra Tech</p>
              <div className="flex gap-6">
                <a href="#" className="text-black hover:text-[#d95d39] transition-all duration-300 text-sm relative group">
                  Privacy Policy
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d95d39] group-hover:w-full transition-all duration-300"></span>
                </a>
                <a href="#" className="text-black hover:text-[#d95d39] transition-all duration-300 text-sm relative group">
                  Terms and condition
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d95d39] group-hover:w-full transition-all duration-300"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
  )
}
