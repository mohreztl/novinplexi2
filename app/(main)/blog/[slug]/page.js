"use client";

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Eye, Clock, ArrowRight, Share2, BookmarkPlus, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

// Helper function to convert English category values to Persian labels
const getCategoryLabel = (category) => {
  const categoryMap = {
    'tutorial': 'آموزش',
    'article': 'مقاله'
  };
  return categoryMap[category] || category;
};

export default function BlogDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [error, setError] = useState(null);

  const fetchBlog = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blog/${slug}`);
      const data = await response.json();
      
      if (data.success) {
        setBlog(data.blog);
      } else {
        setError(data.error || 'مقاله یافت نشد');
      }
    } catch (error) {
      console.error('خطا در دریافت مقاله:', error);
      setError('خطا در دریافت مقاله');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  const fetchRelatedBlogs = useCallback(async () => {
    try {
      const response = await fetch(`/api/blog?limit=3&status=published`);
      const data = await response.json();
      
      if (data.success) {
        setRelatedBlogs(data.blogs.filter(b => b.slug !== slug));
      }
    } catch (error) {
      console.error('خطا در دریافت مقالات مرتبط:', error);
    }
  }, [slug]);

  useEffect(() => {
    if (slug) {
      fetchBlog();
      fetchRelatedBlogs();
    }
  }, [slug, fetchBlog, fetchRelatedBlogs]);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('fa-IR', options);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('خطا در اشتراک‌گذاری:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('لینک کپی شد!');
    }
  };

  if (loading) {
    return <BlogSkeleton />;
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            {error || 'مقاله یافت نشد'}
          </h2>
          <p className="text-gray-500 mb-6">
            ممکن است این مقاله حذف شده باشد یا آدرس اشتباه باشد
          </p>
          <Button onClick={() => router.push('/blog')}>
            بازگشت به مقالات
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">خانه</Link>
            <ArrowRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-blue-600">مقالات</Link>
            <ArrowRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{blog.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Badge variant="secondary" className="mb-4">
              {getCategoryLabel(blog.category)}
            </Badge>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {blog.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {blog.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
              </div>
              
              {blog.author && (
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{blog.author}</span>
                </div>
              )}
              
              {blog.readTime && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{blog.readTime} دقیقه مطالعه</span>
                </div>
              )}
              
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{blog.views || 0} بازدید</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 ml-1" />
                اشتراک‌گذاری
              </Button>
              <Button variant="outline" size="sm">
                <BookmarkPlus className="w-4 h-4 ml-1" />
                ذخیره
              </Button>
            </div>
          </motion.div>

          {/* Featured Image */}
          {blog.featuredImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={blog.featuredImage}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Card>
              <CardContent className="p-8">
                <div 
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <h3 className="font-semibold text-gray-900 mb-3">برچسب‌ها:</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </motion.div>
          )}

          <Separator className="mb-8" />

          {/* Related Articles */}
          {relatedBlogs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                مقالات مرتبط
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                {relatedBlogs.map((relatedBlog) => (
                  <Link key={relatedBlog._id} href={`/blog/${relatedBlog.slug}`}>
                    <Card className="h-full hover:shadow-md transition-shadow duration-300">
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={relatedBlog.featuredImage || '/placeholder.webp'}
                          alt={relatedBlog.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <Badge variant="secondary" className="mb-2 text-xs">
                          {getCategoryLabel(relatedBlog.category)}
                        </Badge>
                        <h4 className="font-semibold text-sm line-clamp-2 mb-2">
                          {relatedBlog.title}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {relatedBlog.excerpt}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

const BlogSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <Skeleton className="h-4 w-64" />
      </div>
    </div>
    
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Skeleton className="h-6 w-24 mb-4" />
        <Skeleton className="h-12 w-full mb-4" />
        <Skeleton className="h-6 w-3/4 mb-6" />
        <div className="flex gap-4 mb-6">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-28" />
        </div>
        <Skeleton className="h-64 w-full mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  </div>
);
