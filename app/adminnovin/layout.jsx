"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "@/components/adminnovin/Sidebar";
import ClientOnly from "@/components/ClientOnly";
import "@/app/globals.css";

function AdminLayoutContent({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (!session) {
      router.push("/login");
      return;
    }

    if (!session.user.admin) {
      router.push("/403");
      return;
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (!session || !session.user.admin) {
    return null; // Will be redirected
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <main className="flex-1 lg:mr-64 transition-all duration-300">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function AdminLayout({ children }) {
  return (
    <ClientOnly>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </ClientOnly>
  );
}
