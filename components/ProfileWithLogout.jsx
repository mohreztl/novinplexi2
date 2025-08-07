import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const ProfileWithLogout = ({ user }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex justify-center items-center pr-4">
      <div 
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* تصویر پروفایل کاربر */}
        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary hover:border-secondary transition-all duration-200 cursor-pointer mx-auto">
          <Image
            src={user?.image || "/profile_result.webp"}
            width={40}
            height={40}
            alt="Profile Picture"
            className="object-cover w-full h-full"
            unoptimized
          />
        </div>

        {/* منوی dropdown - تغییرات اصلی اینجا اعمال شده */}
        {isHovered && (
          <div className="absolute z-50 top-full left-1/2 transform -translate-x-1/2 mt-0 w-40 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden">
            <div className="p-1">
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-primary hover:bg-primary/10 rounded-md transition-colors text-center"
              >
                حساب کاربری
              </Link>
              
              <Button
                onClick={() => signOut()}
                className="w-full mt-1 bg-gradient-to-r from-secondary to-[#ffc800] hover:from-[#ffc800] hover:to-[#ffb700] text-primary font-medium text-sm py-2 transition-all"
              >
                خروج
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileWithLogout;