"use client";
// export const dynamic = 'force-dynamic';
import { AlertCircle, Phone, User, Shield, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaGoogle,FaArrowRight  } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import { useSearchParams } from 'next/navigation'

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-20 h-20 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full"
          initial={{
            x: Math.random() * 1000,
            y: Math.random() * 800,
          }}
          animate={{
            x: Math.random() * 1000,
            y: Math.random() * 800,
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const GlassCard = ({ children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className={`
      relative backdrop-blur-xl bg-white/10 border border-white/20 
      rounded-3xl shadow-2xl p-8 
      before:absolute before:inset-0 before:rounded-3xl 
      before:bg-gradient-to-br before:from-white/20 before:to-transparent before:z-[-1]
      ${className}
    `}
  >
    {children}
  </motion.div>
);

const StepIndicator = ({ currentStep, steps }) => (
  <div className="flex justify-center items-center mb-8">
    <div className="flex space-x-2 space-x-reverse">
      {steps.map((step, index) => (
        <motion.div
          key={step.id}
          className={`
            w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
            transition-all duration-300
            ${currentStep === step.id 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
              : index < steps.findIndex(s => s.id === currentStep)
                ? 'bg-green-500 text-white'
                : 'bg-white/20 text-white/60'
            }
          `}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          {step.icon}
        </motion.div>
      ))}
    </div>
  </div>
);

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

 
  const steps = [
    { id: 'login', icon: '📱', title: 'شماره همراه' },
    { id: 'verify', icon: '🔐', title: 'تایید کد' },
    { id: 'signup', icon: '👤', title: 'ثبت نام' }
  ];

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      router.replace(callbackUrl)
    }
  }, [status, session, router, callbackUrl]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900" />
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(147,51,234,0.3),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.3),rgba(255,255,255,0))]" />
      </div>

      {/* Floating Particles */}
      <FloatingElements />

      {/* Back Button */}
      <motion.button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 z-20 flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaArrowRight className="ml-2 rotate-180" />
        <span className="font-medium">بازگشت</span>
      </motion.button>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <GlassCard className="w-full max-w-md">
          {/* Logo and Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mb-6"
            >
              <Image
                alt="لوگو"
                onClick={() => router.push("/")}
                src="/logo1.svg"
                width={180}
                height={45}
                className="cursor-pointer mx-auto filter drop-shadow-lg"
              />
            </motion.div>
            
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mb-2">
              ورود به حساب کاربری
            </h1>
            
            <AnimatePresence mode="wait">
              <motion.p 
                key={step}
                className="text-white/80 text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {step === 'login' && 'شماره همراه خود را وارد کنید'}
                {step === 'verify' && 'کد تایید ارسال شده را وارد کنید'}
                {step === 'signup' && 'اطلاعات خود را تکمیل کنید'}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Step Indicator */}
          <StepIndicator currentStep={step} steps={steps} />

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-100 p-4 rounded-2xl mb-6 flex items-center"
              >
                <AlertCircle size={20} className="ml-2 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Forms */}
          <AnimatePresence mode="wait">
            {/* Login Step */}
            {step === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-6">
                  <div className="relative">
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      شماره همراه
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="09123456789"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:bg-white/20 focus:border-white/40 transition-all duration-300"
                        dir="ltr"
                      />
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
                    </div>
                  </div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={handlePhoneSubmit}
                      disabled={loading || !phoneNumber}
                      className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-2xl shadow-lg disabled:opacity-50 transition-all duration-300"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin ml-2" />
                          در حال بررسی...
                        </div>
                      ) : (
                        'ادامه'
                      )}
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Signup Step */}
            {step === 'signup' && (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-6">
                  <div className="relative">
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      نام و نام خانوادگی
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="نام کامل خود را وارد کنید"
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:bg-white/20 focus:border-white/40 transition-all duration-300"
                      />
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      کد تایید
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="کد ارسال شده را وارد کنید"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:bg-white/20 focus:border-white/40 transition-all duration-300"
                        dir="ltr"
                      />
                      <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
                    </div>
                  </div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={handleSignupSubmit}
                      disabled={loading || !userInfo.name || !verificationCode}
                      className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-2xl shadow-lg disabled:opacity-50 transition-all duration-300"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin ml-2" />
                          در حال ثبت نام...
                        </div>
                      ) : (
                        'تکمیل ثبت نام'
                      )}
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Verify Step */}
            {step === 'verify' && (
              <motion.div
                key="verify"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="text-white" size={24} />
                    </div>
                    <p className="text-white/80 text-sm">
                      کد تایید به شماره {phoneNumber} ارسال شد
                    </p>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      کد تایید
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="کد ۶ رقمی"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:bg-white/20 focus:border-white/40 transition-all duration-300 text-center text-lg tracking-wider"
                        dir="ltr"
                        maxLength={6}
                      />
                      <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
                    </div>
                  </div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={handleVerificationSubmit}
                      disabled={loading || !verificationCode}
                      className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-2xl shadow-lg disabled:opacity-50 transition-all duration-300"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin ml-2" />
                          در حال تایید...
                        </div>
                      ) : (
                        'تایید و ورود'
                      )}
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Divider */}
          <div className="my-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gradient-to-r from-transparent via-indigo-900/50 to-transparent text-white/70">
                  یا ادامه با
                </span>
              </div>
            </div>
          </div>

          {/* Google Login */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => signIn("google")}
              className="w-full py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 rounded-2xl transition-all duration-300"
            >
              <FaGoogle className="ml-2" />
              ورود با گوگل
            </Button>
          </motion.div>

          {/* Footer */}
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-white/60 text-sm">
              مشکلی دارید؟{" "}
              <button
                onClick={() => setStep('login')}
                className="text-blue-300 hover:text-blue-200 font-medium underline transition-colors"
              >
                ویرایش شماره
              </button>
            </p>
          </motion.div>
        </GlassCard>
      </div>
    </div>
  );
};

export default LoginClient;
