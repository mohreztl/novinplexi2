"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Menu, X, SearchCheckIcon } from "lucide-react";
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
  // const [isOpen, setIsOpen] = useState(false);
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
  const user = session?.user;

  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  //open menu store
  const { isOpen, openMenu, closeMenu } = useMobileMenuStore();

  //
  console.log("categories nav:", categories);
  useEffect(() => {
    const fetchCategories = async () => {
      console.log("categories nav:", categories);
      try {
        const res = await axios.get("/api/categories");
        setCategories(res.data.categories);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuOpen = () => {
    closeMenu();
  };

  const setProductModile1 = () => {
    setProductModile(!productModile);
  };

  const setAdminPanelMobile = () => {
    setAdminPanelMob(!adminPanelMob);
  };

  // const setMenuClose = () => {
  //   setIsOpen(!isOpen);
  // };

  const handleSearchClick = () => {
    setSearchOpen(true);
    setProductOpen(false);
  };

  function debounce(func, timeout = 1000) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  const debounceSearch = debounce((currentSearchTerm) => {
    handleSubmit(currentSearchTerm);
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchTerm((prevState) => ({ ...prevState, [name]: value }));
    debounceSearch(value);
  };

  const handleSubmit = async (search) => {
    if (!search) return;
    setIsSearching(true);
    try {
      const res = await axios.get(`/api/products/${search}`);
      setIsSearching(false);
      if (res.status === 200) {
        setResultArr(res.data);
      }
    } catch (error) {
      setIsSearching(false);
      console.log(error);
    }
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
  };

  useEffect(() => {
    if (searchTerm.search !== "") {
      handleSubmit(searchTerm.search);
    }
    if (searchTerm.search === "") {
      setResultArr([]);
    }
  }, [searchTerm]);

  return (
    <header className=" w-full max-w-full h-[48px] md:h-[142px] bg-[#f9f9f9] md:pt-8 pt-1 mx-0 shadow-[10px_6px_40px_1px_#00000040]  font-yekanbakh">
    <nav className="md:w-full w-[410px] h-full px-24 mx-0 md:px-14   ">
      <div className=" h-[52px] ">
        <div
          className={` md:hidden flex justify-center fixed w-full  right-0 z-50  transition-all duration-300  px-4 overflow-x-hidden  ${
            isScrolled
              ? "bg-gray-100 opacity-90 shadow-lg top-0"
              : "shadow-none"
          }`}
        >
         
          <Image
            alt="s"
            onClick={() => router.push("/")}
            src="/logo1.svg"
            width={140}
            height={38}
            className=" cursor-pointer"
          />

          
        </div>


          <div
            className={`hidden md:flex fixed top-0  w-full z-50 transition-all duration-300 ${
              isScrolled
                ? "bg-gray-100 opacity-90 py-2 h-[60px] shadow-lg left-0 px-8"
                : " shadow-none py-6 left-6 px-14"
            }`}
          >
            <SearchDrawer
              searchOpen={searchOpen}
              searchTerm={searchTerm}
              handleChange={handleChange}
              handleSearchClose={handleSearchClose}
              firstTwelveItems={firstTwelveItems}
              resultArr={resultArr}
            />
            <ProductDrawer
              productOpen={productOpen}
              setProductOpen={setProductOpen}
              categories={categories}
              setCategory={setActiveCategory}
              activeCategory={activeCategory}
            />
            <div className="flex justify-between h-[72px] w-full px-8">
              <div className="mt-[-8px]  mr-10  ">
                <Image
                  alt="s"
                  onClick={() => router.push("/")}
                  src="/logo1.svg"
                  width={210}
                  height={45}
                  className="cursor-pointer object-cover p-2 "
                />
              </div>
              <div className={`flex items-center gap-2 ${isScrolled ?"bg-transparent border-none mb-5 ": "bg-white/90" }  backdrop-blur-md rounded-full px-3 py-1.5 shadow-sm border border-gray-100`}>
  {/* جستجو */}
  <div className="relative flex-1 max-w-xs">
    <Input
      onClick={handleSearchClick}
      placeholder="جستجو..."
      className="pl-9 pr-3 py-1.5 text-sm rounded-full bg-gray-50 border-gray-200 hover:border-[#31508c]/50 focus:border-[#31508c] focus:ring-1 focus:ring-[#31508c]/20 transition-all"
      aria-label="جستجوی محصولات"
    />
    <SearchCheckIcon className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-[#31508c]/70 w-4 h-4" />
  </div>
                {/* آیکون سبد خرید */}
                <button
                  aria-label="سبد خرید"
                  className=" text-gray-700 transition-colors hover:text-primary-600 relative mr-3"
                >
                  <CartIcon  />
                </button>
                {/* بخش کاربر */}
                <div className="ml-3">
    <UserSection session={session} />
  </div>
              </div>
            </div>
          </div>
        </div>
        <NavbarLinks
          session={session}
          productOpen={productOpen}
          setProductOpen={setProductOpen}
          setAdmin={setAdmin}
        />
        <div
          onMouseEnter={() => setAdmin(true)}
          onMouseLeave={() => setAdmin(false)}
        >
          <AdminDrawer
            admin={admin}
            category={categories}
            setCategory={setCategories}
          />
        </div>
        <MobileMenu
          isOpen={isOpen}
          setMenuClose={closeMenu}
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
          searchTerm={searchTerm}
          handleChange={handleChange}
          handleSearchClose={handleSearchClose}
          firstTwelveItems={firstTwelveItems}
          resultArr={resultArr}
          productModile={productModile}
          setProductModile={setProductModile}
          setAdminPanelMob={setAdminPanelMob}
          session={session}
          user={user}
          adminPanelMob={adminPanelMob}
          categories={categories}
        />
      </nav>
    </header>
  );
};

export default Navbar;
