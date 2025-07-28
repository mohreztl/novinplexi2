"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaSquareInstagram, FaSquareXTwitter, FaTelegram } from "react-icons/fa6";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  {
    icon: <FaSquareInstagram className="w-8 h-8 text-gray-100 hover:text-[#E1306C]" />,
    label: "Instagram",
    url: "#"
  },
  {
    icon: <FaSquareXTwitter className="w-8 h-8 text-gray-100 hover:text-black hover:bg-white" />,
    label: "Twitter",
    url: "#"
  },
  {
    icon: <FaTelegram className="w-8 h-8 text-gray-100 hover:text-[#0088cc]" />,
    label: "Telegram",
    url: "#"
  },
];

const contactInfo = [
  { 
    icon: <Phone className="w-6 h-6 text-gold" />, 
    text: "۰۹۱۲-۸۵۸-۶۰۱۶",
    url: "tel:+989128586016" 
  },
  {
    icon: <MapPin className="w-6 h-6 text-gold" />,
    text: "تهران، تهرانپارس، خیابان شهید زهدی، کوچه کریمی، پلاک ۲۰",
    url: "#"
  },
  {
    icon: <Mail className="w-6 h-6 text-gold" />,
    text: "support@nikodecor.com",
    url: "mailto:support@nikodecor.com"
  },
];

const footerLinks = [
  { text: "محصولات", link: "/products" },
  { text: "سایر محصولات", link: "/products" },
  { text: "وبلاگ", link: "/blog" },
];

const policyLinks = [
  { link: "/about", text: "درباره ما" },
  { link: "/contact", text: "تماس با ما" },
  { link: "/terms", text: "شرایط و ضوابط" },
  { link: "/shipping", text: "حمل و نقل" },
];

export default function Footer() {
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add newsletter subscription logic
  };

  return (
    <footer className="w-full bg-blues bg-opacity-95 backdrop-blur-lg">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between bg-blues rounded-3xl p-8 shadow-xl">
          <div className="lg:w-1/2 text-center lg:text-right">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              از آخرین تخفیف‌ها با خبر شوید
            </h2>
            <p className="text-gray-200 text-sm lg:text-base leading-relaxed">
              با عضویت در خبرنامه نیکودکور اولین نفری باشید که از جدیدترین محصولات،
              پیشنهادات ویژه و رویدادهای انحصاری مطلع می‌شوید.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="lg:w-1/2 w-full max-w-lg">
            <div className="relative flex bg-white rounded-full overflow-hidden">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="آدرس ایمیل خود را وارد کنید"
                className="h-14 lg:h-16 pl-24 pr-6 text-lg border-0 focus-visible:ring-0"
                required
              />
              <Button
                type="submit"
                className="absolute left-0 h-14 lg:h-16 w-20 lg:w-24 bg-gold hover:bg-gold/90 text-blues rounded-full text-lg font-bold shadow-lg"
              >
                عضویت
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-black/90 py-12">
        <div className="container mx-auto px-4 grid lg:grid-cols-4 gap-8">
          {/* Brand Info & Social */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <Link href="/" className="w-48 mx-auto lg:mx-0">
              <Image
                src="/logo1.svg"
                alt="Niko Decor"
                width={200}
                height={50}
                className="invert hover:opacity-90 transition-opacity"
              />
            </Link>
            
            <div className="flex justify-center lg:justify-start gap-4">
              {socialLinks.map((item, index) => (
                <Link
                  key={index}
                  href={item.url}
                  className="p-2 hover:scale-110 transition-transform"
                  aria-label={item.label}
                >
                  {item.icon}
                </Link>
              ))}
            </div>

            <p className="text-gray-400 text-center lg:text-right text-sm leading-relaxed">
              نوین پلکسی با بیش از یک دهه تجربه، پیشرو در طراحی و اجرای مدرن‌ترین
              طرح‌های کاغذ دیواری در ایران
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1 flex flex-col items-center lg:items-start gap-4">
            <h3 className="text-xl font-bold text-white mb-2">دسترسی سریع</h3>
            {footerLinks.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="text-gray-300 hover:text-gold transition-colors text-sm"
              >
                {item.text}
              </Link>
            ))}
          </div>

          {/* Policies */}
          <div className="lg:col-span-1 flex flex-col items-center lg:items-start gap-4">
            <h3 className="text-xl font-bold text-white mb-2">اطلاعات بیشتر</h3>
            {policyLinks.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="text-gray-300 hover:text-gold transition-colors text-sm"
              >
                {item.text}
              </Link>
            ))}
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1 flex flex-col items-center lg:items-start gap-4">
            <h3 className="text-xl font-bold text-white mb-2">ارتباط با ما</h3>
            {contactInfo.map((item, index) => (
              <Link
                key={index}
                href={item.url}
                className="flex items-center gap-3 text-gray-300 hover:text-gold transition-colors text-sm"
              >
                <span className="shrink-0">{item.icon}</span>
                <span className="text-right">{item.text}</span>
              </Link>
            ))}

            {/* Trust Seal */}
            <div className="bg-slate-200 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] border-slate-700 rounded-xl p-3 "><a
              referrerPolicy="origin"
                target="_blank"
                href="https://trustseal.enamad.ir/?id=567184&Code=OeEFuF2S1MCxN9lft4YpMppzym3739hm"
              >
                <Image
                  referrerPolicy="origin"
                  src="/enamad.png"
                  alt=""
                  className=" cursor-pointer"
                  code="OeEFuF2S1MCxN9lft4YpMppzym3739hm"
                width={100}
                height={100}
                />
              </a>
              </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-blues/95 py-4">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-white/90">
            © {new Date().getFullYear()} کلیه حقوق برای 
            <Link href="/" className="text-gold hover:text-gold/80 mx-1">
       نیکودکور
            </Link>
            محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
}