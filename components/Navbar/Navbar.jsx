"use client";
import React, { useState, useEffect, useCallback, memo } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  ShoppingBag, 
  User,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Package,
  Wrench,
  ChevronRight
} from "lucide-react";

// Lazy load heavy components
import dynamic from 'next/dynamic';

const CartIcon = dynamic(() => import("../CartIcon"), { ssr: false });
const SearchDrawer = dynamic(() => import("./SearchDrawer"), { ssr: false });
const ProductDrawer = dynamic(() => import("./ProductDrawer"), { ssr: false });
const ServiceDrawer = dynamic(() => import("./ServiceDrawer"), { ssr: false });
const AdminDrawer = dynamic(() => import("./AdminDrawer"), { ssr: false });
const MobileMenu = dynamic(() => import("./MobileMenu"), { ssr: false });
const UserSection = dynamic(() => import("./UserSection"), { ssr: false });

import useMobileMenuStore from "@/store/useMobileMenuStore";

// Contact Section Component for Mega Menus
const ContactSection = () => (
  <div className="border-r border-gray-100 pl-8 pr-6">
    <h4 className="mb-4 text-lg font-bold text-gray-900">تماس با ما</h4>
    <div className="space-y-3">
      <a href="tel:+982112345678" className="flex items-center gap-3 text-sm text-gray-600 transition-colors hover:text-blue-600">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
          <Phone className="h-4 w-4 text-blue-600" />
        </div>
        <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
      </a>
      <a href="mailto:info@novinplexi.com" className="flex items-center gap-3 text-sm text-gray-600 transition-colors hover:text-blue-600">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
          <Mail className="h-4 w-4 text-blue-600" />
        </div>
        <span>info@novinplexi.com</span>
      </a>
      <div className="flex items-start gap-3 text-sm text-gray-600">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
          <MapPin className="h-4 w-4 text-blue-600" />
        </div>
        <span className="flex-1">تهران، خیابان ولیعصر، پلاک ۲۵۴</span>
      </div>
      <div className="flex items-center gap-3 text-sm text-gray-600">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
          <Clock className="h-4 w-4 text-blue-600" />
        </div>
        <span>شنبه تا پنجشنبه: ۹ - ۱۸</span>
      </div>
    </div>
  </div>
);

// Enhanced Navbar Link Component
const NavbarLink = ({ href, children, hasDropdown, isOpen, onClick, icon: Icon }) => (
  <Link
    href={href}
    className="group relative flex items-center gap-2 rounded-full px-5 py-2.5 transition-all hover:bg-white/50 hover:shadow-md"
    onClick={onClick}
  >
    {Icon && <Icon className="h-4 w-4 text-gray-600 transition-colors group-hover:text-blue-600" />}
    <span className="text-base font-medium text-gray-700 transition-colors group-hover:text-blue-600">
      {children}
    </span>
    {hasDropdown && (
      <ChevronDown className={`h-4 w-4 text-gray-500 transition-all duration-300 group-hover:text-blue-600 ${isOpen ? 'rotate-180' : ''}`} />
    )}
    <span className="absolute bottom-0 right-5 h-0.5 w-[calc(100%-2.5rem)] origin-right scale-x-0 bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500 group-hover:scale-x-100" />
  </Link>
);

