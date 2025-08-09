export function generateSEOMetadata({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  noIndex = false,
  noFollow = false
}) {
  const baseUrl = 'https://novinplexi.ir';
  
  const metadata = {
    title: {
      default: title || "نوین پلکسی - فروشگاه آنلاین دکوراسیون خانگی",
      template: "%s | نوین پلکسی"
    },
    description: description || "نوین پلکسی، فروشگاه آنلاین دکوراسیون خانگی، ارائه‌دهنده انواع کاغذ دیواری، موکت تایلی، کفپوش",
    keywords: keywords || ["کاغذ دیواری", "موکت تایلی", "کفپوش", "دکوراسیون خانگی", "نوین پلکسی"],
    robots: {
      index: !noIndex,
      follow: !noFollow,
      googleBot: {
        index: !noIndex,
        follow: !noFollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'fa_IR',
      url: canonicalUrl || baseUrl,
      siteName: 'نوین پلکسی',
      title: title || "نوین پلکسی - فروشگاه آنلاین دکوراسیون خانگی",
      description: description || "نوین پلکسی، فروشگاه آنلاین دکوراسیون خانگی",
      images: [
        {
          url: ogImage || '/logo.svg',
          width: 1200,
          height: 630,
          alt: title || 'نوین پلکسی',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title || "نوین پلکسی - فروشگاه آنلاین دکوراسیون خانگی",
      description: description || "نوین پلکسی، فروشگاه آنلاین دکوراسیون خانگی",
      images: [ogImage || '/logo.svg'],
    },
    alternates: {
      canonical: canonicalUrl || baseUrl,
    },
  };

  return metadata;
}

export function generateProductSEO(product) {
  return generateSEOMetadata({
    title: `${product.name} - نوین پلکسی`,
    description: product.description || `خرید ${product.name} با بهترین کیفیت و قیمت از نوین پلکسی`,
    keywords: [product.name, ...(product.tags || []), "کاغذ دیواری", "موکت", "کفپوش", "نوین پلکسی"],
    canonicalUrl: `https://novinplexi.ir/products/${product.slug || product._id}`,
    ogImage: product.featuredImage || product.images?.[0] || '/placeholder.webp',
  });
}

export function generateBlogSEO(blog) {
  return generateSEOMetadata({
    title: `${blog.title} - مقالات نوین پلکسی`,
    description: blog.excerpt || blog.description || `مطالعه مقاله ${blog.title} در وبلاگ نوین پلکسی`,
    keywords: [...(blog.tags || []), blog.category, "مقالات دکوراسیون", "راهنمای خرید", "نوین پلکسی"],
    canonicalUrl: `https://novinplexi.ir/blog/${blog.slug || blog._id}`,
    ogImage: blog.featuredImage || '/placeholder.webp',
  });
}

export function generateCategorySEO(category) {
  return generateSEOMetadata({
    title: `${category.name} - دسته‌بندی محصولات نوین پلکسی`,
    description: category.description || `خرید انواع ${category.name} با بهترین کیفیت از نوین پلکسی`,
    keywords: [category.name, ...(category.tags || []), "دکوراسیون خانگی", "نوین پلکسی"],
    canonicalUrl: `https://novinplexi.ir/category/${category.slug || category._id}`,
    ogImage: category.image || '/placeholder.webp',
  });
}
