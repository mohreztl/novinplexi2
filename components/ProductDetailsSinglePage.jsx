import React from "react";
import ProductImageGallery from "./ProductImageGallery";
import GuaranteeSection from "./GuaranteeSection";
import ReviewSection from "./ReviewSection";
import FAQSection from "./FAQSection";
import FeaturesSection from "./FeaturesSection";
import ProdDetailsList from "./ProdDetailsList";
import ProdDetailsPrice from "./ProdDetailsPrice";
import * as Tabs from "@radix-ui/react-tabs";

import ProductsGridHome from "./products/ProductsGridHome";
const ProductDetailsSinglePage = ({
  wishlist,
  product,
  products,
  averageRating,
  allReviews,
  isInWishlist,

  toggleWishlist,
  onWishlistUpdate,

}) => {
  const tabs=[
    {name:"توضیحات", value:"description"},
    {name:"مشخصات محصول" ,value:"specifications"},
    {name:`نظرات(${allReviews ? allReviews.length : 0})
   `, value:"reviews"},
    {  name:"پرسش و پاسخ", value:"faq"}
  ]
  const ProductTabs = () => {
    return (
      <Tabs.Root defaultValue="description" className="w-full max-w-full mt-8 [direction:rtl]">
      
        <Tabs.List className="flex border-b">
        {tabs.map((tab)=> {return(
          
          <Tabs.Trigger
            value={tab.value}
            className="py-2 px-4 text-sm font-medium border-b-2 border-transparent text-gray-600 hover:text-gold hover:border-gold data-[state=active]:border-gold data-[state=active]:text-blues data-[state=active]:text-[20px] data-[state=active]:font-bold transition-colors"
          >
          {tab.name}
          </Tabs.Trigger>
          )})}
        
        </Tabs.List>
  
        {/* محتوای تب‌ها */}
        <Tabs.Content value="description" className="p-4 flex-col justify-center items-center">
          <h2 className="text-lg font-semibold mb-2">توضیحات محصول</h2>
          <div className="bg-gradient-to-b from-gray-50 to-white rounded-xl shadow-lg p-4 md:p-8">
          <p className="mb-6 mt-6 text-sm sm:mt-0 text-gray-900 ">
            {product.fullDescription}
            
          </p>
          </div>
        </Tabs.Content>
  
        <Tabs.Content value="specifications" className="p-4">
          <h2 className="text-lg font-semibold mb-2">مشخصات محصول</h2>
          
          <ProdDetailsList product={product} />
        </Tabs.Content>
  
        <Tabs.Content value="reviews" className="p-4">
          <h2 className="text-lg font-semibold mb-2">نظرات</h2>
          <p className="text-gray-700">
          <ReviewSection productId={product._id.toString()} />
          </p>
        </Tabs.Content>
        <Tabs.Content value="faq" className="p-4">
          <h2 className="text-lg font-semibold mb-2">پرسش و پاسخ</h2>
          <FAQSection />
        </Tabs.Content>
      </Tabs.Root>
    );
  };
  
  return (
    <div className="container mx-0 py-12 max-w-full px-2 md:px-10">
      <div className="flex flex-col md:flex-row gap-12 bg-white rounded-t-xl shadow-lg overflow-hidden">
        <ProductImageGallery product={product} />
        <ProdDetailsPrice
          product={product}
          averageRating={averageRating}
          allReviews={allReviews}
          isInWishlist={isInWishlist}
          // handleAddToCart={handleAddToCart}
          toggleWishlist={toggleWishlist}

 

        />
      </div>
<ProductTabs/>
      {/* <ProdDetailsList product={product} /> */}
      <div className="flex items-center my-6 lg:px-10">
  <div className="flex-grow border-t border-gold lg:px-10"></div>
  <h1 className="px-4 md:text-5xl text-3xl font-bold text-gray-700 lg:px-10"> محصولات مشابه</h1>
  <div className="flex-grow border-t border-gold lg:px-10"></div>
</div>
      <ProductsGridHome
      itemsPerPage={6}
          products={products}
          wishlist={wishlist}
          onWishlistUpdate={onWishlistUpdate}
        />
      <GuaranteeSection />
      {/* <ReviewSection productId={product._id.toString()} /> */}
   
      {/* <FeaturesSection /> */}
    </div>
  );
};

export default ProductDetailsSinglePage;
