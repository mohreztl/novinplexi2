import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const GallerySlider = () => {
  const images = [

    "/gallery3.webp",
    "/gallery1.webp",
    "/gallery5.webp",
    "/gallery2.webp",

    "/gallery4.webp",

    "/gallery6.webp",
    "/gallery7.webp",
    "/gallery8.webp",
    "/gallery9.webp",
  
  ];
  const [currentIndex, setCurrentIndex] = useState(2);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const getVisibleImages = () => {
    const visibleIndices = [
      (currentIndex - 2 + images.length) % images.length,
      (currentIndex - 1 + images.length) % images.length,
      currentIndex,
      (currentIndex + 1) % images.length,
      (currentIndex + 2) % images.length,
    ];
    return visibleIndices.map((index) => images[index]);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        prevSlide();
      } else if (event.key === "ArrowRight") {
        nextSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    
    <div className="relative w-full max-w-full sm:py-24 py-14 lg:px-10 px-4  overflow-hidden ">

      <div className="flex items-center justify-center space-x-3 ">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          {getVisibleImages().map((image, index) => (
            <motion.div
              key={`${image}-${index}`}
              className={`relative transition-all duration-300 ease-in-out ${
                index === 2
                  ? "sm:w-[25rem] sm:h-[30rem] w-[25rem] h-[15rem]"
                  : "sm:w-[20rem] sm:h-[20rem] w-[20rem] h-[12rem]"
              } ${
                index === 0 || index === 4
                  ? "opacity-50 sm:block hidden"
                  : "opacity-100"
              }`}
              custom={direction}
              variants={index === 1 || index === 3 ? variants : {}}
              initial={index === 1 || index === 3 ? "enter" : false}
              animate={index === 1 || index === 3 ? "center" : false}
              exit={index === 1 || index === 3 ? "exit" : false}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              <Image
                height={500}
                width={500}
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
              {index !== 2 && (
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg" />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <button
        onClick={prevSlide}
        className="absolute md:left-6 left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-3 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-200"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute md:right-6 right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-3 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-200"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>
    </div>
  );
};

export default GallerySlider;
