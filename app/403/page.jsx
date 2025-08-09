"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShieldX, ArrowLeft } from "lucide-react";

export default function AccessDeniedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <ShieldX className="w-10 h-10 text-red-500" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            دسترسی محدود
          </h1>
          
          <p className="text-gray-600 mb-6">
            شما به این بخش دسترسی ندارید. این صفحه مخصوص مدیران سایت است.
          </p>
          
          <div className="space-y-3">
            <Button 
              onClick={() => router.push("/")}
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 ml-2" />
              بازگشت به صفحه اصلی
            </Button>
            
            <Button 
              onClick={() => router.push("/login")}
              variant="outline"
              className="w-full"
            >
              ورود به حساب کاربری
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
