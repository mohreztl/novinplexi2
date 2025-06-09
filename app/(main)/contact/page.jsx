import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,

  Headphones,
} from "lucide-react";
import Image from "next/image";

import ContactOffice from "@/public/contact-office.jpg";
const ContactPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <header className="bg-blues text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
         راه های تماس با نیکو دکور
          </h1>
          <p className="text-xl md:text-2xl mb-8">
نیکو دکور برای راهنمایی بیشتر در اختیار شما عزیزان می باشد
          </p>
          <Image
          alt="s"
         
          src="/logo1.svg"
          width={340}
          height={55}
          className="cursor-pointer object-cover p-2  hidden md:block self-center"
        />
        </div>
      </header>

      {/* Contact Information Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
         با ما در تماس باشید
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-blues" />
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p>تهران سبلان جنوبی کوچه عباسی پلاک 27 واحد 2</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Phone className="w-12 h-12 mx-auto mb-4 text-blues" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p>(021)77258915</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Mail className="w-12 h-12 mx-auto mb-4 text-blues" />
              <h3 className="text-xl font-semibold mb-2">ایمیل</h3>
              <p>support@nikodecor.com</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Clock className="w-12 h-12 mx-auto mb-4 text-blues" />
              <h3 className="text-xl font-semibold mb-2">ساعات کاری مجموعه</h3>
              <p>
             شنبه تا چهارشنبه:9:00 الی 20:00
                <br />
           پنجشنبه :9:00 الی 14:00
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Support Channels Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 justify-self-center">
              <Image
                width={500}
                height={500}
                src={ContactOffice}
                alt="Our support team"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
               کانال پشتیبانی نیکو دکور
              </h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <MessageCircle className="w-8 h-8 text-blues mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold">چت انلاین</h3>
                    <p>با متخصصان مجموعه در تماس باشید</p>
                  </div>
                </div>
                <div className="flex items-center">
            
                </div>
                <div className="flex items-center">
                  <Headphones className="w-8 h-8 text-blues mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold">تماس تلفنی</h3>
                    <p>با مجموعه نیکو دکور تماس بگیرید</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            پرسش و پاسخ سریع
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">
         روش های ارسال چگونه است
              </h3>
              <p>
         در تهران امکان ارسال با پیک موجود میباشد و در شهرستان ها ارسال با پست می باشد
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">
        ایا حم و نقل تخفیف دارد؟
              </h3>
              <p>
            بله برای خرید های بالای 2 میلیون ارسال رایگان میباشد
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
           شرایط مرجوعی کالا به چه صورت میباشد؟
              </h3>
              <p>
          اگر کالا به صورت فیزیکی ایراد داشته باشد مجموعه نیکو دکور محصول را مرجوع میکند
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-blues text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
    با نیکو دکور بروز بشید و از محصولات و تخفیف های مجموعه با خبر شوید
          </h2>
          <p className="text-xl mb-8">
      ثبت نام در خبر نامه نیکو دکور
          </p>
          <form className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="ایمیل خود را وارد کنید"
              className="flex-grow p-2 rounded-l-full"
            />
            <button
              type="submit"
              className="bg-white text-blues font-bold py-2 px-6 rounded-r-full hover:bg-blue-100 transition duration-300"
            >
              <Send className="w-6 h-6" />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
