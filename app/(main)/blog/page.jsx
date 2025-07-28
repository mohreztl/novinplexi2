"use client"
import React,{useState,useEffect} from "react";
import axios from "axios";
import Image from "next/image";
import { Clock, User, Tag, ChevronLeft } from "lucide-react";

import Link from "next/link";



const  Blog = () => {

  const [blog,setBlog]=useState([])
  useEffect(() => {
  async function fetchBlogs() {
    const res = await axios.get("/api/blog");
 
   if  (res.status === 200) {
   
     setBlog(res.data) 

   }

  
 }
 fetchBlogs();
},[])
  const firstBlog = blog && blog[0];
  const otherBlogs = blog?.length > 0 && blog.slice(1)
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <header className="bg-blues text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
         مقالات نوین پلکسی
          </h1>
          <p className="text-xl md:text-2xl mb-8">
        آموزش،معرفی و پیشنهادات خرید نوین پلکسی
          </p>
        </div>
      </header>
{/* 
      Featured Post */} 
     <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
 مقالات محبوب
          </h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <Image
                  src={firstBlog?.images[0]}
                  alt={firstBlog?.title}
                  width={800}
                  height={600}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6 md:p-8">
                <h3 className="text-2xl font-bold mb-4">
                  {firstBlog?.title}
                </h3>
                <p className="text-gray-600 mb-4">{firstBlog?.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{firstBlog?.date}</span>
                  <User className="w-4 h-4 ml-4 mr-2" />
                  <span>{firstBlog?.author}</span>
                  <Tag className="w-4 h-4 ml-4 mr-2" />
                  <span>{firstBlog?.category}</span>
                </div>
                <Link
                  href={`/blog/${firstBlog?._id}`}
                  className="bg-blues text-white px-4 py-2 rounded hover:bg-blues/80 transition duration-300 "
                >
                 بیشتر بخوانید
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
           اخرین مقالات
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blog.map((post, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg shadow-lg overflow-hidden"
              >
                <Image
                  src={post.images[0]}
                  alt={post.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Clock className="w-4 h-4 mr-2" />
               
                    <User className="w-4 h-4 ml-4 mr-2" />
                    {/* <span>{post.author}</span> */}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blues font-semibold">
                      {post.category}
                    </span>
                    <Link
                      href={`/blog/${post?._id}`}
                      className="text-blues hover:text-blue-800 transition duration-300 flex items-center"
                    >
                     بیشتر بخوانید <ChevronLeft className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      {/* <NewsletterComponent /> */}
    </div>
  );
};

export default Blog;
