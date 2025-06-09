import React from "react";
import Link from "next/link";
import { ShoppingBag, ChevronDown, UsersRound, Newspaper, Phone } from 'lucide-react';
import PropTypes from 'prop-types';

const NavbarLinks = ({ session, productOpen, setProductOpen, setAdmin }) => {
  return (
    <ul className="hidden md:flex items-center gap-1 mx-6 my-2">
      {/* لینک محصولات */}
      <li className="h-full flex items-center">
        <Link
          href="/products"
          className="flex items-center gap-1.5 group relative px-4 py-2 rounded-full hover:bg-[#31508c]/10 transition-colors h-full"
          onMouseEnter={() => setProductOpen(true)}
          onClick={() => setProductOpen((prev) => !prev)}
        >
          <ShoppingBag className="w-4 h-4 text-[#2c3e50] group-hover:text-[#31508c"/>
          <span className="text-base font-medium text-[#2c3e50] group-hover:text-[#31508c]">
            محصولات
          </span>
          <ChevronDown className={`w-4 h-4 mt-0.5 text-[#31508c]/70 transition-transform ${productOpen ? 'rotate-180' : ''}`} />
          <span className="absolute bottom-1 right-4 h-[2px] w-[calc(100%-2rem)] bg-[#ffd700] transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-right"></span>
        </Link>
      </li>

      {/* لینک مقالات */}
      <li className="h-full flex items-center">
        <Link
          href="/blog"
          className="flex items-center gap-1.5 group relative px-4 py-2 rounded-full hover:bg-[#31508c]/10 transition-colors h-full"
        >
          <Newspaper className="w-4 h-4 text-[#2c3e50] group-hover:text-[#31508c" />
          <span className="text-base font-medium text-[#2c3e50] group-hover:text-[#31508c]">
            مقالات
          </span>
          <span className="absolute bottom-1 right-4 h-[2px] w-[calc(100%-2rem)] bg-[#ffd700] transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-right"></span>
        </Link>
      </li>

      {/* لینک تماس با ما */}
      <li className="h-full flex items-center">
        <Link
          href="/contact"
          className="flex items-center gap-1.5 group relative px-4 py-2 rounded-full hover:bg-[#31508c]/10 transition-colors h-full"
        >
          <Phone className="w-4 h-4 text-[#2c3e50] group-hover:text-[#31508c" />
          <span className="text-base font-medium text-[#2c3e50] group-hover:text-[#31508c]">
            تماس با ما
          </span>
          <span className="absolute bottom-1 right-4 h-[2px] w-[calc(100%-2rem)] bg-[#ffd700] transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-right"></span>
        </Link>
      </li>

      {/* لینک درباره ما */}
      <li className="h-full flex items-center">
        <Link
          href="/about"
          className="flex items-center gap-1.5 group relative px-4 py-2 rounded-full hover:bg-[#31508c]/10 transition-colors h-full"
        >
          <UsersRound className="w-4 h-4 text-[#2c3e50] group-hover:text-[#31508c" />
          <span className="text-base font-medium text-[#2c3e50] group-hover:text-[#31508c]">
            درباره ما
          </span>
          <span className="absolute bottom-1 right-4 h-[2px] w-[calc(100%-2rem)] bg-[#ffd700] transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-right"></span>
        </Link>
      </li>

      {/* پنل ادمین */}
      {session?.user?.admin && (
        <li className="h-full flex items-center">
          <button
            onClick={() => setAdmin((prev) => !prev)}
            className="flex items-center gap-1.5 group relative px-4 py-2 rounded-full hover:bg-[#31508c]/10 transition-colors h-full border border-[#ffd700]"
          >
            <span className="text-base font-medium text-[#2c3e50]">
              پنل مدیریت
            </span>
            <span className="absolute bottom-1 right-4 h-[2px] w-[calc(100%-2rem)] bg-[#ffd700] transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-right"></span>
          </button>
        </li>
      )}
    </ul>
  );
};

NavbarLinks.propTypes = {
  session: PropTypes.object,
  productOpen: PropTypes.bool.isRequired,
  setProductOpen: PropTypes.func.isRequired,
  setAdmin: PropTypes.func.isRequired,
};

export default NavbarLinks;