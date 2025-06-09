import React from "react";
import {
  ShoppingCart,
  Heart,
  BookCheck,
  Link,
  Star,
  Gem,
  Shield,
  Activity,
  Aperture,
  Droplet,
  Layers,
  LocateFixed,
  House ,
  Ruler ,
  Zap,
} from "lucide-react";

const ProdDetailsList = ({ product }) => {
  return (
    <div className="bg-white sm:pb-[2px] rounded-b-xl mt-2 sm:mt-0 rounded-t-xl sm:rounded-none">
      <div className=" relative z-20 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg p-4 sm:mx-2 sm:p-8 mb-8 hover:shadow-2xl transition-all duration-300">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -left-4 w-40 h-40 bg-gray-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-40 h-40 bg-gray-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="relative z-10 transform-gpu sm:rounded-md ">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 antialiased">
           مشخصات محصول
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-102">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <BookCheck  className="w-5 h-5 text-blues" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 antialiased">
                  برند
                </p>
                <p className="text-sm font-semibold text-gray-800 antialiased">
                  {product.brand}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-102">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Link className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 antialiased">
              جنس
                </p>
                <p className="text-sm font-semibold text-gray-800 antialiased">
                  {product.material}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-102">
              <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Droplet className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 antialiased">
                  قابلیت شستشو
                </p>
                <p className="text-sm font-semibold text-gray-800 antialiased">
                  {product.washable}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-102">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Gem className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 antialiased">
                  گارانتی
                </p>
                <p className="text-sm font-semibold text-gray-800 antialiased">
                 24 ماهه نیکو دکور
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-102">
              <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                <Activity className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 antialiased">
                  رنگ پس زمینه
                </p>
                <p className="text-sm font-semibold text-gray-800 antialiased">
                  {product.color}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-102">
              <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <LocateFixed  className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 antialiased">
                 ساخت کشور
                </p>
                <p className="text-sm font-semibold text-gray-800 antialiased">
                  {product.country}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-102">
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Layers className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 antialiased">
                  وزن محصول
                </p>
                <p className="text-sm font-semibold text-gray-800 antialiased">
                  {product.weight}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-102">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-blues" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 antialiased">
                  مقاوم در برابر
                </p>
                <p className="text-sm font-semibold text-gray-800 antialiased">
               آب و تابش آفتاب
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-102">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <House  className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 antialiased">
                 مکان های قابل استفاده
                </p>
                <p className="text-sm font-semibold text-gray-800 antialiased">
             همه اماکن
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-102">
              <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Ruler  className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 antialiased">
                  عرض محصول
                </p>
                <p className="text-sm font-semibold text-gray-800 antialiased">
              53 سانتیمتر
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-102">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <Ruler   className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 antialiased">
                 طول محصول
                </p>
                <p className="text-sm font-semibold text-gray-800 antialiased">
            10 متر
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-102">
              <div className="flex-shrink-0 w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 antialiased">
                ضد الکتریسته ساکن
                </p>
                <p className="text-sm font-semibold text-gray-800 antialiased">
             دارد
                </p>
              </div>
            </div>
            {/* <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-102">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Droplet className="w-5 h-5 text-blues" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 antialiased">
                قابلیت ضد آب 
                </p>
                <p className="text-sm font-semibold text-gray-800 antialiased">
                  {product.water}
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdDetailsList;
