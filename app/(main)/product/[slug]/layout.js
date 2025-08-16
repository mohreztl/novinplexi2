export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${slug}`);
    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }
    
    const product = await res.json();

    return {
      title: `نوین پلکسی - ${product.name}`,
      description: product.description.slice(0, 140),
      openGraph: {
        title: product.name,
        description: product.description.slice(0, 140),
        url: `https://novinplexi.ir/product/${product.slug}`,
        images: [
          {
            url: product.images?.[0] || "https://novinplexi.ir/default-image.jpg",
            width: 800,
            height: 600,
            alt: product.name || "محصول نوین پلکسی",
          },
        ],
      },
      other: {
        product_id: product._id,
        product_name: product.name,
        product_price: product.basePrice || 0,
        product_old_price: product.basePrice || 0,
        availability: "instock",
        guarantee: "12 ماه ضمانت کیفیت",
        image: product.images?.[0] || "https://novinplexi.ir/default-image.jpg",
      },
    };
  } catch (error) {
    console.error("Error fetching product metadata:", error);
    return {
      title: "نوین پلکسی - محصول ناموجود",
      description: "محصول مورد نظر یافت نشد.",
      openGraph: {
        title: "محصول ناموجود",
        description: "محصول مورد نظر یافت نشد.",
        url: "https://novinplexi.ir/",
        images: [
          {
            url: "https://novinplexi.ir/default-image.jpg",
            width: 800,
            height: 600,
            alt: "محصول ناموجود",
          },
        ],
      },
      other: {
        product_id: "ناموجود",
        product_name: "محصول ناموجود",
        product_price: "0",
        product_old_price: "0",
        availability: "outofstock",
        guarantee: "ناموجود",
        image: "https://novinplexi.ir/default-image.jpg",
      },
    };
  }
}

export default function ProductSlugLayout({ children }) {
  return <div>{children}</div>;
}
