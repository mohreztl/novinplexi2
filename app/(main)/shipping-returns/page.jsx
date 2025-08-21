import React from "react";
import { Truck, RotateCcw, Clock, DollarSign } from "lucide-react";
import Link from "next/link";

export default function ShippingReturnsPage() {
  return (
    <main className="bg-gray-50 min-h-screen text-gray-800">
      {/* Hero */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-12 md:py-20 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            قوانین ارسال و بازگشت کالا
          </h1>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            در این صفحه همه اطلاعات مربوط به ارسال، تحویل، شرایط بازگشت و
            بازپرداخت سفارش‌ها توضیح داده شده است. لطفاً قبل از ثبت سفارش آن
            را مطالعه کنید.
          </p>
        </div>
      </header>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="hidden lg:block lg:col-span-1 sticky top-24">
              <nav className="bg-white border rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold mb-3">فهرست</h3>
                <ul className="text-sm space-y-2">
                  <li>
                    <a href="#shipping" className="text-sky-600 hover:underline">ارسال</a>
                  </li>
                  <li>
                    <a href="#delivery" className="text-sky-600 hover:underline">تحویل</a>
                  </li>
                  <li>
                    <a href="#returns" className="text-sky-600 hover:underline">شرایط بازگشت</a>
                  </li>
                  <li>
                    <a href="#refunds" className="text-sky-600 hover:underline">بازپرداخت</a>
                  </li>
                  <li>
                    <a href="#exceptions" className="text-sky-600 hover:underline">موارد استثنایی</a>
                  </li>
                </ul>
              </nav>
            </aside>

            {/* Main content */}
            <article className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow p-6">
                <section id="shipping" className="mb-6">
                  <div className="flex items-start gap-4">
                    <Truck className="w-8 h-8 text-sky-600" />
                    <div>
                      <h2 className="text-xl font-bold">شرایط کلی ارسال</h2>
                      <p className="text-gray-700 mt-2 leading-relaxed">
                        هزینه و زمان ارسال بر اساس نوع کالا، وزن و مقصد تعیین می‌شود.
                        در هنگام تکمیل سفارش، هزینه نهایی و زمان تقریبی ارسال
                        نمایش داده می‌شود. در صورتی که تخفیف ارسال برای سفارش
                        اعمال شود، این موضوع در صفحه پرداخت مشخص خواهد شد.
                      </p>
                    </div>
                  </div>
                </section>

                <section id="delivery" className="mb-6">
                  <div className="flex items-start gap-4">
                    <Clock className="w-8 h-8 text-sky-600" />
                    <div>
                      <h3 className="text-lg font-semibold">زمان‌بندی تحویل</h3>
                      <p className="text-gray-700 mt-2 leading-relaxed">
                        تلاش می‌کنیم سفارش‌ها را معمولاً ظرف 1–3 روز کاری پردازش
                        و تحویل دهیم؛ اما زمان دقیق بسته به محل و شرایط تامین
                        متفاوت خواهد بود. در ایام پیک یا مناسبت‌ها ممکن است تأخیر
                        بیشتری رخ دهد.
                      </p>
                    </div>
                  </div>
                </section>

                <section id="returns" className="mb-6">
                  <div className="flex items-start gap-4">
                    <RotateCcw className="w-8 h-8 text-sky-600" />
                    <div>
                      <h3 className="text-lg font-semibold">شرایط بازگشت کالا</h3>
                      <ul className="list-decimal pr-5 mt-2 space-y-2 text-gray-700">
                        <li>در صورت خرابی یا مغایرت کالا، کاربر می‌تواند درخواست بازگشت دهد.</li>
                        <li>کالا باید در بسته‌بندی اصلی و بدون آسیب برگشت داده شود، مگر اینکه خلاف آن اعلام شود.</li>
                        <li>برای بازگشت کالا، تصویر یا شرح مشکل در فرم مربوطه ارسال شود تا بررسی انجام شود.</li>
                        <li>هزینه ارسال بازگشت در مواردی که خطای فروشگاه باشد بر عهده نوین پلکسی است؛ در سایر موارد مطابق سیاست توضیح داده خواهد شد.</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section id="refunds" className="mb-6">
                  <div className="flex items-start gap-4">
                    <DollarSign className="w-8 h-8 text-sky-600" />
                    <div>
                      <h3 className="text-lg font-semibold">بازپرداخت</h3>
                      <p className="text-gray-700 mt-2 leading-relaxed">
                        پس از تایید بازگشت کالا، بازپرداخت طبق روش پرداخت اولیه
                        انجام خواهد شد. زمان پردازش بازپرداخت معمولاً بین 3 تا
                        10 روز کاری بسته به بانک یا درگاه پرداخت متفاوت است.
                      </p>
                    </div>
                  </div>
                </section>

                <section id="exceptions" className="mb-6">
                  <div className="flex items-start gap-4">
                    <RotateCcw className="w-8 h-8 text-sky-600" />
                    <div>
                      <h3 className="text-lg font-semibold">موارد استثنا</h3>
                      <p className="text-gray-700 mt-2 leading-relaxed">
                        کالاهایی که به صورت سفارشی تولید می‌شوند، کالاهای
                        بازشده یا استفاده‌شده و کالاهای اعلام‌شده در توضیحات
                        محصول به عنوان غیر قابل بازگشت، تحت شرایط بازگشت قرار
                        ندارند، مگر در صورت وجود عیب یا مغایرت.
                      </p>
                    </div>
                  </div>
                </section>

                <div className="mt-6 border-t pt-4 flex flex-col md:flex-row md:justify-between gap-4">
                  <div>
                    <h4 className="font-semibold">نیاز به کمک دارید؟</h4>
                    <p className="text-gray-600 text-sm">برای پیگیری سفارش یا ثبت درخواست بازگشت، با تیم پشتیبانی تماس بگیرید.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link href="/contact" className="inline-block bg-sky-600 text-white px-4 py-2 rounded-md font-medium hover:opacity-95">تماس با پشتیبانی</Link>
                    <a href="/faq" className="text-sky-600 hover:underline text-sm">پرسش‌های متداول</a>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

    </main>
  );
}
