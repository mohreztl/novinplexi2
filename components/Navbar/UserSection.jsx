import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProfileWithLogout from "../ProfileWithLogout";
import { User, LogIn, Sparkles, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

const UserSection = ({ session }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <AnimatePresence mode="wait">
        {session ? (
          <motion.div
            key="profile"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <ProfileWithLogout />
          </motion.div>
        ) : (
          <motion.div
            key="login"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Button
              asChild
              variant="ghost"
              className={`
                relative flex items-center justify-center gap-3 px-6 py-3 rounded-full
                text-sm transition-all duration-500 ease-out
                bg-gradient-to-r from-blue-600/10 to-indigo-600/10
                border-2 border-transparent
                hover:border-blue-600/30 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-indigo-600/20
                focus:outline-none focus:ring-4 focus:ring-blue-600/20
                group overflow-hidden
              `}
            >
              <Link href="/login">
                {/* Animated background effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                  animate={{
                    scale: isHovered ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
                
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  animate={isHovered ? { x: "100%" } : { x: "-100%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <div className="h-full w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10 flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: isHovered ? 360 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <LogIn className="h-5 w-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </motion.div>
                  
                  <span className="text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:text-white transition-all duration-300">
                    ورود | ثبت نام
                  </span>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight className="h-4 w-4 text-white" />
                  </motion.div>
                </div>

                {/* Floating particles effect */}
                <AnimatePresence>
                  {isHovered && (
                    <>
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute"
                          initial={{ 
                            opacity: 0,
                            scale: 0,
                            x: Math.random() * 40 - 20,
                            y: Math.random() * 40 - 20
                          }}
                          animate={{ 
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0],
                            x: Math.random() * 80 - 40,
                            y: Math.random() * 80 - 40
                          }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ 
                            duration: 1.5,
                            delay: i * 0.2,
                            ease: "easeOut"
                          }}
                        >
                          <Sparkles className="h-3 w-3 text-yellow-400" />
                        </motion.div>
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </Link>
            </Button>

            {/* Tooltip */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap pointer-events-none z-50"
                >
                  <div className="relative">
                    به حساب کاربری خود وارد شوید
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Welcome message for new users */}
      {!session && mounted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap"
        >
          <span className="inline-flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-yellow-500" />
            عضو جدید هستید؟ خوش آمدید!
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};

UserSection.propTypes = {
  session: PropTypes.object
};

export default UserSection;