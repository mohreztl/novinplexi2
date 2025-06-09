import { Card, CardContent } from "@/components/ui/card";
import ShiftingCountdown from "../Timer"
import React from "react";
const SlideNewProduct = () => {
  const discountText = {
    prefix: "jotdt",
    percentage: "30%",
    suffix: "",
  };
  return (
    <Card className="sm:w-[305px] sm:h-[603px] h-[300px] bg-blues rounded-[50px] flex flex-col items-center">
      <CardContent className="flex flex-col sm:items-center justify-between h-full py-16">
        <div className="text-4xl text-white text-center [direction:rtl]">
          <span>محصولات شامل تخفیف</span>
          <span className="font-['B_Badr-Regular']">
            {discountText.percentage}
          </span>
          <span> {discountText.suffix}</span>
        </div>
        <div className="text-lg text-white text-center [direction:rtl] px-0 mx-0">
          زمان باقیمانده
       
        
        <ShiftingCountdown/>
        </div>
      </CardContent>
    </Card>
  );
};
export default SlideNewProduct;
