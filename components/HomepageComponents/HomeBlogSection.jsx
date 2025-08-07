"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowLeft, Clock, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function HomeBlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedBlogs();
  }, []);

  const fetchFeaturedBlogs = async () => {
    try {
      const response = await fetch('/api/blog?limit=6&status=published&featured=true');
      const data = await response.json();
      
      if (data.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.error('خطا در دریافت مقالات:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('fa-IR', options);
  };

  const BlogCard = ({ blog, featured = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/blog/${blog.slug}`}>
        <Card className={`h-full overflow-hidden hover:shadow-lg transition-all duration-300 group ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}>
          <div className={`relative overflow-hidden ${featured ? 'h-64 md:h-80' : 'h-48'}`}>
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          <CardHeader className={`pb-3 ${featured ? 'p-6' : 'p-4'}`}>
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
            
            <h3 className={`font-bold leading-tight line-clamp-2 hover:text-blue-600 transition-colors ${featured ? 'text-xl' : 'text-lg'}`}>
              {blog.title}
            </h3>
          </CardHeader>
          
          <CardContent className={`pt-0 ${featured ? 'px-6 pb-6' : 'p-4'}`}>
            <p className={`text-muted-foreground line-clamp-3 text-sm leading-relaxed ${featured ? 'line-clamp-4' : ''}`}>
              {blog.excerpt}
            </p>
            
            {blog.readTime && (
              <div className="flex items-center gap-1 mt-3 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{blog.readTime} دقیقه مطالعه</span>
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );

  const BlogSkeleton = ({ featured = false }) => (
    <Card className={`h-full ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}>
      <Skeleton className={`w-full ${featured ? 'h-64 md:h-80' : 'h-48'}`} />
      <CardHeader className={featured ? 'p-6' : 'p-4'}>
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </CardHeader>
      <CardContent className={featured ? 'px-6 pb-6' : 'p-4'}>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-48 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BlogSkeleton featured />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </section>
    );
  }

  if (!blogs.length) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            آخرین مقالات و اخبار
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            با آخرین مقالات، اخبار و راهنماهای مفید ما همراه باشید
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {blogs.map((blog, index) => (
            <BlogCard 
              key={blog._id} 
              blog={blog} 
              featured={index === 0} 
            />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <Link href="/blog">
            <Button size="lg" className="group">
              مشاهده همه مقالات
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
