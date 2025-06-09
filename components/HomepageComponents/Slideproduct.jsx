import { Card, CardContent } from "@/components/ui/card";
import ShiftingCountdown from "../Timer"
import React from "react";
const SlideProduct = () => {
  
  return (
    <Card className="xl:w-[290px] lg:h-[600px] h-full w-full bg-blues md:rounded-[50px] rounded-none flex flex-col items-center font-yekanbakh mt-3">
      <CardContent className="flex flex-col lg:items-center justify-between h-full py-8 lg:py-16">
        <div className="text-4xl text-gold  text-center [direction:rtl]">
          <span> </span><br/>
          <span className="font-bold">  مـحصولات<br className="hidden md:block"/> تخـفیف ویـژه</span>

        </div>
        <div className="text-lg text-gold text-center [direction:rtl] px-0 mx-0">
          زمان باقیمانده
       
        
        <ShiftingCountdown/>
        </div>
      </CardContent>
    </Card>
  );
};
export default SlideProduct;
