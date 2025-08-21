import React from "react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-gray-50 min-h-screen text-gray-800">
      {/* Hero */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center">
            شرایط و ضوابط استفاده از نوین پلکسی
          </h1>
          <p className="text-center text-gray-600 mt-3 max-w-2xl mx-auto">
            این صفحه حاوی قوانین، حقوق و مسئولیت‌های کاربران و مجموعه نوین
            پلکسی در استفاده از خدمات و محتوای وب‌سایت است. لطفاً قبل از استفاده
            از خدمات، این شرایط را با دقت مطالعه کنید.
          </p>
        </div>
      </header>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar / TOC */}
            <aside className="hidden lg:block lg:col-span-1 sticky top-24">
              <nav className="bg-white border rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold mb-3">فهرست</h3>
                <ul className="text-sm space-y-2">
                  <li>
                    <a href="#intro" className="text-sky-600 hover:underline">
                      مقدمه
                    </a>
                  </li>
                  <li>
                    <a href="#account" className="text-sky-600 hover:underline">
                      حساب کاربری
                    </a>
                  </li>
                  <li>
                    <a href="#orders" className="text-sky-600 hover:underline">
                      سفارشات و پرداخت
                    </a>
                  </li>
                  <li>
                    <a href="#shipping" className="text-sky-600 hover:underline">
                      ارسال و تحویل
                    </a>
                  </li>
                  <li>
                    <a href="#returns" className="text-sky-600 hover:underline">
                      بازگشت و بازپرداخت
                    </a>
                  </li>
                  <li>
                    <a href="#intellectual" className="text-sky-600 hover:underline">
                      حقوق مالکیت
                    </a>
                  </li>
                  <li>
                    <a href="#liability" className="text-sky-600 hover:underline">
                      مسئولیت‌ها
                    </a>
                  </li>
                  <li>
                    <a href="#changes" className="text-sky-600 hover:underline">
                      تغییرات
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="text-sky-600 hover:underline">
                      تماس
                    </a>
                  </li>
                </ul>
              </nav>
            </aside>

            {/* Main content */}
            <article className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow p-6">
                <section id="intro" className="mb-6">
                  <h2 className="text-xl font-bold mb-2">مقدمه</h2>
                  <p className="text-gray-700 leading-relaxed">
                    استفاده از وب‌سایت و خدمات نوین پلکسی به معنای پذیرش این
                    شرایط و ضوابط است. اگر با هر بند از این شرایط موافق نیستید،
                    خواهشمندیم از استفاده از خدمات خودداری کنید. این شرایط
                    ممکن است به صورت دوره‌ای به‌روزرسانی شود و نسخه جدید در این
                    صفحه منتشر خواهد شد.
                  </p>
                </section>

                <section id="account" className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">حساب کاربری</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    برخی از خدمات نوین پلکسی نیازمند ثبت‌نام و ایجاد حساب
                    کاربری است. کاربر مسئول حفظ محرمانگی اطلاعات حساب (از
                    جمله نام کاربری و رمز عبور) و کلیه فعالیت‌های انجام‌شده با
                    حساب خود می‌باشد. در صورت مشاهده هرگونه دسترسی غیرمجاز،
                    باید سریعاً به پشتیبانی اطلاع دهید.
                  </p>
                </section>

                <section id="orders" className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">سفارشات و پرداخت</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    ثبت سفارش به منزله پذیرش قیمت و مشخصات نمایش داده‌شده در سایت
                    است مگر اینکه خلاف آن به کاربر اطلاع داده شود. پرداخت‌ها
                    از طرق مشخص شده در وب‌سایت صورت می‌پذیرد و در صورت وجود
                    هرگونه اختلاف یا خطا در پرداخت، تیم پشتیبانی در اسرع وقت
                    بررسی خواهد کرد.
                  </p>
                </section>

                <section id="shipping" className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">ارسال و تحویل</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    زمان و هزینه ارسال بر اساس نوع کالا و مقصد تعیین می‌شود و
                    هنگام نهایی‌سازی سفارش به کاربر اعلام خواهد شد. مسئولیت
                    تحویل سالم کالا تا تحویل به پست یا شرکت حمل‌ونقل با
                    نوین پلکسی است، و پس از تحویل به آدرس واردشده توسط کاربر،
                    مسئولیت نهایی بر عهده دریافت‌کننده خواهد بود.
                  </p>
                </section>

                <section id="returns" className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">بازگشت و بازپرداخت</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    شرایط بازگشت و بازپرداخت کالا در بخش مربوطه توضیح داده
                    شده است. برای درخواست بازگشت، کاربر باید ظرف مهلت
                    قیدشده و با ارائه مدارک موردنیاز اقدام نماید. کالا باید در
                    وضعیت اولیه و بسته‌بندی اصلی بازگردانده شود مگر اینکه خلاف
                    آن اعلام شده باشد.
                  </p>
                </section>

                <section id="intellectual" className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">حقوق مالکیت</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    کلیه محتواها، تصاویر، برندها و متون موجود در وب‌سایت متعلق
                    به نوین پلکسی یا شرکای آن بوده و هرگونه تکثیر، استفاده یا
                    انتشار بدون اجازه کتبی ممنوع است. استفاده محدود و با ذکر
                    منبع ممکن است تنها با کسب اجازه انجام شود.
                  </p>
                </section>

                <section id="liability" className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">مسئولیت‌ها</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    نوین پلکسی تمام تلاش خود را برای ارائه اطلاعات دقیق و کالا
                    با کیفیت انجام می‌دهد، اما مسئولیت ناشی از مواردی که خارج
                    از کنترل ماست (مانند اختلالات شبکه، تاخیرات حمل‌ونقل یا
                    خطاهای تامین‌کنندگان) را نمی‌پذیرد. در هر حال، تعهدات و
                    مسئولیت‌های شرکت مطابق قوانین و مقررات کشور خواهد بود.
                  </p>
                </section>

                <section id="privacy-short" className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">حفاظت از داده‌ها (خلاصه)</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    نوین پلکسی اطلاعات شخصی شما را برای پردازش سفارش‌ها و
                    بهبود خدمات جمع‌آوری می‌کند. اطلاعات با استانداردهای
                    امنیتی مناسب نگهداری می‌شود و بدون رضایت شما به اشخاص ثالث
                    فروخته نمی‌شود مگر در موارد قانونی یا برای انجام خدمات
                    مرتبط با سفارش (مانند شرکت‌های حمل‌ونقل).
                  </p>
                </section>

                <section id="changes" className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">تغییرات در شرایط</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    نوین پلکسی حق دارد شرایط را در هر زمان به‌روزرسانی کند.
                    تغییرات بلافاصله پس از انتشار در این صفحه نافذ خواهند شد.
                    در صورت تغییرات مهم، تلاش می‌شود کاربران از طریق ایمیل یا
                    اعلان در سایت مطلع شوند.
                  </p>
                </section>

                <section id="contact" className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">نحوه تماس</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    برای سوالات، شکایات یا درخواست‌های مرتبط با این شرایط می‌توانید
                    از طریق صفحه <Link href="/contact" className="text-sky-600 hover:underline">تماس با ما</Link> اقدام کنید
                    یا به آدرس ایمیل پشتیبانی ما پیام ارسال نمایید.
                  </p>

                  <div className="text-sm text-gray-600">
                    <p>آخرین به‌روزرسانی: {new Date().toLocaleDateString('fa-IR')}</p>
                  </div>
                </section>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-lg p-6 text-center">
            <h4 className="text-lg md:text-xl font-bold">به کمک نیاز دارید؟</h4>
            <p className="mt-2 mb-4">تیم پشتیبانی ما آماده پاسخگویی به پرسش‌ها و حل مشکلات شماست.</p>
            <Link href="/contact" className="inline-block bg-white text-sky-600 rounded-md px-5 py-2 font-medium hover:opacity-95">
              تماس با پشتیبانی
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
