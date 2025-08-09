
import { Suspense } from "react";
import ClientOnly from "@/components/ClientOnly";
import LoginClient from "./LoginClient";

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        <p className="text-white text-lg font-medium">در حال بارگذاری فرم لاگین...</p>
      </div>
    </div>
  </div>
);

export default function LoginPage() {
  return (
    <ClientOnly fallback={<LoadingSpinner />}>
      <Suspense fallback={<LoadingSpinner />}>
        <LoginClient />
      </Suspense>
    </ClientOnly>
  );
}