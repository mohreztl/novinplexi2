import React from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProfileWithLogout from "../ProfileWithLogout";
import { User, LogIn } from 'lucide-react';

const UserSection = ({ session }) => {
  return (
    <div className="relative group">
      {session ? (
        <ProfileWithLogout />
      ) : (
        <Button
          asChild
          variant="outline"
          className={`
            flex items-center justify-center gap-2 px-6 py-3 rounded-full 
            text-sm transition-all duration-300
            border-[#31508c] text-[#31508c] hover:bg-[#31508c] hover:text-white
            focus:ring-2 focus:ring-[#31508c] focus:ring-offset-2
            ${session ? 'bg-[#ffd700]' : 'bg-transparent'}
          `}
        >
          <Link href="/login">
            <LogIn className="h-5 w-5" />
            <span className="text-base font-semibold">ورود | ثبت نام</span>
          </Link>
        </Button>
      )}
    </div>
  );
};

UserSection.propTypes = {
  session: PropTypes.object
};

export default UserSection;