"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentStatus() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const trackId = searchParams.get("trackId");
  const [status, setStatus] = useState("در حال بررسی پرداخت...");
  const success = searchParams.get("success");
  useEffect(() => {
    if (!orderId || !trackId) return;

    const verifyPayment = async () => {
    
try{
     
          setStatus("✅ پرداخت موفقیت‌آمیز بود! پیامک تأیید ارسال شد.");
        } 
        
       catch (error) {
        setStatus("⚠️ خطای سرور. لطفاً دوباره تلاش کنید.");
      }
    };

    verifyPayment();
  }, [orderId, trackId]);

  return <p className="mt-2 text-sm text-gray-600">{status}</p>;
}
