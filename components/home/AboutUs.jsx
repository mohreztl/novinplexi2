"use client";
import React from 'react';
import Image from 'next/image';
import { 
  Award, 
  Users, 
  Clock, 
  CheckCircle, 
  Star,
  Target,
  Heart,
  Shield,
  ArrowRight
} from 'lucide-react';

const AboutUs = () => {
  const achievements = [
    { number: '۱۰+', label: 'سال تجربه', icon: Clock },
    { number: '۱۰۰۰+', label: 'پروژه موفق', icon: CheckCircle },
    { number: '۵۰۰+', label: 'مشتری راضی', icon: Users },
    { number: '۹۸%', label: 'رضایت مندی', icon: Star },
  ];

  const values = [
    {
      icon: Award,
      title: 'کیفیت برتر',
      description: 'استفاده از بهترین مواد اولیه و روش‌های مدرن تولید'
    },
    {
      icon: Target,
      title: 'دقت در جزئیات',
      description: 'توجه ویژه به کوچک‌ترین جزئیات در هر پروژه'
    },
    {
      icon: Heart,
      title: 'مشتری محوری',
      description: 'رضایت مشتریان اولویت اصلی ما در تمام مراحل'
    },
    {
      icon: Shield,
      title: 'اعتماد و ضمانت',
      description: 'ضمانت کتبی و پشتیبانی دائمی از محصولات'
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* عناصر تزئینی پس‌زمینه */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 -left-20 w-32 h-32 bg-indigo-100 rounded-full opacity-30"></div>
        <div className="absolute bottom-10 right-1/4 w-24 h-24 bg-purple-100 rounded-full opacity-25"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* هدر بخش */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            درباره نوین پلکسی
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            ما با بیش از یک دهه تجربه در صنعت پلکسی گلاس، تولیدکننده و عرضه کننده 
            انواع محصولات پلکسی با کیفیت بالا و طراحی مدرن هستیم
          </p>
        </div>

        {/* محتوای اصلی */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* بخش متن */}
          <div>
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                پیشرو در تولید پلکسی گلاس
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                نوین پلکسی با ترکیب تکنولوژی مدرن و دانش فنی عمیق، محصولاتی با کیفیت 
                بی‌نظیر تولید می‌کند. از میزهای مدرن گرفته تا تابلوهای تبلیغاتی، 
                ما همیشه به دنبال ارائه بهترین کیفیت هستیم.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">تولید داخلی</h4>
                    <p className="text-gray-600">تمام محصولات در کارخانه مجهز داخلی تولید می‌شوند</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">طراحی سفارشی</h4>
                    <p className="text-gray-600">امکان طراحی و تولید محصولات بر اساس نیاز مشتری</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">کیفیت تضمینی</h4>
                    <p className="text-gray-600">ضمانت کتبی برای تمام محصولات و خدمات</p>
                  </div>
                </div>
              </div>
            </div>

            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 group">
              <span className="flex items-center gap-2">
                بیشتر درباره ما بدانید
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

          {/* بخش تصویر */}
          <div className="relative">
            <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/hero.webp"
                alt="نوین پلکسی - کارخانه تولید"
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* آمار شناور */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">۱۰+</div>
                  <div className="text-sm text-gray-600">سال تجربه</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* آمار و دستاوردها */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <achievement.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">
                {achievement.number}
              </div>
              <div className="text-gray-600 text-sm">
                {achievement.label}
              </div>
            </div>
          ))}
        </div>

        {/* ارزش‌ها */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              ارزش‌های ما
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              اصولی که ما را در مسیر ارائه بهترین خدمات و محصولات راهنمایی می‌کند
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="text-center p-6 group hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
