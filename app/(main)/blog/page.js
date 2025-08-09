"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Calendar, Eye, Clock, ChevronLeft, ChevronRight, User, Tag, Filter, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const CATEGORIES = [
  'دکوراسیون', 'کاغذ دیواری', 'موکت', 'کفپوش', 'راهنمای خرید', 'ترندها', 'آموزشی'
];

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '12',
        status: 'published'
      });
      
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory) params.append('category', selectedCategory);
      
      const response = await fetch(`/api/blog?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setBlogs(data.data || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalBlogs(data.pagination?.totalItems || 0);
      } else {
        console.error('خطا در دریافت مقالات:', data.error);
        setBlogs([]);
      }
    } catch (error) {
      console.error('خطا در دریافت مقالات:', error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, selectedCategory]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    try {
      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
      };
      return new Date(dateString).toLocaleDateString('fa-IR', options);
    } catch {
      return 'تاریخ نامشخص';
    }
  };

  const BlogCard = ({ blog, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] bg-white border-0 shadow-lg">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={blog.featuredImage || '/placeholder.webp'}
            alt={blog.title || 'عنوان مقاله'}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <Badge className="bg-white/90 text-gray-900 hover:bg-white border-0 shadow-lg">
              <Tag className="w-3 h-3 mr-1" />
              {blog.category || 'عمومی'}
            </Badge>
          </div>
          
          {/* Featured Badge */}
          {blog.featured && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 shadow-lg">
                <TrendingUp className="w-3 h-3 mr-1" />
                ویژه
              </Badge>
            </div>
          )}
          
          {/* Bottom info overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-4 text-white text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{blog.views || 0}</span>
              </div>
              {blog.readTime && (
                <div className="flex items-center gap-1 mr-auto">
                  <Clock className="w-4 h-4" />
                  <span>{blog.readTime} دقیقه</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <CardContent className="p-6">
          {/* Author */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-gray-600">{blog.author?.name || 'نوین پلکسی'}</span>
          </div>
          
          {/* Title */}
          <Link href={`/blog/${blog.slug || blog._id}`}>
            <h3 className="font-bold text-xl mb-3 leading-tight line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
              {blog.title || 'عنوان مقاله'}
            </h3>
          </Link>
          
          {/* Excerpt */}
          <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed mb-4">
            {blog.excerpt || 'خلاصه‌ای از محتوای مقاله در دسترس نیست.'}
          </p>
          
          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {blog.tags.slice(0, 3).map((tag, tagIndex) => (
                <Badge key={tagIndex} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          
          {/* Read More Button */}
          <Link href={`/blog/${blog.slug || blog._id}`}>
            <Button 
              variant="outline" 
              className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300"
            >
              ادامه مطالعه
              <ChevronLeft className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );

  const BlogSkeleton = () => (
    <Card className="h-full overflow-hidden">
      <Skeleton className="h-64 w-full" />
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-6 w-full mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-32 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              مقالات و اخبار
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              آخرین مقالات، اخبار و راهنماهای مفید در زمینه دکوراسیون، محصولات و خدمات نوین پلکسی
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 border">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="جستجو در مقالات، عنوان، محتوا و برچسب‌ها..."
                value={searchTerm}
                onChange={handleSearch}
                className="pr-12 pl-4 h-12 text-lg border-gray-200 focus:border-blue-500 rounded-xl"
              />
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">دسته‌بندی:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant={selectedCategory === '' ? 'default' : 'outline'}
                onClick={() => handleCategoryChange('')}
                className="rounded-full"
              >
                همه دسته‌ها
              </Button>
              {CATEGORIES.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => handleCategoryChange(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 text-lg"
          >
            {totalBlogs} مقاله یافت شد
          </motion.p>
          
          {(searchTerm || selectedCategory) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-2"
            >
              {searchTerm && (
                <Badge variant="secondary" className="text-sm">
                  جستجو: {searchTerm}
                </Badge>
              )}
              {selectedCategory && (
                <Badge variant="secondary" className="text-sm">
                  دسته: {selectedCategory}
                </Badge>
              )}
            </motion.div>
          )}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {loading
            ? Array.from({ length: 12 }).map((_, index) => (
                <BlogSkeleton key={index} />
              ))
            : blogs.map((blog, index) => (
                <BlogCard key={blog._id || index} blog={blog} index={index} />
              ))
          }
        </div>

        {/* Pagination */}
        {totalPages > 1 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center items-center gap-2"
          >
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
              قبلی
            </Button>

            <div className="flex gap-2">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let page = i + 1;
                if (totalPages > 5) {
                  if (currentPage > 3) {
                    page = currentPage - 2 + i;
                  }
                  if (currentPage > totalPages - 3) {
                    page = totalPages - 4 + i;
                  }
                }
                
                if (page > totalPages) return null;
                
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    onClick={() => setCurrentPage(page)}
                    className="min-w-[44px] rounded-full"
                  >
                    {page}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="rounded-full"
            >
              بعدی
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && blogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center py-20"
          >
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              <Search className="w-16 h-16 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              مقاله‌ای یافت نشد
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              متأسفانه با این جستجو یا فیلتر مقاله‌ای پیدا نشد. لطفاً کلیدواژه‌های دیگری امتحان کنید.
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                setCurrentPage(1);
              }}
              className="rounded-full"
            >
              پاک کردن فیلترها
            </Button>
          </motion.div>
        )}
      </div>

      <style jsx>{`
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
    </div>
  );
}
