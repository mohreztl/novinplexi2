"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Check if user is not authenticated or not an admin
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user && !session.user.admin) {
      router.push("/"); // Redirect non-admin users to home
    }
  }, [session, status, router]);

  // Show loading state while checking authentication
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Only render children if user is authenticated and is admin
  if (status === "authenticated" && session.user.admin) {
    return (
      <div className="min-h-screen">
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    );
  }

  // Return null while redirecting
  return null;
}
