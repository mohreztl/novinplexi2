"use client";
import { useState } from "react";
import {
  Settings,
  Store,
  Phone,
  Mail,
  MapPin,
  Instagram,
  MessageSquare,
  Globe,
  Save,
} from "lucide-react";

const SettingsSection = ({ title, icon: Icon, children }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
    <div className="flex items-center gap-2 mb-6">
      <div className="p-2 bg-blue-50 rounded-lg">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
    </div>
    {children}
  </div>
);

const FormGroup = ({ label, children }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    {children}
  </div>
);

const Input = ({ type = "text", ...props }) => (
  <input
    type={type}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    {...props}
  />
);

const Textarea = (props) => (
  <textarea
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
    {...props}
  />
);

export default function SiteSettings() {
  const [settings, setSettings] = useState({
    // اطلاعات فروشگاه
    storeName: "نوین پلکسی",
    storeDescription: "فروشگاه محصولات دکوراسیون داخلی",
    email: "info@novinplexi.ir",
    phone: "021-12345678",
    mobile: "09369353765",
    address: "تهران، خیابان ولیعصر، ...",
    
    // شبکه‌های اجتماعی
    instagram: "nikodecor",
    telegram: "nikodecor",
    website: "www.novinplexi.ir",
    
    // تنظیمات ارسال
    freeShippingThreshold: "1000000",
    shippingCost: "50000",
    
    // پیام‌های سایت
    welcomeMessage: "به فروشگاه نوین پلکسی خوش آمدید",
    orderSuccessMessage: "سفارش شما با موفقیت ثبت شد",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings logic
    console.log("Saving settings:", settings);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">تنظیمات سایت</h1>
        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="w-5 h-5" />
          ذخیره تغییرات
        </button>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* اطلاعات فروشگاه */}
        <SettingsSection title="اطلاعات فروشگاه" icon={Store}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormGroup label="نام فروشگاه">
              <Input
                name="storeName"
                value={settings.storeName}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup label="توضیحات فروشگاه">
              <Textarea
                name="storeDescription"
                value={settings.storeDescription}
                onChange={handleChange}
              />
            </FormGroup>
          </div>
        </SettingsSection>

        {/* اطلاعات تماس */}
        <SettingsSection title="اطلاعات تماس" icon={Phone}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormGroup label="ایمیل">
              <Input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup label="تلفن ثابت">
              <Input
                name="phone"
                value={settings.phone}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup label="تلفن همراه">
              <Input
                name="mobile"
                value={settings.mobile}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup label="آدرس">
              <Textarea
                name="address"
                value={settings.address}
                onChange={handleChange}
              />
            </FormGroup>
          </div>
        </SettingsSection>

        {/* شبکه‌های اجتماعی */}
        <SettingsSection title="شبکه‌های اجتماعی" icon={Globe}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormGroup label="اینستاگرام">
              <div className="relative">
                <Input
                  name="instagram"
                  value={settings.instagram}
                  onChange={handleChange}
                  className="pl-10"
                />
                <Instagram className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </FormGroup>
            <FormGroup label="تلگرام">
              <div className="relative">
                <Input
                  name="telegram"
                  value={settings.telegram}
                  onChange={handleChange}
                  className="pl-10"
                />
                <MessageSquare className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </FormGroup>
            <FormGroup label="وب‌سایت">
              <div className="relative">
                <Input
                  name="website"
                  value={settings.website}
                  onChange={handleChange}
                  className="pl-10"
                />
                <Globe className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </FormGroup>
          </div>
        </SettingsSection>

        {/* تنظیمات ارسال */}
        <SettingsSection title="تنظیمات ارسال" icon={MapPin}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormGroup label="حداقل مبلغ ارسال رایگان (تومان)">
              <Input
                type="number"
                name="freeShippingThreshold"
                value={settings.freeShippingThreshold}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup label="هزینه ارسال (تومان)">
              <Input
                type="number"
                name="shippingCost"
                value={settings.shippingCost}
                onChange={handleChange}
              />
            </FormGroup>
          </div>
        </SettingsSection>

        {/* پیام‌های سایت */}
        <SettingsSection title="پیام‌های سایت" icon={Mail}>
          <div className="space-y-4">
            <FormGroup label="پیام خوش‌آمدگویی">
              <Textarea
                name="welcomeMessage"
                value={settings.welcomeMessage}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup label="پیام موفقیت سفارش">
              <Textarea
                name="orderSuccessMessage"
                value={settings.orderSuccessMessage}
                onChange={handleChange}
              />
            </FormGroup>
          </div>
        </SettingsSection>
      </form>
    </div>
  );
}
