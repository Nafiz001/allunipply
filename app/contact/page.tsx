"use client";

import Image from 'next/image';
import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    website: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-12 font-outfit">
          Contact us
        </h1>

        {/* Contact Card and Form */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-20 rounded-[40px] p-8 md:p-12"
          style={{
            background: 'linear-gradient(180deg, rgba(255, 139, 34, 0.65) 0%, rgba(250.83, 124.36, 9.89, 0.73) 100%)'
          }}
        >
          {/* Left Side - Contact Info Card */}
          <div className="text-black">
            <div className="space-y-6">
              {/* Contact */}
              <div>

                <p className="font-poppins font-normal text-xl">Contact: +880-1531-395312</p>
              </div>

              {/* Email */}
              <div>
                <h3 className="text-2xl font-semibold mb-1 font-outfit">E-mail: allunipply@gmail.com</h3>

              </div>

              {/* Address */}
              <div>
                <h3 className="font-poppins font-normal text-xl">Address</h3>
                <p className="font-poppins font-normal text-xl">Chittagong, Bangladesh</p>
              </div>

              {/* Office Hours */}
              <div>
                <h3 className="font-poppins font-normal text-xl">Office Hours</h3>
                <p className="font-poppins font-normal text-xl">Monday to Friday</p>
                <p className="font-poppins font-normal text-xl">10:00AM-7:00PM</p>
              </div>

              {/* Social Links */}
              <div className="pt-6">
                <h3 className="text-2xl font-semibold mb-1 font-outfit">Let's talk</h3>
                <ul className="space-y-1 font-outfit font-normal text-xl">
                  <li><Image src="/icons/arrow.png" alt='arrow' width={16} height={16} className='inline mr-2'></Image><a href="https://www.facebook.com/iniastratech" target='_blank'>Facebook</a></li>
                  <li><Image src="/icons/arrow.png" alt='arrow' width={16} height={16} className='inline mr-2'></Image><a href="https://www.linkedin.com/company/iniastratech">Linkedin</a></li>
                  <li><Image src="/icons/arrow.png" alt='arrow' width={16} height={16} className='inline mr-2'></Image><a href="https://www.instagram.com/iniastratech">Instagram</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name*"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-3 border-b-2 border-black font-outfit focus:outline-none focus:border-[#E3572B] transition-colors bg-transparent placeholder-black"
                />
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-3 border-b-2 border-black font-outfit focus:outline-none focus:border-[#E3572B] transition-colors bg-transparent placeholder-black"
                />
              </div>

              {/* Phone */}
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-0 py-3 border-b-2 border-black font-outfit focus:outline-none focus:border-[#E3572B] transition-colors bg-transparent placeholder-black"
                />
              </div>

              {/* Business Name */}
              <div>
                <input
                  type="text"
                  name="businessName"
                  placeholder="Business Name"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full px-0 py-3 border-b-2 border-black font-outfit focus:outline-none focus:border-[#E3572B] transition-colors bg-transparent placeholder-black"
                />
              </div>

              {/* Website */}
              <div>
                <input
                  type="url"
                  name="website"
                  placeholder="Website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-0 py-3 border-b-2 border-black font-outfit focus:outline-none focus:border-[#E3572B] transition-colors bg-transparent placeholder-black"
                />
              </div>

              {/* Message */}
              <div>
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-0 py-3 border-b-2 border-black font-outfit focus:outline-none focus:border-[#E3572B] transition-colors bg-transparent placeholder-black resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#E3572B] text-white rounded-3xl font-outfit font-semibold text-lg hover:bg-[#c24d2b] transition-all"
                >
                  Submit now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
