"use client";

import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
const itemList = [
  {
    icon: (
      <ShoppingBagIcon className="w-10 h-10 md:h-5 md:w-5 border-4 border-primary rounded-full md:rounded-none md:border-none " />
    ),
    name: "داشبورد",
    link: "/adminnovin",
  },

  {
    icon: (
      <PresentationChartBarIcon className="w-10 h-10 md:h-5 md:w-5 border-4 border-primary rounded-full md:rounded-none md:border-none" />
    ),
    name: " ایجاد محصول جدید ",
    link: "/adminnovin/create",
  },

  {
    icon: (
      <ShoppingBagIcon className="w-10 h-10 md:h-5 md:w-5 border-4 border-primary rounded-full md:rounded-none md:border-none" />
    ),
    name: "محصولات",
    link: "/adminnovin/products",
  },
  {
    icon: (
      <ShoppingBagIcon className="w-10 h-10 md:h-5 md:w-5 border-4 border-primary rounded-full md:rounded-none md:border-none" />
    ),
    name: "دسته بندی ها",
    link: "/adminnovin/categories",
  },
  {
    icon: (
      <ShoppingBagIcon className="w-10 h-10 md:h-5 md:w-5 border-4 border-primary rounded-full md:rounded-none md:border-none" />
    ),
    name: " برند ها",
    link: "/adminnovin/brand",
  },
  {
    icon: (
      <InboxIcon className="w-10 h-10 md:h-5 md:w-5 border-4 border-primary rounded-full md:rounded-none md:border-none" />
    ),
    name: "سفارشات",
    link: "/adminnovin/orders",
  },
  {
    icon: (
      <InboxIcon className="w-10 h-10 md:h-5 md:w-5 border-4 border-primary rounded-full md:rounded-none md:border-none" />
    ),
    name: "وبلاگ",
    link: "/adminnovin/blog",
  }, {
    icon: (
      <InboxIcon className="w-10 h-10 md:h-5 md:w-5 border-4 border-primary rounded-full md:rounded-none md:border-none" />
    ),
    name: "ساخت وبلاگ",
    link: "/adminnovin/blog/create",
  },
  
];

export default function Sidebar() {
  const router = useRouter();
  return (
    <div className="h-screen md:w-full max-w-xs p-4 bg-white shadow-lg flex flex-col">
    <div className="mb-4 flex items-center justify-center">
      <Image
        alt="Logo"
        src="/logo1.svg"
        width={200}
        height={55}
        className="cursor-pointer object-cover hidden md:block"
        onClick={() => router.push('/')}
      />
    </div>

    <nav className="flex-1">
      <ul className="space-y-2">
        {itemList.map((item) => (
          <li key={item.name}>
            <Link
              href={item.link}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-primary hover:text-white transition"
            >
              <span className="text-primary">{item.icon}</span>
              <span className="hidden md:inline-block">{item.name}</span>
            </Link>
          </li>
        ))}

        <li>
          <Link
            href="/"
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-red-500 hover:text-white transition"
          >
            <PowerIcon className="w-5 h-5 text-red-500" />
            <span className="hidden md:inline-block">خروج</span>
          </Link>
        </li>
      </ul>
    </nav>
  </div>
  );
}
