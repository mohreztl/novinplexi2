# راهنمای دیپلوی پروژه روی Liara

## قدم 1: تنظیم متغیرهای محیطی در Liara

در پنل Liara، در قسمت **Environment Variables** متغیرهای زیر را اضافه کنید:

```bash
# NextAuth Configuration
NEXTAUTH_SECRET="7@m=:6M%d0j![Io"
NEXTAUTH_URL=https://your-domain.com

# Database
my-app?authSource=admin
JWT_SECRET=7@m=:6M%d0j![Ioa

# Site URLs (جایگزین your-domain.com با دامنه واقعی)
NEXT_PUBLIC_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://your-domain.com

# Liara S3 Storage
LIARA_ENDPOINT=https://storage.c2.liara.space
LIARA_BUCKET_NAME=novinplexi
LIARA_ACCESS_KEY=trq422mndh5g116b
LIARA_SECRET_KEY=90075a50-24cb-425a-807b-94656c7ad5a3
LIARA_REGION=default

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-JS1NJZ8W2P

# Payment
ZIBAL_MERCHANT_KEY=zibal

# SMS
MELI_PAYAMAK=https://console.melipayamak.com/api/send/otp/3e044b9d1dd8405fac5fda739adfa2fa
MELI_PAYAMAK_SHARED=https://console.melipayamak.com/api/send/shared/3e044b9d1dd8405fac5fda739adfa2fa

# Production
NODE_ENV=production
```

## قدم 2: بررسی liara.json

مطمئن شوید که فایل `liara.json` شما شامل تنظیمات زیر است:

```json
{
  "platform": "next",
  "app": "novinplexi",
  "port": 3000,
  "buildCommand": "npm run build",
  "node": {
    "version": "18"
  }
}
```

## قدم 3: تست آپلود API

بعد از دیپلوی، این URL ها را تست کنید:

1. **تست وضعیت API:**
   ```
   GET https://your-domain.com/api/upload
   ```

2. **تست آپلود:**
   ```
   POST https://your-domain.com/api/upload
   Content-Type: multipart/form-data
   Body: file=[your-image-file]
   ```

## قدم 4: عیب‌یابی مشکلات آپلود

### مشکلات شایع:

1. **خطای "تنظیمات S3 ناقص است"**
   - بررسی کنید همه متغیرهای LIARA_ تنظیم شده باشند
   - مطمئن شوید NODE_ENV=production است

2. **خطای "NetworkError"**
   - بررسی کنید اتصال سرور Liara به اینترنت
   - مطمئن شوید endpoint صحیح است

3. **خطای "NoSuchBucket"**
   - بررسی کنید نام bucket (novinplexi) صحیح است
   - مطمئن شوید bucket وجود دارد

4. **خطای "CredentialsError"**
   - بررسی کنید ACCESS_KEY و SECRET_KEY صحیح هستند

### تست مرحله‌ای:

1. ابتدا `/api/upload` را با GET تست کنید
2. بررسی کنید همه envVariables در response true باشند
3. سپس یک فایل کوچک (کمتر از 1MB) آپلود کنید
4. در صورت موفقیت، فایل‌های بزرگ‌تر را امتحان کنید

## قدم 5: لاگ‌ها

در صورت بروز مشکل، لاگ‌های Liara را بررسی کنید:
- در پنل Liara > Logs
- دنبال خطاهای مربوط به S3، AWS، یا Upload بگردید

## نکات مهم:

1. **سایز فایل**: حداکثر 10MB
2. **فرمت‌های مجاز**: JPG, PNG, WebP, GIF, SVG
3. **timeout**: 60 ثانیه برای آپلود
4. **retry**: 3 بار تلاش مجدد خودکار

---

بعد از دیپلوی، لطفاً نتیجه تست `/api/upload` را به من گزارش دهید.
