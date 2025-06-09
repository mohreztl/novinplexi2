"use client"

import HeroVideo from '@/components/HomepageComponents/HeroVideo'

import GallerySlider from "@/components/HomepageComponents/GallerySlider";


import { TwoBox } from "@/components/HomepageComponents/TwoBox";
import ProductsOne from "@/components/HomepageComponents/ProductsOne";
import ProductHome from "@/components/HomepageComponents/ProductHome.jsx";
import RecentPosts from "@/components/RecentPosts";
import NewProduct from "@/components/HomepageComponents/NewProducts";


export default function Home() {

  return (
    <div >
      <HeroVideo/>
      <TwoBox/>
      
   <ProductsOne/>
   <ProductHome/>
   <div className="flex items-center my-6 lg:px-10">
  <div className="flex-grow border-t border-gold lg:px-10"></div>
  <h1 className="px-4 md:text-5xl text-3xl font-bold text-gray-700"> محصولات</h1>
  <div className="flex-grow border-t border-gold lg:px-10"></div>
</div>

  <NewProduct/>
    
     <div className="flex items-center my-6 lg:px-10">
  <div className="flex-grow border-t border-gold lg:px-10"></div>
  <h1 className="px-4 md:text-5xl text-3xl font-bold text-gray-700 lg:px-10"> گالری</h1>
  <div className="flex-grow border-t border-gold lg:px-10"></div>
</div>
     <GallerySlider/>
     <RecentPosts limit={3}/>

    </div>
  );
}
