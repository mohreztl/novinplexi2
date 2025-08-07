"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Calendar, Eye, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const CATEGORIES = [
  'تکنولوژی', 'طراحی داخلی', 'مواد ساختمانی', 'محصولات', 
  'راهنمای خرید', 'اخبار شرکت', 'نکات و ترفندها'
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
        limit: '9',
        status: 'published'
      });
      
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory) params.append('category', selectedCategory);
      
      const response = await fetch(`/api/blog?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setBlogs(data.blogs);
        setTotalPages(data.pagination.totalPages);
        setTotalBlogs(data.pagination.totalBlogs);
      }
    } catch (error) {
      console.error('خطا در دریافت مقالات:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, selectedCategory]);

  useEffect(() => {
    fetchBlogs();
  }, [currentPage, searchTerm, selectedCategory, fetchBlogs]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('fa-IR', options);
  };

  const BlogCard = ({ blog }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={blog.featuredImage || '/placeholder.webp'}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {blog.featured && (
            <Badge className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-blue-500">
              ویژه
            </Badge>
          )}
        </div>
        
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
            <div className="flex items-center gap-1 mr-auto">
              <Eye className="w-4 h-4" />
              <span>{blog.views || 0}</span>
            </div>
          </div>
          
          <Badge variant="secondary" className="w-fit mb-2">
            {blog.category}
          </Badge>
          
          <h3 className="font-bold text-lg leading-tight line-clamp-2 hover:text-blue-600 transition-colors">
            {blog.title}
          </h3>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
            {blog.excerpt}
          </p>
          
          {blog.readTime && (
            <div className="flex items-center gap-1 mt-3 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{blog.readTime} دقیقه مطالعه</span>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="pt-0">
          <Link 
            href={`/blog/${blog.slug}`}
            className="w-full"
          >
            <Button variant="outline" className="w-full">
              ادامه مطالعه
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );

  const BlogSkeleton = () => (
    <Card className="h-full">
      <Skeleton className="h-48 w-full" />
      <CardHeader>
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              مقالات و اخبار
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              آخرین مقالات، اخبار و راهنماهای مفید در زمینه محصولات و خدمات ما
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* فیلترها و جستجو */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="جستجو در مقالات..."
                value={searchTerm}
                onChange={handleSearch}
                className="pr-10"
              />
            </div>
          </div>

          {/* دسته‌بندی‌ها */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === '' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleCategoryChange('')}
            >
              همه
            </Button>
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* نتایج */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {totalBlogs} مقاله یافت شد
          </p>
        </div>

        {/* مقالات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {loading
            ? Array.from({ length: 9 }).map((_, index) => (
                <BlogSkeleton key={index} />
              ))
            : blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))
          }
        </div>

        {/* صفحه‌بندی */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center gap-2"
          >
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <ChevronRight className="w-4 h-4" />
              قبلی
            </Button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="min-w-[40px]"
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              بعدی
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </motion.div>
        )}

        {/* پیام خالی */}
        {!loading && blogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              مقاله‌ای یافت نشد
            </h3>
            <p className="text-gray-500">
              با کلیدواژه‌های دیگری جستجو کنید یا فیلترها را تغییر دهید
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
