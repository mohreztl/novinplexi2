import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import {Button} from "../ui/button"
const SliderProduct2 = () => {
 
  return (
    <Card className="sm:w-[305px] sm:h-[603px] h-[300px] bg-blues rounded-[50px] flex flex-col items-center">
      <CardContent className="flex flex-col sm:items-center justify-between h-full py-16">
        <div className="text-2xl text-gold text-center [direction:rtl]">
          <span className="font-bold"> بهترین کاغذ دیواری های موجود در بازار</span>
    
        </div>
        <div className="flex flex-col gap-6">
        <Image
                  src={'/f1b209e7034b4a9d1d54d78c8ac6169d5a682be7.png'}
                  alt={"نیکو دکور"}
                  width={400}
                  height={500}
                  className="w-full h-48 object-cover"
                />
<Button className="bg-gold text-gray-800 font-semibold w-full text-lg rounded-[50px] hover:bg-gold/70 ">مشاهده محصولات</Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default SliderProduct2;
