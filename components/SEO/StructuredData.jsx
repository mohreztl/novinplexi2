import Script from 'next/script';

export function OrganizationSchema() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "نوین پلکسی",
    "alternateName": "Novin Plexi",
    "url": "https://nikodecor.com",
    "logo": "https://nikodecor.com/logo.svg",
    "description": "فروشگاه آنلاین دکوراسیون خانگی، ارائه‌دهنده انواع کاغذ دیواری، موکت تایلی، کفپوش",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IR",
      "addressLocality": "ایران"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": "Persian"
    },
    "sameAs": [
      "https://instagram.com/novinplexi",
      "https://telegram.me/novinplexi"
    ]
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationSchema)
      }}
    />
  );
}

export function WebsiteSchema() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "نوین پلکسی",
    "url": "https://nikodecor.com",
    "description": "فروشگاه آنلاین دکوراسیون خانگی، ارائه‌دهنده انواع کاغذ دیواری، موکت تایلی، کفپوش",
    "inLanguage": "fa-IR",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://nikodecor.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(websiteSchema)
      }}
    />
  );
}

export function ProductSchema({ product }) {
  if (!product) return null;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.featuredImage || product.images?.[0],
    "sku": product.sku || product._id,
    "brand": {
      "@type": "Brand",
      "name": "نوین پلکسی"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://nikodecor.com/products/${product.slug || product._id}`,
      "priceCurrency": "IRR",
      "price": product.price,
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "نوین پلکسی"
      }
    },
    "aggregateRating": product.rating ? {
      "@type": "AggregateRating",
      "ratingValue": product.rating.average,
      "reviewCount": product.rating.count
    } : undefined
  };

  return (
    <Script
      id="product-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(productSchema)
      }}
    />
  );
}

export function ArticleSchema({ article }) {
  if (!article) return null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt || article.description,
    "image": article.featuredImage,
    "author": {
      "@type": "Person",
      "name": article.author?.name || "نوین پلکسی"
    },
    "publisher": {
      "@type": "Organization",
      "name": "نوین پلکسی",
      "logo": {
        "@type": "ImageObject",
        "url": "https://nikodecor.com/logo.svg"
      }
    },
    "datePublished": article.publishedAt || article.createdAt,
    "dateModified": article.updatedAt || article.createdAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://nikodecor.com/blog/${article.slug || article._id}`
    }
  };

  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(articleSchema)
      }}
    />
  );
}

export function BreadcrumbSchema({ items }) {
  if (!items || items.length === 0) return null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema)
      }}
    />
  );
}

export function FAQSchema({ faqs }) {
  if (!faqs || faqs.length === 0) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema)
      }}
    />
  );
}
