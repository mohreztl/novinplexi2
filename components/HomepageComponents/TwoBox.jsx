import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import Image from "next/image";

export const TwoBox = () => {
  const cards = [
    {
      id: 1,
      title: "فروش همکاری کاغذ دیواری",
      subtitle: "همکاری در فروش و کسب درآمد",
      description: "همکاری با برترین برندهای بازار در حوزه دکوراسیون داخلی",
      image: "/box2-nikodeckor.jpg", // تصویر جدید
    },
    {
      id: 2,
      title: "فروش اقساطی کاغذ دیواری",
      subtitle: "امکان خرید اقساطی با شرایط ویژه",
      description: "خرید آسان با اقساط بلندمدت و بدون پیش‌پرداخت",
      image: "/box1-nikodeckor.jpg", // تصویر جدید
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 md:px-8 lg:px-12 xl:px-16 max-w-full mx-auto py-12 font-yekanbakh">
      {cards.map((card) => (
        <Card
          key={card.id}
          className="relative rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group bg-white"
        >
          <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center justify-between h-full">
            {/* بخش تصویر */}
            <div className="relative w-full md:w-1/2 h-56 md:h-64 overflow-hidden rounded-2xl">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* بخش محتوا */}
            <div className="flex-1 space-y-4 text-center md:text-right">
              <div className="space-y-2">
                {card.subtitle && (
                  <p className="text-base md:text-lg text-blues-800 font-medium"> {/* تغییر رنگ سابتایتل */}
                    {card.subtitle}
                  </p>
                )}
                <h2 className="text-2xl md:text-3xl font-bold text-blues">
                  {card.title}
                </h2>
                {card.description && (
                  <p className="text-gray-600 text-sm md:text-base">
                    {card.description}
                  </p>
                )}
              </div>
              <Button 
                className="bg-blues hover:bg-blues/90 text-white rounded-full px-8 py-4 text-base md:text-lg transition-transform duration-200 hover:scale-[1.02] shadow-md hover:shadow-lg"
              >
                جزئیات بیشتر
                <span className="mr-2">←</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};