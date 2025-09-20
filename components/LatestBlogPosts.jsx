'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

// تابع برای نمایش دسته‌بندی‌ها
const getCategoryLabel = (category) => {
  const categoryMap = {
    'tutorial': 'آموزش',
    'article': 'مقاله'
  };
  return categoryMap[category] || category;
};

const LatestBlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/blog?limit=6');
        if (response.status === 200) {
          setPosts(response.data.posts || []);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const featuredPost = posts.find(post => post.featured) || posts[0];
  const regularPosts = posts.filter(post => post._id !== featuredPost?._id);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block h-8 w-32 bg-gray-200 rounded-full animate-pulse mb-6"></div>
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
            <div className="h-6 bg-gray-200 rounded-lg animate-pulse max-w-2xl mx-auto"></div>
          </div>
          
          {/* Featured Post Skeleton */}
          <div className="mb-16 bg-white rounded-3xl shadow-xl overflow-hidden animate-pulse">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="h-64 lg:h-auto bg-gray-200"></div>
              <div className="p-8 lg:p-12">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-20 bg-gray-200 rounded mb-6"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
          
          {/* Regular Posts Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-16 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-br from-blue-100/40 to-indigo-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-gradient-to-br from-purple-100/40 to-pink-100/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span className="text-blue-700 text-sm font-medium">وبلاگ نوین پلکسی</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            <span className="block">آخرین</span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              مقالات و اخبار
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            با مطالعه مقالات ما از آخرین اخبار، راهنماها و نکات تخصصی دنیای اکریلیک مطلع شوید
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16 animate-slide-up">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="grid lg:grid-cols-2 gap-0">
                
                {/* Image */}
                <div className="relative h-64 lg:h-auto">
                  <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                    ⭐ ویژه
                  </div>
                  
                  <Image
                    src={featuredPost.image || "/placeholder.webp"}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-6">
                    <span className={`px-3 py-1 ${featuredPost.categoryColor || 'bg-blue-500'} text-white text-sm font-semibold rounded-full`}>
                      {getCategoryLabel(featuredPost.category) || 'مقاله'}
                    </span>
                    <span className="text-gray-500 text-sm">{featuredPost.readTime || '5 دقیقه'} مطالعه</span>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                    {featuredPost.title}
                  </h3>

                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {featuredPost.excerpt || featuredPost.content?.substring(0, 200) + '...'}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                        {(featuredPost.author || 'نویسنده').charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{featuredPost.author || 'نویسنده'}</p>
                        <p className="text-sm text-gray-500">{new Date(featuredPost.createdAt).toLocaleDateString('fa-IR') || featuredPost.date}</p>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${featuredPost.slug || featuredPost._id}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      <span>ادامه مطلب</span>
                      <span className="text-lg">←</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.slice(0, 6).map((post, index) => (
            <article
              key={post._id}
              className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-500 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image || "/placeholder.webp"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 ${post.categoryColor || 'bg-blue-500'} text-white text-xs font-semibold rounded-full shadow-md`}>
                    {getCategoryLabel(post.category) || 'مقاله'}
                  </span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <span>{new Date(post.createdAt).toLocaleDateString('fa-IR') || post.date}</span>
                  <span>•</span>
                  <span>{post.readTime || '5 دقیقه'} مطالعه</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt || post.content?.substring(0, 150) + '...'}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {(post.author || 'نویسنده').charAt(0)}
                    </div>
                    <span className="text-sm text-gray-700 font-medium">{post.author || 'نویسنده'}</span>
                  </div>

                  <Link
                    href={`/blog/${post.slug || post._id}`}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-sm hover:underline transition-colors"
                  >
                    بیشتر بخوانید
                  </Link>
                </div>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </article>
          ))}
        </div>

        {/* View All Posts Button */}
        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <span>مشاهده همه مقالات</span>
            <span className="text-lg">←</span>
          </Link>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                📧 عضویت در خبرنامه
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                از آخرین مقالات، راهنماها و تخفیف‌های ویژه ما مطلع شوید
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="ایمیل خود را وارد کنید"
                  className="flex-1 px-6 py-4 rounded-xl border-none text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
                />
                <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  عضویت
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default LatestBlogPosts;
