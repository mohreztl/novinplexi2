"use client";
// export const dynamic = 'force-dynamic';
import { Mail, Lock, AlertCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState,useTransition  } from "react";
import { signIn, useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaGoogle,FaArrowRight  } from "react-icons/fa";
import { motion } from "framer-motion";

import { useSearchParams } from 'next/navigation'
const AnimatedBackground = () => {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad1)" />
      {[...Array(20)].map((_, i) => (
        <motion.circle
          key={i}
          r={Math.random() * 20 + 10}
          fill="#fff"
          initial={{
            opacity: Math.random() * 0.5 + 0.1,
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
          }}
          animate={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </svg>
  );
};

const LoginClient = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

//login phone
const [step, setStep] = useState('login'); // مرحله ورود
const [phoneNumber, setPhoneNumber] = useState(''); // شماره تلفن
const [verificationCode, setVerificationCode] = useState(''); // کد تایید
const [userInfo, setUserInfo] = useState({ name: '', }); 
const [isPending, startTransition] = useTransition();

const searchParams = useSearchParams()
 const callbackUrl = searchParams.get('callbackUrl') || '/'
// بررسی کد تایید
const handlePhoneSubmit = async () => {

    const response = await fetch('/api/check-phone', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber }),
    });
setLoading(true);
    const result = await response.json();
    if (response.ok) {
      setStep(result.step); // verify یا signup
      setError('');
      setLoading(false)
    } else {
      setError(result.message);
      setLoading(false);
    }
 }
  const handleSignupSubmit = async () => {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber,verificationCode, ...userInfo }),
    });
    const result = await res.json();


    setLoading(true);
    if (!res.ok) {
      setLoading(false);
      // نمایش پیام خطا
      setError(result.error || "مشکلی پیش آمده است.");
      return;
    }
    if (res.status === 200 || res.status === 201) {
      console.log("User registered successfully!");
      setLoading(false);
      //sign in the user
      const signInResult = await signIn("credentials", {
        phoneNumber,
        code:verificationCode,
        // isRegistering: false,
        redirect: false,
        callbackUrl: callbackUrl,
      });

      if (signInResult.error) {
        setError("Error signing in");
        setLoading(false);
      } else {
        router.push("/dashboard");
      }
    }
    }
//end
  //handle the input changes aka when a user is typing something
  const handleVerificationSubmit = async () => {
 
    const response = await fetch('/api/verify-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber, verificationCode,...userInfo }),
    });
    setLoading(true);
    const result = await response.json();
    if (response.ok) {
      setLoading(false);
     
     await signIn("credentials", {
      
 phoneNumber,
 code:verificationCode,
        redirect: false,
      //  isRegistering:true,
      });
      alert('ورود موفقیت‌آمیز!');
    } else {
      setLoading(false);
      setError(result.message);
    }
  };

 
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      router.replace(callbackUrl)
    }
  }, [status, session, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100 to-secondary-50 flex flex-col items-center justify-center p-4 relative">
  <button
    onClick={() => router.push("/")}
    className="absolute top-6 left-6 flex items-center text-primary-600 hover:text-primary-700 transition-colors"
  >

    <span className="font-medium">بازگشت به صفحه اصلی</span>
    <FaArrowRight className="ml-1 rotate-180" />
  </button>
      {/* <AnimatedBackground /> */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-white/20 relative z-10"
      >
        <div className="text-center mb-8 flex flex-col gap-2 justify-center items-center content-center
        ">
 
        <Image
                  alt="s"
                  onClick={() => router.push("/")}
                  src="/logo1.svg"
                  width={180}
                  height={45}
                  className="cursor-pointer "
                />
               
          <h2 className="text-2xl font-bold text-gray-800">ورود به حساب کاربری</h2>
          <p className="text-gray-600">لطفا شماره همراه خود را وارد کنید</p>
        </div>
        {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
          {error}
        </div>
      )}
     {/* login */}
          {step === 'login' && (
       <div>
       <label
         htmlFor="phone"
         className="block text-sm font-medium text-gray-700 mb-1"
       >
    شماره همراه
       </label>
       <div className="relative mb-8">
         <Input
         
           name="شماره همراه"
           id="phone"
          
           type="text"
           placeholder="09123456789"
           value={phoneNumber}
           onChange={(e) => setPhoneNumber(e.target.value)}
           className="pl-10 w-full border-secondary"
           required
         />
         <Mail
           className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
           size={18}
         />
       </div>
       <Button
            variant="default"
            type="submit"
            className="w-full bg-primary hover:bg-indigo-700 text-white"
            onClick={handlePhoneSubmit}
            disabled={loading}
          >
            {loading ? "ورود به حساب کاربری..." : "ورود"}
          </Button>
     </div> 
     
      )}
{/* ثبت نام */}
      {step === 'signup' && (
        <div>
            <div className="relative mb-8">
         <Input
         
           name=" نام کامل"
           id="name"
          
           type="text"
           placeholder="نام و نام خانوادگی"
           value={userInfo.name}
           onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
           className="pl-10 w-full border-secondary"
           required
         />
         <Mail
           className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
           size={18}
         />
       </div>
       <div className="relative mb-8">
         <Input
         
           name=" کد تایید"
           id="verifycode"
          
           type="text"
           placeholder="کد تایید"
           value={verificationCode}
           onChange={(e) => setVerificationCode(e.target.value)}
           className="pl-10 w-full border-secondary"
           required
         />
         <Mail
           className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
           size={18}
         />
       </div>
             <Button
            variant="default"
            type="submit"
            className="w-full bg-primary hover:bg-indigo-700 text-white"
            onClick={handleSignupSubmit}
            disabled={loading}
          >
            {loading ? "در حال تکمیل ثبت نام ..." : "ثبت نام"}
          </Button>
        </div>
      )}
{/* تایید کد */}
      {step === 'verify' && (
        <div>
            <div className="relative mb-8">
         <Input
         
           name="شماره همراه"
           id="phone"
          
           type="text"
           placeholder="کد تایید"
           value={verificationCode}
           onChange={(e) => setVerificationCode(e.target.value)}
           className="pl-10 w-full border-secondary"
           required
         />
         <Mail
           className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
           size={18}
         />
       </div>
       <Button
            variant="default"
            type="submit"
            className="w-full bg-primary hover:bg-indigo-700 text-white"
            onClick={handleVerificationSubmit}
            disabled={loading}
          >
            {loading ? "ورود به حساب کاربری..." : "تایید"}
          </Button>
        </div>
      )}



{/* ////end */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm flex items-center"
            >
              <AlertCircle size={16} className="mr-2" />
              {error}
            </motion.div>
          )}

     

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
              ادامه با
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Button
              onClick={() => signIn("google")}
              className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <FaGoogle className="mr-2" />
              ورود با گوگل
            </Button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
        حساب کاربری ندارید؟{" "}
          <a
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
         ویرایش شماره
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginClient;
