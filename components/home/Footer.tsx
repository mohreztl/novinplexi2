import React from 'react'
import { FiMail, FiPhone, FiMapPin, FiChevronDown, FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiLinkedin } from 'react-icons/fi';
type Props = {}

function Footer({}: Props) {
  return (
 <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-20 pb-10">
        <div className=" mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
            {/* ستون 1: درباره ما */}
            <div>
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 p-1 shadow-lg">
                  <div className="flex h-full w-full items-center justify-center rounded-lg bg-white/90 backdrop-blur-sm">
                    <div className="h-6 w-6 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-md"></div>
                  </div>
                </div>
                <span className="ml-3 text-xl font-bold">Novin Plexi</span>
              </div>
              <p className="text-gray-400 mb-6">
                تخصص ما در طراحی و تولید محصولات با کیفیت از جنس Plexiglas/Acrylic. با بیش از ۱۵ سال تجربه در صنعت پلیمرهای شفاف.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-800 hover:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                  <FiFacebook className="w-5 h-5" />
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                  <FiInstagram className="w-5 h-5" />
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                  <FiTwitter className="w-5 h-5" />
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                  <FiYoutube className="w-5 h-5" />
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                  <FiLinkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* ستون 2: لینک‌های سریع */}
            <div>
              <h3 className="text-lg font-bold mb-6 border-r-4 border-blue-500 pr-3">لینک‌های سریع</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">صفحه اصلی</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">محصولات</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">دسته‌بندی‌ها</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">پروژه‌ها</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">مقالات</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">درباره ما</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">تماس با ما</a></li>
              </ul>
            </div>

            {/* ستون 3: محصولات */}
            <div>
              <h3 className="text-lg font-bold mb-6 border-r-4 border-blue-500 pr-3">محصولات</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">تابلوهای تبلیغاتی</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">ویترین و دکوراسیون</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">مبلمان اکریلیک</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">آثار هنری</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">کاربردهای صنعتی</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">سیستم‌های نورپردازی</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">ورق‌های اکریلیک</a></li>
              </ul>
            </div>

            {/* ستون 4: تماس با ما */}
            <div>
              <h3 className="text-lg font-bold mb-6 border-r-4 border-blue-500 pr-3">تماس با ما</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <FiMapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <span className="mr-3 text-gray-400">تهران،تهران پلاک 1 واحد 1</span>
                </li>
                <li className="flex items-center">
                  <FiPhone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <span className="mr-3 text-gray-400">۰۲۱-۱۲۳۴۵۶۷۸</span>
                </li>
                <li className="flex items-center">
                  <FiMail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <span className="mr-3 text-gray-400">info@novinplexi.ir</span>
                </li>
              </ul>

              {/* نمادهای اعتماد */}
              <div className="mt-8">
                <h4 className="font-medium mb-4">نمادهای اعتماد</h4>
                <div className="flex space-x-4">
                  <div className="bg-gray-800 rounded-lg p-3 flex items-center justify-center">
                    <div className="bg-white text-gray-900 font-bold text-xs p-2 rounded">
                      نماد اعتماد الکترونیک
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 flex items-center justify-center">
                    <div className="bg-white text-gray-900 font-bold text-xs p-2 rounded">
                      نماد ساماندهی
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* کپی رایت */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm mb-4 md:mb-0">
                © {new Date().getFullYear()} تمامی حقوق برای Acrylic Design محفوظ است.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">حریم خصوصی</a>
                <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">قوانین و مقررات</a>
                <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">سوالات متداول</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer