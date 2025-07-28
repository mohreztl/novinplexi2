"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiChevronDown, FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiLinkedin } from 'react-icons/fi';
type Props = {}

const Faq = (props: Props) => {
      const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
    const faqs = [
    {
      id: 1,
      question: "تفاوت ورق‌های اکریلیک و پلی کربنات چیست؟",
      answer: "ورق‌های اکریلیک (Plexiglas) شفافیت بالاتر و مقاومت بهتری در برابر UV دارند، در حالی که ورق‌های پلی کربنات مقاومت ضربه‌ای بالاتری دارند. اکریلیک برای کاربردهایی که نیاز به شفافیت عالی دارند مناسب‌تر است، در حالی که پلی کربنات برای محیط‌هایی که خطر ضربه وجود دارد بهتر است."
    },
    {
      id: 2,
      question: "ضخامت مناسب برای ساخت تابلو تبلیغاتی چقدر است؟",
      answer: "ضخامت مناسب بستگی به ابعاد تابلو و شرایط نصب دارد. برای تابلوهای کوچک (تا 1 متر) ضخامت 3-5 میلی‌متر مناسب است. برای تابلوهای متوسط (1-2 متر) ضخامت 5-8 میلی‌متر و برای تابلوهای بزرگ (بیشتر از 2 متر) ضخامت 8-15 میلی‌متر پیشنهاد می‌شود."
    },
    {
      id: 3,
      question: "آیا می‌توان ورق‌های اکریلیک را خم کرد؟",
      answer: "بله، ورق‌های اکریلیک با استفاده از حرارت به راحتی خم می‌شوند. این کار با دستگاه‌های حرارتی مخصوص انجام می‌شود که حرارت را به صورت یکنواخت اعمال می‌کنند تا از ایجاد ترک جلوگیری شود. خم‌کاری باید توسط متخصصان انجام شود."
    },
    {
      id: 4,
      question: "چگونه محصولات اکریلیک را تمیز کنیم؟",
      answer: "برای تمیز کردن محصولات اکریلیک از آب ولرم و صابون ملایم استفاده کنید. از مواد شوینده قوی، حلال‌ها یا پارچه‌های زبر خودداری کنید. برای خشک کردن از پارچه‌های میکروفایبر بدون پرز استفاده نمایید. هرگز از الکل یا استون استفاده نکنید."
    },
    {
      id: 5,
      question: "زمان تحویل سفارشات اختصاصی چقدر است؟",
      answer: "زمان تحویل بستگی به پیچیدگی طراحی و حجم سفارش دارد. سفارشات ساده معمولاً در 3-5 روز کاری آماده می‌شوند. سفارشات پیچیده و طرح‌های خاص ممکن است تا 2 هفته زمان ببرند. تیم پشتیبانی ما پس از ثبت سفارش، زمان دقیق تحویل را اعلام می‌کند."
    }
  ];

  const toggleQuestion = (id: number) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className=" mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              پرسش‌های <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">پرتکرار</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              پاسخ سوالات متداول خود را در مورد محصولات اکریلیک در اینجا بیابید
            </motion.p>
          </div>

          <div className="max-w-4xl mx-auto">
            {faqs.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="mb-4"
              >
                <div 
                  className={`p-6 rounded-xl cursor-pointer transition-all ${
                    activeQuestion === faq.id 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white' 
                      : 'bg-white text-gray-900 hover:bg-blue-50'
                  } shadow-md`}
                  onClick={() => toggleQuestion(faq.id)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">{faq.question}</h3>
                    <motion.div
                      animate={{ rotate: activeQuestion === faq.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiChevronDown className="w-5 h-5" />
                    </motion.div>
                  </div>
                  
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: activeQuestion === faq.id ? 'auto' : 0, 
                      opacity: activeQuestion === faq.id ? 1 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className={`mt-4 pt-4 border-t ${
                      activeQuestion === faq.id 
                        ? 'border-white/30' 
                        : 'border-gray-200'
                    }`}>
                      <p>{faq.answer}</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center mt-12"
            >
              <p className="text-gray-600 mb-6">
                پاسخ سوال خود را پیدا نکردید؟
              </p>
              <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold px-8 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all">
                ارسال سوال جدید
              </button>
            </motion.div>
          </div>
        </div>
      </section>
  )
}

export default Faq