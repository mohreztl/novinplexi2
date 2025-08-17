import React from "react";
import { Clock, Star, TrendingUp, Users } from "lucide-react";
import Image from "next/image";

import ReviewImg from "@/public/profile.jpg";
import Link from "next/link";

const AboutPage = () => {
  const categories = [
    { name: "Luxury", image: "/gallery8.webp", link: "/products/brand/rolex" },
    { name: "Sports", image:"/gallery7.webp", link: "/products/brand/patekphilipe" },
    { name: "Classic", image: "/gallery6.webp", link: "/products/brand/audemarspiguet" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <header className="bg-primary text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
          درباره نوین پلکسی
          </h1>
          <p className="text-xl md:text-2xl mb-8">
        نوین پلکسی نوین پلکسی
          </p>
          <Image
            width={450}
            height={450}
            src="/blog2.webp"
            alt="EcommWatch storefront"
            className="rounded-lg shadow-lg mx-auto"
          />
        </div>
      </header>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            داستان ما
          </h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <Image
                width={400}
                height={400}
                src="/blog2.jpg"
                alt="Founder's image"
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <p className="text-lg mb-4">
    نوین پلکسی در راستای خدمت به شما مردمان عزیز و ارائه بهترین محصولات با کمترین هزینه به شما مردمان عزیز ایران میباشد
              </p>
              <p className="text-lg">
              نوین پلکسی در راستای خدمت به شما مردمان عزیز و ارائه بهترین محصولات با کمترین هزینه به شما مردمان عزیز ایران میباشد
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
  ارزش های ما
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Clock className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">بهترین کیفیت</h3>
              <p>
               نوین پلکسی در تلاش است بهترین کیفیت محصولات موجود را ارائه دهد
              </p>
            </div>
            <div className="text-center">
              <Users className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Customer First</h3>
              <p>
              نوین پلکسی در تلاش است بهترین کیفیت محصولات موجود را ارائه دهد
              </p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">
         بهترین قیمت
              </h3>
              <p>
              نوین پلکسی در تلاش است بهترین قیمت محصولات موجود را ارائه دهد
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Collection Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
       موجودی کامل
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <Link href={category.link}>
                  <Image
                    src={category.image}
                    alt={`${category.name} watches`}
                    className="w-full h-48 object-cover"
                    width={500}
                    height={500}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {category.name} کاغذ دیواری
                    </h3>
                    {/* <p className="text-gray-600">
                      Discover our exquisite range of{" "}
                      {category.name.toLowerCase()} timepieces, crafted for the
                      discerning collector.
                    </p> */}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-blue-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
           مشتریان ما چه میگویند
          </h2>
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-4">
              <Image
                width={500}
                height={500}
                src={ReviewImg}
                alt="Customer"
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h4 className="text-xl font-semibold">سعیده تهرانی</h4>
                <p className="text-gray-600">طرح مدرن و عالی</p>
              </div>
            </div>
            <p className="text-lg italic">
       کیفیت محصولات عالی بود
            </p>
            <div className="flex mt-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 text-yellow-400 fill-current"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
          به خانواده نوین پلکسی بپیوندید
          </h2>
          <p className="text-xl mb-8">
خونتو به سلیقه خودت با کمک نوین پلکسی زیبا کن 
          </p>
          <button className="bg-white text-primary font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-100 transition duration-300">
            <Link href={"/products/brand/rolex"}>مشاهده محصولات</Link>
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
