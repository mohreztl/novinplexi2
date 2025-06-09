import React from "react";
import { Shield, RefreshCcw, Truck, Award } from "lucide-react";

const MiniGuarantee = () => {
  return (
    <section>
    
        <div className="grid grid-cols-4 gap-1 md:gap-4">
          <GuaranteeItem
            icon={<Shield className="w-6 h-6" />}
            title="پرداخت امن"

          />
          <GuaranteeItem
            icon={<RefreshCcw className="w-6 h-6" />}
            title="ضمانت سلامت کالا"

          />
          <GuaranteeItem
            icon={<Truck className="w-6 h-6" />}
            title="ارسال سریع"
        
          />
          <GuaranteeItem
            icon={<Award className="w-6 h-6" />}
            title="بهترین قیمت"
        
          />
        </div>
   
    
    </section>
  );
};

const GuaranteeItem = ({ icon, title }) => {
  return (
    <div className="group flex flex-col items-center p-2  bg-opacity-80 backdrop-blur-lg rounded-lg transition-all duration-300 hover:bg-opacity-100 hover:shadow-2xl">
      <div className="bg-blues mb-1 p-2 rounded-full text-gold group-hover:text-gold/90 group-hover:bg-blues/75 transition-all duration-300 shadow-md">
        {icon}
      </div>
      <p className="md:text-sm text-xs text-center line-clamp-2 mb-2 text-gray-900">{title}</p>
      
   </div>
  );
};

export default MiniGuarantee;
