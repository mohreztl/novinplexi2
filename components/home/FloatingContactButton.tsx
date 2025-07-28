// components/FloatingContactButton.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPhone, FiMessageSquare, FiX } from 'react-icons/fi';

const FloatingContactButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  // مخفی کردن دکمه هنگام اسکرول
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      if (Math.abs(window.scrollY - lastScrollY) > 50) {
        setIsVisible(window.scrollY < lastScrollY);
        lastScrollY = window.scrollY;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="fixed bottom-6 left-6 z-[200]"
        >
          <AnimatePresence>
            {isExpanded && (
              <>
                {/* دکمه واتس‌اپ */}
                <motion.a
                  href="https://wa.me/989123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 20 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className="absolute bottom-20 left-0 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/30 cursor-pointer group backdrop-blur-sm"
                  whileHover={{ scale: 1.1 }}
                >
                  <FiMessageSquare className="text-white text-2xl" />
                  <span className="absolute left-16 bg-gray-900 text-white text-xs py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg">
                    پیام در واتس‌اپ
                  </span>
                </motion.a>

                {/* دکمه تماس */}
                <motion.a
                  href="tel:+989123456789"
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 20 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                  className="absolute bottom-36 left-0 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30 cursor-pointer group backdrop-blur-sm"
                  whileHover={{ scale: 1.1 }}
                >
                  <FiPhone className="text-white text-2xl" />
                  <span className="absolute left-16 bg-gray-900 text-white text-xs py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg">
                    تماس با ما
                  </span>
                </motion.a>
              </>
            )}
          </AnimatePresence>

          {/* دکمه اصلی */}
          <motion.button
            onClick={toggleMenu}
            className={`w-16 h-16 flex items-center justify-center rounded-full shadow-xl cursor-pointer backdrop-blur-sm ${
              isExpanded 
                ? 'bg-gradient-to-br from-purple-600/90 to-indigo-700/90' 
                : 'bg-gradient-to-br from-blue-600/90 to-indigo-700/90'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 0 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isExpanded ? (
                <FiX className="text-white text-2xl" />
              ) : (
                <div className="relative">
                  <FiPhone className="text-white text-2xl" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                </div>
              )}
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingContactButton;