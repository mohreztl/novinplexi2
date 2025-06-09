'use client';

import React,{ useState, useEffect } from 'react';
import CartStep from "@/components/checkout/CartStep.jsx";
import InfoStep from "@/components/checkout/InfoStep.jsx";
import AdressStep from "@/components/checkout/AdressStep.jsx";
import ReviewStep from "@/components/checkout/ReviewStep";
import useCartStore from "@/store/cartStore.js";
import { FaShoppingCart, FaUser, FaMapMarkerAlt, FaCheckCircle, FaCheckDouble,FaUserEdit} from 'react-icons/fa';
import { useSession } from "next-auth/react";
import axios from 'axios';
import { useRouter } from "next/navigation";


export default function Checkout() {
  const [step, setStep] = useState(1);
  const [shippingMethod, setShippingMethod] = useState("post");
  const [shippingCost, setShippingCost] = useState(0);
  const [isCurrentStepValid, setIsCurrentStepValid] = useState(false);

  // مدیریت اطلاعات کاربر بدون استفاده از Debounce
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    companyName: '',
    nationalId: '',
    email: '',
    company: ''
  });
  const [adress, setAdress] = useState({
    city: '',
    province: '',
    street: '',
    postalCode: ''
  });
  const checkoutSteps = [
    {
      step: 1,
      label: "سبد خرید",
      icon: FaShoppingCart,
      activeColor: "bg-blues-500",
      completedColor: "bg-green-500"
    },
    {
      step: 2,
      label: "اطلاعات کاربری",
      icon: FaUserEdit,
      activeColor: "bg-blues-500",
      completedColor: "bg-green-500"
    },
    {
      step: 3,
      label: "آدرس ارسال",
      icon: FaMapMarkerAlt,
      activeColor: "bg-blues-500",
      completedColor: "bg-green-500"
    },
    {
      step: 4,
      label: "تایید نهایی",
      icon: FaCheckDouble,
      activeColor: "bg-blues-500",
      completedColor: "bg-green-500"
    }
  ];
  
  // مدیریت اطلاعات آدرس بدون استفاده از Debounce

  const router = useRouter();
  const { data: session, status } = useSession();
  const userId = session?.user?._id;
  const handleLocationChange = (newLocation) => {
    setAdress(newLocation);
  };
  const handleValidationChange = (isValid) => {
    setIsCurrentStepValid(isValid);
};
  const { items, getTotalPrice } = useCartStore();
  function formatPrice(price) {
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const totalPrice= getTotalPrice();
  const calculateShippingCost = () => {
    if (shippingMethod === "post") {
      let weight = items.reduce((total, item) => total + (item.weight || 1) * item.quantity, 0);
      setShippingCost(100000 + weight/1000 * 10000);
    } else {
      setShippingCost(0);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace(`/login?callbackUrl=/checkout`);
    }
  }, [status, router]);
  useEffect(() => {
    calculateShippingCost();
  }, [shippingMethod, items]);
  if (status === "loading") {
    return <div className="text-center p-8">در حال بررسی وضعیت حساب کاربری...</div>;
  }

  
  const handleCheckout = async () => {
    try {
      const fullName = `${formData.firstName} ${formData.lastName}`;
  
      const payload = {
        name: fullName,
        phoneNumber: formData.phoneNumber,
        city: adress.city,
        postalCode: adress.postalCode,
        streetAddress: adress.street,
        country: adress.province,
        cartItems: items.map(item => ({
          id: item._id,
          quantity: item.quantity,
        })),
        shippingCost,
        shippingMethod,
        user: userId,
      };
  console.log("this",payload)
      const response = await axios.post("/api/checkout", payload);
  
      if (response.data.url) {
        window.location.href = response.data.url; // بهتر برای سازگاری مرورگر
      } else {
        alert("خطایی در دریافت لینک پرداخت رخ داد.");
      }
  
    } catch (error) {
      console.error("Checkout error:", error);
      alert("خطایی در فرایند پرداخت رخ داده است. لطفاً دوباره تلاش کنید.");
    }
  };
  
  const handleNextStep = () => {
    // ذخیره داده‌های فرم فقط هنگام رفتن به مرحله بعد
    if (step === 2) {
      console.log('اطلاعات کاربر ذخیره شد:', formData);
    }
    if (step === 3) {
      console.log('اطلاعات آدرس ذخیره شد:', adress);
    }
    setStep(prev => Math.min(prev + 1, 4));
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
    <div className="flex items-center justify-between relative mb-12">
      {/* خط پیشرفت */}
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 transform -translate-y-1/2 -z-10">
        <div 
          className="h-full bg-gradient-to-r from-blues-400 to-green-400 transition-all duration-500"
          style={{ width: `${((step - 1) / (checkoutSteps.length - 1)) * 100}%` }}
        ></div>
      </div>

      {/* مراحل */}
      {checkoutSteps.map((s, index) => (
        <StepIcon
          key={s.step}
          // stepNumber={s.step}
          label={s.label}
          Icon={s.icon}
          isActive={step === s.step}
          isCompleted={step > s.step}
          // isLast={index === checkoutSteps.length - 1}
        />
      ))}
    </div>

    <div className="bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-xl font-bold mb-4">تکمیل خرید</h1>
        {step === 1 && <CartStep />}
        {step === 2 && <InfoStep formData={formData} handleChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}      onValidationChange={handleValidationChange}/>}
        {step === 3 &&   <div>
          <h2 className="text-lg font-semibold">آدرس و روش حمل و نقل</h2>
        <AdressStep onAdressChange={(e) => setAdress(prev => ({ ...prev, [e.target.name]: e.target.value }))} adressData={adress} onLocationChange={handleLocationChange}      onValidationChange={handleValidationChange}  />
        <div className="mt-4">
              <label className="block font-medium">روش ارسال</label>
              <select value={shippingMethod} onChange={(e) => setShippingMethod(e.target.value)}
                      className="w-full p-2 border rounded">
                <option value="post">پست پیشتاز</option>
                <option value="courier">پیک موتوری</option>
                <option value="pay_on_delivery">پس‌کرایه</option>
              </select>
              <p className="mt-2">هزینه ارسال: {shippingCost.toLocaleString()} تومان</p>
            </div>
          </div>}
        
        {step === 4 &&        <ReviewStep 
                    formData={formData}
                    addressData={adress}
                    items={items}
                    totalPrice={totalPrice}
                    shippingCost={shippingCost}
                    onConfirm={handleCheckout}
                />}
          <div className="mt-6 flex flex-col-reverse md:flex-row justify-between gap-4">
        <button
          onClick={() => setStep(prev => Math.max(prev - 1, 1))}
          disabled={step === 1}
          className={`
            px-6 py-3 rounded-lg font-medium transition-all
            ${step === 1 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-blues-50 text-blues-700 hover:bg-blues-100 hover:shadow-md'
            }
          `}
        >
        → مرحله قبل
        </button>
        
        {step < 4 ? (
          <button
            onClick={handleNextStep}
            disabled={step !== 1 && !isCurrentStepValid}
            className={`
              px-6 py-3 rounded-lg font-medium text-white transition-all
              ${!isCurrentStepValid && step !== 1 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blues-600 to-blues-500 hover:from-blues-700 hover:to-blues-600 hover:shadow-lg'
              }
            `}
          >
              مرحله بعد ←
          </button>
        ) : (
          <button
            onClick={handleCheckout}
            disabled={!isCurrentStepValid}
            className="px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 hover:shadow-lg transition-all"
          >
            تأیید و پرداخت نهایی
          </button>
        )}
      </div>
      </div>
    </div>
  );
}

