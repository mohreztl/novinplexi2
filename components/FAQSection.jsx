import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "چطور می‌تونم متراژ مورد نیاز برای کاغذ دیواری رو حساب کنم؟",
      answer:
        "برای محاسبه متراژ، ابتدا مساحت دیوارهایی که قصد دارید کاغذ کنید رو به متر مربع اندازه‌گیری کنید (طول × ارتفاع دیوار). سپس مجموع این مساحت‌ها رو بر تعداد متر مربعی که هر رول پوشش می‌دهد تقسیم کنید تا تعداد رول مورد نیاز مشخص شود. اگر مطمئن نیستید، تیم پشتیبانی ما با کمال میل به شما کمک خواهد کرد.",
    },
    {
      question: "آیا امکان تعویض یا مرجوع کردن کاغذ دیواری وجود دارد؟",
      answer: " بله، در صورتی که محصول ارسال‌شده با سفارش شما مغایرت داشته باشد یا آسیب‌دیده باشد، تا ۷ روز امکان مرجوع یا تعویض کالا وجود دارد. لطفاً شرایط کامل بازگشت کالا را در صفحه «قوانین و مقررات» مطالعه کنید.",
    },
    {
      question: "آیا طرح‌ها و رنگ‌های کاغذ دیواری روی صفحه نمایش با محصول واقعی تفاوت دارند؟",
      answer:
        "ممکن است به دلیل تفاوت در تنظیمات صفحه نمایش، کمی تفاوت رنگ بین تصویر محصول و کاغذ دیواری واقعی وجود داشته باشد. پیشنهاد می‌کنیم قبل از خرید انبوه، از مشاوره رایگان ما استفاده کرده یا نمونه حضوری دریافت کنید (در صورت امکان).",
    },
    {
      question: "کاغذ دیواری قابل شستشو هم دارید؟",
      answer:
        "بله، بسیاری از مدل‌های موجود در فروشگاه ما قابل شستشو هستند و با نماد «قابل شستشو» مشخص شده‌اند. این مدل‌ها برای فضاهای پرتردد یا خانه‌هایی با کودک بسیار مناسب هستند.",
    },
    {
      question: "چقدر طول می‌کشه تا سفارش به دستم برسه؟",
      answer: " .زمان ارسال بسته به موقعیت جغرافیایی شما و نوع ارسال (پست، تیپاکس، باربری و...) بین ۲ تا ۵ روز کاری متغیر است. اطلاعات کامل و کد رهگیری مرسوله پس از ثبت سفارش برای شما ارسال خواهد شد.ارسال در تهران به صورت فوری و با پیک میباشد.",
    },
  ];

  return (
    <div className=" bg-gradient-to-b from-gray-50 to-white rounded-xl shadow-lg p-4 md:p-8 relative">
      <div className="absolute inset-0 bg-gradient-to-br  rounded-lg transform scale-105 opacity-75 blur-lg"></div>
      <h3 className="text-2xl font-bold text-gray-800 text-center mb-6 relative z-10">
پرسش و پاسخ های متداول
      </h3>
      <div className="space-y-4 relative z-10">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className={`border-b border-gray-200 ${
              openIndex === index ? "bg-slate-50/50" : "bg-white"
            } rounded-lg overflow-hidden`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center py-4 text-right focus:outline-none px-4"
            >
              <span className="text-lg font-semibold text-gray-700">
                {faq.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className="w-6 h-6 text-gray-700" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-700" />
              )}
            </button>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: openIndex === index ? "auto" : 0,
                opacity: openIndex === index ? 1 : 0,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="px-4 py-2">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