// Products Mega Menu
const ProductsMegaMenu = ({ categories, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="absolute right-0 top-full mt-2 w-[800px] overflow-hidden rounded-2xl bg-white shadow-2xl"
  >
    <div className="flex">
      <div className="flex-1 p-8">
        <h3 className="mb-6 text-xl font-bold text-gray-900">دسته‌بندی محصولات</h3>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/products?category=${category.slug}`}
              className="group flex items-center gap-3 rounded-lg p-3 transition-all hover:bg-blue-50"
              onClick={onClose}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 transition-colors group-hover:bg-blue-600">
                <Package className="h-5 w-5 text-gray-600 transition-colors group-hover:text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{category.name}</p>
                {category.description && (
                  <p className="text-sm text-gray-500">{category.description}</p>
                )}
              </div>
              <ChevronRight className="mr-auto h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </div>
      <ContactSection />
    </div>
  </motion.div>
);

// Services Mega Menu
const ServicesMegaMenu = ({ services, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="absolute right-0 top-full mt-2 w-[800px] overflow-hidden rounded-2xl bg-white shadow-2xl"
  >
    <div className="flex">
      <div className="flex-1 p-8">
        <h3 className="mb-6 text-xl font-bold text-gray-900">خدمات ما</h3>
        <div className="grid grid-cols-2 gap-4">
          {services.map((service) => (
            <Link
              key={service._id}
              href={`/services/${service.slug}`}
              className="group flex items-center gap-3 rounded-lg p-3 transition-all hover:bg-blue-50"
              onClick={onClose}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 transition-colors group-hover:bg-blue-600">
                <Wrench className="h-5 w-5 text-gray-600 transition-colors group-hover:text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{service.name}</p>
                {service.description && (
                  <p className="text-sm text-gray-500">{service.description}</p>
                )}
              </div>
              <ChevronRight className="mr-auto h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </div>
      <ContactSection />
    </div>
  </motion.div>
);

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [productOpen, setProductOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [adminPanelMob, setAdminPanelMob] = useState(false);
  const [productModile, setProductModile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState({ search: "" });
  const [resultArr, setResultArr] = useState([]);
  const { isOpen, openMenu, closeMenu } = useMobileMenuStore();
  const firstTwelveItems = resultArr.slice(0, 12);
  const [isSearching, setIsSearching] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const user = session?.user;
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);

  // Fetch categories and services
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, servicesRes] = await Promise.all([
          axios.get("/api/categories"),
          axios.get("/api/services")
        ]);
        setCategories(categoriesRes.data.categories || []);
        setServices(servicesRes.data.services || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setCategories([]);
        setServices([]);
      }
    };
    fetchData();
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.mega-menu-container')) {
        setProductOpen(false);
        setServiceOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg"
            : "bg-gradient-to-b from-white/80 to-transparent backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="md:flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className=" space-x-1 z-30 hidden lg:block">
           
               
                <Image
                  src="/logo1.svg"
                  alt="نوین پلکسی"
                  width={68}
                  height={58}
                  className="relative h-14 w-24"
                />
             
             
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-reverse lg:space-x-6">
             
              
              <div className="mega-menu-container relative">
                <NavbarLink
                  href="#"
                  hasDropdown
                  isOpen={productOpen}
                  onClick={(e) => {
                    e.preventDefault();
                    setProductOpen(!productOpen);
                    setServiceOpen(false);
                  }}
                  icon={Package}
                >
                  محصولات
                </NavbarLink>
                <AnimatePresence>
                  {productOpen && (
                    <ProductsMegaMenu 
                      categories={categories} 
                      onClose={() => setProductOpen(false)}
                    />
                  )}
                </AnimatePresence>
              </div>

              <div className="mega-menu-container relative">
                <NavbarLink
                  href="#"
                  hasDropdown
                  isOpen={serviceOpen}
                  onClick={(e) => {
                    e.preventDefault();
                    setServiceOpen(!serviceOpen);
                    setProductOpen(false);
                  }}
                  icon={Wrench}
                >
                  خدمات
                </NavbarLink>
                <AnimatePresence>
                  {serviceOpen && (
                    <ServicesMegaMenu 
                      services={services} 
                      onClose={() => setServiceOpen(false)}
                    />
                  )}
                </AnimatePresence>
              </div>

              <NavbarLink href="/about">
               مقالات
              </NavbarLink>
              
              <NavbarLink href="/contact">
                تماس با ما
              </NavbarLink>
            </div>

            {/* Search and Actions */}
            <div className="flex items-center gap-4">
              {/* Mobile Number (Desktop) */}
              <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100">
                <Phone className="h-4 w-4 text-blue-600" />
                <a href="tel:+989055669567" className="text-sm font-medium text-blue-700 hover:text-blue-800 transition-colors">
                  ۰۹05-566-9567
                </a>
              </div>

              {/* Search Icon (Desktop Only) */}
              <button
                className="hidden lg:flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-blue-600 hover:text-white"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Cart Icon (Desktop Only) */}
              <div className="hidden lg:block">
                <CartIcon />
              </div>

              {/* User Section (Desktop Only) */}
              <div className="hidden lg:block">
                <UserSection session={session} admin={admin} setAdmin={setAdmin} />
              </div>

              {/* Mobile Layout: Menu - Logo - Phone */}
              <div className="flex lg:hidden items-center justify-between w-full h-full pt-5">
                {/* Mobile Menu Button (Right) */}
                <button
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-blue-600 hover:text-white"
                  onClick={() => openMenu()}
                >
                  {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                </button>

                {/* Logo (Center) - Mobile */}
                <Link href="/" className="flex items-center">
                  <Image
                    src="/logo1.svg"
                    alt="نوین پلکسی"
                    width={62}
                    height={62}
                    className="h-12 w-auto"
                  />
                </Link>

                {/* Phone Number (Left) */}
                <a 
                  href="tel:+989055669567" 
                  className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-full border border-blue-100"
                >
                  <Phone className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">۰905566956</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isOpen}
        closeMenu={closeMenu}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        resultArr={resultArr}
        handleChange={(e) => setSearchTerm({ search: e.target.value })}
        handleSearchClose={() => setSearchOpen(false)}
        firstTwelveItems={firstTwelveItems}
        categories={categories}
        services={services}
        session={session}
        user={user}
      />

      {/* Drawers */}
      <SearchDrawer
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        searchTerm={searchTerm}
        handleChange={(e) => setSearchTerm({ search: e.target.value })}
        handleSearchClose={() => setSearchOpen(false)}
        firstTwelveItems={firstTwelveItems}
        resultArr={resultArr}
        isSearching={isSearching}
      />

      <ProductDrawer
        isOpen={productOpen}
        setIsOpen={setProductOpen}
        category={category}
      />

      <ServiceDrawer
        isOpen={serviceOpen}
        setIsOpen={setServiceOpen}
        services={services}
      />

      <AdminDrawer
        admin={admin}
        setAdmin={setAdmin}
        session={session}
      />
    </>
  );
};

export default Navbar;