function StepIcon({ label, Icon, isActive, isCompleted}) {
  return (
    <div className="flex flex-col items-center flex-1">
      <div className="relative">
        {/* حلقه پیشرفت */}
        <div className={`absolute -inset-2 rounded-full animate-pulse ${
          isActive ? 'bg-blues-100' : 'opacity-0'
        }`}></div>

        {/* دایره مرکزی */}
        <div className={`w-14 h-14 flex items-center justify-center rounded-full border-4 transition-all ${
          isCompleted 
            ? 'bg-green-100 border-green-400 scale-110 shadow-lg' 
            : isActive 
              ? 'bg-white border-blues-500 scale-125 shadow-xl' 
              : 'bg-gray-50 border-gray-300'
        }`}>
          <Icon className={`w-6 h-6 transition-colors ${
            isCompleted 
              ? 'text-green-600' 
              : isActive 
                ? 'text-blues-600' 
                : 'text-gray-400'
          }`} />
        </div>

        {/* شماره مرحله
        {!isCompleted && (
          <span className={`absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
            isActive 
              ? 'bg-blues-500 text-white' 
              : 'bg-gray-300 text-gray-600'
          }`}>
            {stepNumber}
          </span>
        )} */}
      </div>

      {/* عنوان مرحله */}
      <p className={`mt-3 text-center text-sm font-medium transition-colors ${
        isCompleted 
          ? 'text-green-700' 
          : isActive 
            ? 'text-blues-700' 
            : 'text-gray-500'
      }`}>
        {label}
      </p>

      {/* خط اتصال */}
   
    </div>
  );
}