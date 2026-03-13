"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerReveal from "@/components/animations/StaggerReveal";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', businessName: '', website: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed top-0 right-0 -z-10 translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-50 rounded-full blur-3xl opacity-50" />
      <div className="fixed bottom-0 left-0 -z-10 -translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-orange-50 rounded-full blur-3xl opacity-50" />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-12">
        <ScrollReveal direction="down">
          <h1 className="text-5xl md:text-8xl font-extrabold text-[#0a0a0a] mb-6 font-outfit tracking-tighter">
            Contact <span className="text-[#E3572B]">us</span>
          </h1>
          <p className="text-gray-500 text-xl md:text-2xl font-outfit max-w-2xl leading-relaxed">
            Ready to embark on your academic journey? We&apos;re here to guide you every step of the way.
          </p>
        </ScrollReveal>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Left Column: Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <StaggerReveal staggerDelay={0.1}>
              {[
                { icon: Phone, label: 'Phone', value: '+880-1531-395312', color: 'bg-blue-50 text-blue-600' },
                { icon: Mail, label: 'Email', value: 'allunipply@gmail.com', color: 'bg-purple-50 text-purple-600' },
                { icon: MapPin, label: 'Address', value: 'Chittagong, Bangladesh', color: 'bg-green-50 text-green-600' },
                { icon: Clock, label: 'Hours', value: 'Mon – Fri: 10AM – 7PM', color: 'bg-orange-50 text-orange-600' },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="group bg-white rounded-3xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-gray-100 hover:border-orange-200 transition-all flex items-center gap-6 cursor-pointer"
                >
                  <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <item.icon size={26} strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">{item.label}</p>
                    <p className="font-outfit font-bold text-xl text-gray-900">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </StaggerReveal>

            {/* Social Connect */}
            <ScrollReveal direction="up" delay={0.4} className="pt-10">
              <h3 className="text-3xl font-bold mb-8 font-outfit text-gray-900 tracking-tight">Let&apos;s connect</h3>
              <div className="flex flex-wrap gap-4">
                {['Facebook', 'LinkedIn', 'Instagram'].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-900 text-white font-bold text-sm hover:bg-orange-600 transition-colors shadow-lg"
                  >
                    <ArrowRight size={16} />
                    {social}
                  </motion.a>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="right" delay={0.2} className="relative h-full">
              <div className="bg-white rounded-[48px] p-8 md:p-16 shadow-[0_32px_80px_rgba(0,0,0,0.06)] border border-gray-50 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50/50 rounded-full blur-2xl -mr-16 -mt-16" />
                
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center justify-center h-full gap-8 py-12 text-center"
                    >
                      <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center border-2 border-green-100 shadow-xl shadow-green-100">
                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-outfit font-bold text-4xl text-gray-900 mb-4 tracking-tight">Message Received!</h3>
                        <p className="text-gray-500 text-lg max-w-sm font-medium">Your inquiry is in good hands. We&apos;ll reach out within one business day.</p>
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setSubmitted(false)}
                        className="px-10 py-4 bg-gray-900 text-white rounded-full font-bold text-lg"
                      >
                        Send another
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div key="form">
                      <h2 className="text-3xl font-bold text-gray-900 mb-10 tracking-tight">Send a message</h2>
                      <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {[
                            { name: 'name', placeholder: 'Full Name*', type: 'text', required: true },
                            { name: 'email', placeholder: 'Email Address*', type: 'email', required: true },
                            { name: 'phone', placeholder: 'Phone Number', type: 'tel' },
                            { name: 'website', placeholder: 'University of Interest', type: 'text' },
                          ].map((field) => (
                            <div key={field.name} className="relative group">
                              <input
                                type={field.type}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={formData[field.name as keyof typeof formData]}
                                onChange={handleChange}
                                required={field.required}
                                className="w-full px-1 py-4 bg-transparent border-b-2 border-gray-100 font-outfit text-lg placeholder-gray-300 focus:outline-none focus:border-orange-500 transition-all font-medium"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="relative group">
                          <textarea
                            name="message"
                            placeholder="Tell us about your goals..."
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-1 py-4 bg-transparent border-b-2 border-gray-100 font-outfit text-lg placeholder-gray-300 focus:outline-none focus:border-orange-500 transition-all font-medium resize-none"
                          />
                        </div>
                        <div className="pt-6">
                          <motion.button 
                            type="submit" 
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-6 bg-[#E3572B] text-white font-bold text-xl rounded-3xl shadow-2xl shadow-orange-500/20 hover:bg-orange-600 transition-all flex items-center justify-center gap-3"
                          >
                            Send Inquiry
                            <ArrowRight size={22} />
                          </motion.button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
