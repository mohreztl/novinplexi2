"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Store , User, Menu, List } from "lucide-react";
import useMobileMenuStore from "@/store/useMobileMenuStore";
import CartIconMobileBottom from "./CartIconMobileBottom"
export default function MobileBottomNav({ cartCount = 0 }) {
  const openMenu = useMobileMenuStore((state) => state.openMenu);
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  const navItems = [
    {
      name: "خانه",
      href: "/",
      icon: <Home className="w-6 h-6" />,
      activeIcon: <Home className="w-6 h-6" />,
    },
    {
      name: "فروشگاه",
      href: "/products",
      icon: <Store  className="w-6 h-6" />,
      activeIcon: <Store  className="w-6 h-6" />,
    },
    {
      name: "سبد خرید",
href:"#",
      icon: <CartIconMobileBottom />,
      activeIcon: <CartIconMobileBottom />,
      badge: cartCount,
    },
    {
      name: "پروفایل",
      href: "/profile",
      icon: <User className="w-6 h-6" />,
      activeIcon: <User className="w-6 h-6" />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-50 md:hidden">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item, index) => (
          
          <Link
            key={index}
            href={item.href}
            className={`flex flex-col items-center justify-center w-full h-full relative transition-colors ${
              isActive(item.href)
                ? "text-[#31508c]"
                : "text-gray-500 hover:text-[#31508c]"
            }`}
          >
            <div className="relative">
              {isActive(item.href) ? item.activeIcon : item.icon}
              {item.badge > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#ffd700] text-[#31508c] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border border-white">
                  {item.badge > 9 ? "9+" : item.badge}
                </span>
              )}
            </div>
            <span className="text-[12px] mt-1">{item.name}</span>
            {isActive(item.href) && (
              <div className="absolute top-0 w-1/2 h-1 bg-[#31508c] rounded-b-full" />
            )}
          </Link>
        ))}

        <button
          onClick={openMenu}
          className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
            pathname === "/menu"
              ? "text-[#31508c]"
              : "text-gray-500 hover:text-[#31508c]"
          }`}
        >
          <Menu className="w-6 h-6" />
          <span className="text-[10px] mt-1">منو</span>
          {pathname === "/menu" && (
            <div className="absolute top-0 w-1/2 h-1 bg-[#31508c] rounded-b-full" />
          )}
        </button>
      </div>
    </nav>
  );
}