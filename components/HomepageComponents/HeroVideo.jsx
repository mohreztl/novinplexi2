import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

const WatchHero = () => {
  return (
    <Card className="border-none mt-0 bg-transparent w-full !mx-0 !px-0">
      <CardContent className="relative px-2  mt-6 lg:px-10">
        <AspectRatio ratio={1278 / 530}>
          <div className="relative w-full md:h-full md:rounded-[40px] rounded-[20px] overflow-hidden h-[220px]">
            {/* Background Image */}
            <Image
              className="w-full h-full object-cover"
              loading="eager"
            width={1380}
            height={400}
              alt="نیکودکور"
              src="/نیکودکور.webp"
            />

            {/* Overlay for Better Readability */}
            <div className="absolute inset-0 bg-black/40 md:bg-black/20" />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 mb-8 md:mb-24">
              <h2 className="text-white text-xl md:text-5xl font-bold drop-shadow-lg">
                بهترین دکوراسیون برای خانه شما
              </h2>
              
              {/* Button */}
              <div className="flex gap-4 mt-6 w-fit md:w-auto">
                <Link href="/products" className="flex-1 md:flex-none">
                  <Button 
                    size="lg"
                    className="hidden md:block w-fit md:w-48 bg-blues hover:bg-blues/90 text-white rounded-full text-sm md:text-base shadow-lg hover:shadow-xl transition-all"
                  >
                    مشاهده محصولات
                  </Button>
                </Link>
                
                {/* Mobile Only Button */}
                {/* <Link href="/contact" className="md:hidden flex-1">
                  <Button
                    variant="outline"
                    className="w-full bg-white/10 hover:bg-white/20 text-white rounded-full border-white/20"
                  >
                    مشاوره رایگان
                  </Button>
                </Link> */}
              </div>
            </div>
          </div>
        </AspectRatio>
      </CardContent>
    </Card>
  );
};

export default WatchHero;
