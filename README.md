# 🏢 نوین پلکسی - فروشگاه آنلاین دکوراسیون خانگی

یک وبسایت مدرن و بهینه‌شده برای فروش محصولات دکوراسیون خانگی شامل کاغذ دیواری، موکت تایلی، کفپوش و سایر محصولات دکوراتیو.

## ✨ ویژگی‌های کلیدی

### 🚀 **Performance & SEO**
- ⚡ **Next.js 14** با App Router
- 🎯 **Core Web Vitals** بهینه‌شده
- 📱 **PWA** با offline support
- 🔍 **SEO** کامل با Schema Markup
- 🗺️ **Sitemap** خودکار
- 📊 **Google Analytics** یکپارچه
- 🍪 **Cookie Consent** GDPR سازگار

### 🛒 **E-commerce**
- 🛍️ سبد خرید هوشمند
- 💳 سیستم پرداخت امن
- 📦 مدیریت سفارشات
- 👥 پنل کاربری
- 🎨 طراحی واکنش‌گرا

### 📝 **Content Management**
- ✍️ سیستم مقالات (Blog)
- 🖼️ آپلود تصاویر S3
- 📝 ویرایشگر متن غنی
- 🏷️ دسته‌بندی محصولات
- 🔍 جستجوی پیشرفته

### 🔧 **Technical Features**
- 🗄️ **MongoDB** پایگاه داده
- ☁️ **Liara S3** ذخیره‌سازی
- 🔐 **NextAuth** احراز هویت
- 🎨 **Tailwind CSS** + **Framer Motion**
- 📱 **Responsive Design**

## 🚀 نصب و راه‌اندازی

### پیش‌نیازها
- Node.js 18+
- MongoDB
- حساب Liara (برای S3)

### مراحل نصب

1. **کلون کردن مخزن**
```bash
git clone https://github.com/mohreztl/novinplexi2.git
cd novinplexi2
```

2. **نصب وابستگی‌ها**
```bash
npm install
```

3. **تنظیم متغیرهای محیطی**
```bash
cp .env.example .env.local
```

فایل `.env.local` را با اطلاعات خود پر کنید:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/novinplexi

# NextAuth
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Site
SITE_URL=https://nikodecor.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Liara S3
LIARA_ENDPOINT=https://storage.c2.liara.space
LIARA_ACCESS_KEY=your-access-key
LIARA_SECRET_KEY=your-secret-key
LIARA_BUCKET_NAME=your-bucket-name
```

4. **اجرای پروژه**
```bash
# Development
npm run dev

# Production
npm run build
npm run start
```

## 📁 ساختار پروژه

```
app/
├── (main)/              # صفحات اصلی
│   ├── blog/           # سیستم مقالات
│   └── products/       # صفحات محصولات
├── adminnovin/         # پنل ادمین
├── api/               # API Routes
└── layout.js          # Layout اصلی

components/
├── SEO/               # کامپوننت‌های SEO
├── ui/                # کامپوننت‌های UI
└── ...

lib/
├── db.js              # اتصال MongoDB
├── seo.js             # توابع SEO
└── utils.js           # توابع کمکی
```

## 🛠️ API Routes

### محصولات
- `GET /api/products` - لیست محصولات
- `GET /api/products/[id]` - جزئیات محصول
- `POST /api/products` - ایجاد محصول (ادمین)
- `PUT /api/products/[id]` - بروزرسانی محصول (ادمین)
- `DELETE /api/products/[id]` - حذف محصول (ادمین)

### مقالات
- `GET /api/blog` - لیست مقالات
- `GET /api/blog/[id]` - جزئیات مقاله
- `POST /api/blog` - ایجاد مقاله (ادمین)

### آپلود فایل
- `POST /api/upload` - آپلود به S3
- `DELETE /api/upload` - حذف از S3

## 🔧 تنظیمات بهینه‌سازی

### Performance
- **Image Optimization**: تصاویر خودکار به WebP/AVIF تبدیل می‌شوند
- **Code Splitting**: بارگذاری تنها کامپوننت‌های مورد نیاز
- **Caching**: Headers کش بهینه‌شده
- **Compression**: فشرده‌سازی Gzip/Brotli

### SEO
- **Meta Tags**: تگ‌های متا کامل
- **Open Graph**: تصاویر و توضیحات OG
- **Schema Markup**: داده‌های ساختاریافته
- **Sitemap**: نقشه سایت خودکار

## 🚀 Deployment

### Vercel
```bash
npm run build
vercel --prod
```

### Liara
```bash
liara deploy
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Analytics & Monitoring

### Google Analytics
- Page views tracking
- Event tracking
- Conversion tracking
- Real-time data

### Performance Monitoring
- Core Web Vitals
- Load times
- Error tracking
- User experience metrics

## 🤝 مشارکت

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

این پروژه تحت مجوز MIT منتشر شده است. فایل [LICENSE](LICENSE) را برای جزئیات بیشتر مطالعه کنید.

## 📞 تماس با ما

- 🌐 Website: [nikodecor.com](https://nikodecor.com)
- 📧 Email: info@nikodecor.com
- 📱 Instagram: [@novinplexi](https://instagram.com/novinplexi)

---

<div align="center">
  
**ساخته شده با ❤️ توسط تیم نوین پلکسی**

</div>
