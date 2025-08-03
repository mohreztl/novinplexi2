"use client"
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  FileText,
  ChevronDown,
  Menu,
  X,
  Folder
} from 'lucide-react';
import Image from 'next/image';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      title: 'داشبورد',
      href: '/adminnovin',
      icon: LayoutDashboard
    },
    {
      title: 'محصولات',
      href: '/adminnovin/products',
      icon: Package
    },
    {
      title: 'دسته‌بندی‌ها',
      href: '/adminnovin/category',
      icon: Folder
    },
    {
      title: 'سفارشات',
      href: '/adminnovin/orders',
      icon: ShoppingCart
    },
    {
      title: 'کاربران',
      href: '/adminnovin/users',
      icon: Users
    },
    {
      title: 'وبلاگ',
      href: '/adminnovin/blog',
      icon: FileText
    },
    {
      title: 'تنظیمات',
      href: '/adminnovin/settings',
      icon: Settings
    }
  ];

  const isActiveLink = (href) => pathname === href;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-white shadow-lg lg:hidden"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar Container */}
      <aside
        className={`
          fixed top-0 right-0 z-40 h-screen
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
          bg-white border-l border-gray-200 shadow-lg
          transition-all duration-300 ease-in-out
        `}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <Link href="/adminnovin" className="flex items-center gap-2">
            <Image
              src="/logo1.svg"
              alt="نوین پلکسی"
              width={40}
              height={40}
              className="rounded-lg"
            />
            {!isCollapsed && (
              <span className="text-xl font-bold text-gray-800">نوین پلکسی</span>
            )}
          </Link>
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -left-3 top-20 bg-white rounded-full p-1 border border-gray-200 shadow-md hidden lg:block"
        >
          <ChevronDown
            className={`w-4 h-4 transform transition-transform ${
              isCollapsed ? '-rotate-90' : '90'
            }`}
          />
        </button>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-200
                  ${isActiveLink(item.href)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'}
                `}
              >
                <Icon className={`w-6 h-6 ${isCollapsed ? 'mx-auto' : ''}`} />
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
