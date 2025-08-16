"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Wrench, ChevronRight } from "lucide-react";
import Link from "next/link";

const ServiceDrawer = ({ isOpen, setIsOpen, services }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">خدمات ما</h2>
                  <p className="text-sm text-gray-500 mt-1">نمایش بر اساس نوع: سرویس</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-red-100 hover:text-red-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Services List */}
            <div className="overflow-y-auto h-[calc(100vh-80px)] p-6">
              <div className="space-y-3">
                {services && services.length > 0 ? (
                  services.map((service) => (
                    <Link
                      key={service._id}
                      href={`/services/${service.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-4 transition-all hover:border-blue-200 hover:bg-blue-50 hover:shadow-md"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 transition-colors group-hover:from-blue-600 group-hover:to-indigo-600">
                        <Wrench className="h-6 w-6 text-blue-600 transition-colors group-hover:text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                          {service.name}
                        </h3>
                        {service.description && (
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                            {service.description}
                          </p>
                        )}
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-blue-600" />
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">خدماتی یافت نشد</p>
                  </div>
                )}
              </div>

              {/* Contact Section */}
              <div className="mt-8 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
                <h3 className="mb-4 font-semibold text-gray-900">نیاز به مشاوره دارید؟</h3>
                <p className="mb-4 text-sm text-gray-600">
                  کارشناسان ما آماده پاسخگویی به سوالات شما هستند
                </p>
                <a
                  href="tel:+982112345678"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-medium text-white transition-all hover:from-indigo-600 hover:to-blue-600 hover:shadow-lg"
                >
                  <svg
                    xmlns="https://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  تماس با ما
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ServiceDrawer;