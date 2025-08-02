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


const ContactPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <header className="bg-blues text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
         راه های تماس با نوین پلکسی
          </h1>
          <p className="text-xl md:text-2xl mb-8">
نوین پلکسی برای راهنمایی بیشتر در اختیار شما عزیزان می باشد
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

      {/* Contact Buttons Section */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
            راه‌های ارتباط سریع
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            همین الان با ما در تماس باشید
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Phone Call Button */}
            <a 
              href="tel:02177258915" 
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">تماس تلفنی</h3>
              <p className="text-gray-600 mb-4">021-77258915</p>
              <div className="bg-blue-600 text-white px-6 py-2 rounded-full group-hover:bg-blue-700 transition-colors">
                همین الان تماس بگیرید
              </div>
            </a>

            {/* WhatsApp Button */}
            <a 
              href="https://wa.me/989123456789" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center border border-gray-100 hover:border-green-200 transform hover:-translate-y-1"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.886 3.488"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">واتساپ</h3>
              <p className="text-gray-600 mb-4">پیام در واتساپ</p>
              <div className="bg-green-600 text-white px-6 py-2 rounded-full group-hover:bg-green-700 transition-colors">
                ارسال پیام
              </div>
            </a>

            {/* Telegram Button */}
            <a 
              href="https://t.me/novinplexi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">تلگرام</h3>
              <p className="text-gray-600 mb-4">کانال تلگرام ما</p>
              <div className="bg-blue-500 text-white px-6 py-2 rounded-full group-hover:bg-blue-600 transition-colors">
                عضویت در کانال
              </div>
            </a>
          </div>
        </div>
      </section>

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
              <p>support@novinplexi.com</p>
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
                src="/logo1.svg"
                alt="Our support team"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
               کانال پشتیبانی نوین پلکسی
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
                  <Headphones className="w-8 h-8 text-blues mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold">تماس تلفنی</h3>
                    <p>با مجموعه نوین پلکسی تماس بگیرید</p>
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
          اگر کالا به صورت فیزیکی ایراد داشته باشد مجموعه نوین پلکسی محصول را مرجوع میکند
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-blues text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
    با نوین پلکسی بروز بشید و از محصولات و تخفیف های مجموعه با خبر شوید
          </h2>
          <p className="text-xl mb-8">
      ثبت نام در خبر نامه نوین پلکسی
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
