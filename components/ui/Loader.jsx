// components/ui/Loader.jsx
"use client";

import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-6">
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s] mx-1"></div>
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s] mx-1"></div>
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce mx-1"></div>
    </div>
  );
};

export default Loader;