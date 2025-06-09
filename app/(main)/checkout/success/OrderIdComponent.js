"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function OrderIdComponent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const trackId = searchParams.get("trackId");
  if (orderId) {
    return (
      <div className="flex">
        <span>{trackId}</span>
      <Link
        href={`/orders/${orderId}`}
        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
      >
مشاهده سفارش 
      </Link>
      </div>
    );
  } else {
    return <p className="text-sm text-gray-500">جزئیات سفارش یافت نشد</p>;
  }
}
