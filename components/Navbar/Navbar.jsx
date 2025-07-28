"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CartIcon from "../CartIcon";
import CartIconMobile from "../CartIconMobile";
import SearchDrawer from "./SearchDrawer";
import ProductDrawer from "./ProductDrawer";
import AdminDrawer from "./AdminDrawer";
import MobileMenu from "./MobileMenu";
import NavbarLinks from "./NavbarLinks";
import UserSection from "./UserSection";
import { Input } from "../ui/input";
import Loader from "../ui/Loader";
import useMobileMenuStore from "@/store/useMobileMenuStore";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [productOpen, setProductOpen] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [adminPanelMob, setAdminPanelMob] = useState(false);
  const [productModile, setProductModile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState({ search: "" });
  const [resultArr, setResultArr] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const firstTwelveItems = resultArr.slice(0, 12);
  const [isSearching, setIsSearching] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const user = session?.user;
  const [categories, setCategories] = useState([]);
  const { isOpen, openMenu, closeMenu } = useMobileMenuStore();

  // Fetch categories effect
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/categories");
        setCategories(res.data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 \${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-md border-b border-blue-100"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto md:px-8 px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 z-30">
            <div className="flex items-center justify-center">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 p-1 shadow-lg">
                <div className="flex h-full w-full items-center justify-center rounded-lg bg-white/90 backdrop-blur-sm">
                  <div className="h-8 w-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-md"></div>
                </div>
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                نیکو دکور
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:space-x-6">
            <NavbarLinks
              categories={categories}
              setProductOpen={setProductOpen}
              setCategory={setCategory}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Desktop Search */}
            <div className="hidden lg:block">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="جستجو محصولات..."
                  className="w-64 rounded-full border border-blue-200 bg-white/80 py-2 pl-10 pr-4"
                  value={searchTerm.search}
                  onChange={(e) => setSearchTerm({ search: e.target.value })}
                  onFocus={() => setSearchOpen(true)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex space-x-2">
              <CartIcon />
              <UserSection session={session} admin={admin} setAdmin={setAdmin} />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="rounded-lg p-2 text-gray-700 hover:bg-blue-50 md:hidden"
              onClick={() => openMenu()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <MobileMenu
            categories={categories}
            setProductModile={setProductModile}
            setCategory={setCategory}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isOpen={isOpen}
            closeMenu={closeMenu}
          />
        )}
      </AnimatePresence>

      {/* Drawers */}
      <SearchDrawer
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        searchTerm={searchTerm}
        resultArr={firstTwelveItems}
        isSearching={isSearching}
      />
      <ProductDrawer
        productOpen={productOpen}
        setProductOpen={setProductOpen}
        category={category}
      />
      <AdminDrawer
        admin={admin}
        setAdmin={setAdmin}
        session={session}
      />

      {/* Mobile Cart */}
      <CartIconMobile />
    </nav>
  );
};

export default Navbar;
