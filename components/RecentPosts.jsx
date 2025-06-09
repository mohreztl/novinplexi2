"use client"
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { Clock, User, Tag, ChevronLeft } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import moment from "moment-jalaali";

const RecentPosts = ({ limit = 3 }) => {
  const [blog,setBlog]=useState([])

  useEffect(() => {
  async function fetchBlogs() {
    const res = await axios.get(`/api/blog/?limit=${limit}`);
 
   if  (res.status === 200) {
   
     setBlog(res.data) 
    
   }
   console.log("errorrrr")
  
 }
 fetchBlogs();
},[])
  return (
    <section className="py-16 bg-white px-4 lg:px-10">
  
    <div className="flex items-center my-6">
  <div className="flex-grow border-t border-gold"></div>
  <h2 className="px-4 md:text-5xl text-3xl font-bold text-gray-700"> مقالات</h2>
  <div className="flex-grow border-t border-gold "></div>
</div>
<div >
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
  {blog.map((post, index) => (
    <article
      key={post._id}
      className="group bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
    >
      {/* بخش تصویر */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={post.images[0]}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          quality={90}
        />
        {/* تاریخ انتشار */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium">
          {moment(post.createdAt).format("jD jMMMM jYYYY")}
        </div>
      </div>

      {/* محتوای متنی */}
      <div className="p-6 md:p-8">
        {/* دسته‌بندی */}
        <span className="inline-block mb-4 px-3 py-1 bg-blues/10 text-blues rounded-full text-sm font-medium">
          {post.category}
        </span>

        {/* عنوان */}
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
          {post.title}
        </h3>

        {/* خلاصه مطلب */}
        <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>

        {/* اطلاعات پایه */}
        <div className="flex items-center justify-between text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-gray-400" />
            <span>نیکودکور</span>
          </div>
          
          {/* لینک بیشتر بخوانید */}
          <Link
            href={`/blog/${post._id}`}
            className="flex items-center text-blues hover:text-blue-800 transition-colors font-medium"
          >
            ادامه مطلب
            <ChevronLeft className="w-4 h-4 mr-1" />
          </Link>
        </div>
      </div>
    </article>
  ))}
</div>
    </div>
  </section>
  )
}

export default RecentPosts