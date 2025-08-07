"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Plus, Edit, Trash2, Eye, Calendar, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog';
import ClientOnly from '@/components/ClientOnly';

const CATEGORIES = [
  'تکنولوژی', 'طراحی داخلی', 'مواد ساختمانی', 'محصولات', 
  'راهنمای خرید', 'اخبار شرکت', 'نکات و ترفندها'
];

const STATUS_OPTIONS = [
  { value: 'published', label: 'منتشر شده', color: 'bg-green-100 text-green-800' },
  { value: 'draft', label: 'پیش‌نویس', color: 'bg-gray-100 text-gray-800' },
  { value: 'archived', label: 'آرشیو شده', color: 'bg-red-100 text-red-800' }
];

export default function AdminBlogListPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, blog: null });

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20'
      });
      
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedStatus) params.append('status', selectedStatus);
      
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
  };

  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchTerm, selectedCategory, selectedStatus]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      const blog = blogs.find(b => b._id === blogId);
      const response = await fetch(`/api/blog/${blog.slug}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setBlogs(blogs.filter(b => b._id !== blogId));
        setDeleteDialog({ open: false, blog: null });
        // Show success message
      }
    } catch (error) {
      console.error('خطا در حذف مقاله:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('fa-IR', options);
  };

  const getStatusBadge = (status) => {
    const statusOption = STATUS_OPTIONS.find(option => option.value === status);
    return (
      <Badge variant="secondary" className={statusOption?.color || 'bg-gray-100 text-gray-800'}>
        {statusOption?.label || status}
      </Badge>
    );
  };

  const BlogTableSkeleton = () => (
    <div className="space-y-3">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
          <Skeleton className="h-16 w-24" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-8" />
        </div>
      ))}
    </div>
  );

  return (
    <ClientOnly fallback={<div className="p-6">در حال بارگذاری...</div>}>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">مدیریت مقالات</h1>
          <p className="text-gray-600">مدیریت و ویرایش مقالات وبسایت</p>
        </div>
        
        <Link href="/adminnovin/blog/create">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            مقاله جدید
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">کل مقالات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBlogs}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">منتشر شده</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {blogs.filter(b => b.status === 'published').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">پیش‌نویس</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {blogs.filter(b => b.status === 'draft').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">آرشیو شده</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {blogs.filter(b => b.status === 'archived').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>فیلتر و جستجو</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="جستجو در مقالات..."
                value={searchTerm}
                onChange={handleSearch}
                className="pr-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="انتخاب دسته‌بندی" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">همه دسته‌ها</SelectItem>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedStatus} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="انتخاب وضعیت" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">همه وضعیت‌ها</SelectItem>
                {STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Blog Table */}
      <Card>
        <CardHeader>
          <CardTitle>فهرست مقالات</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <BlogTableSkeleton />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>تصویر</TableHead>
                    <TableHead>عنوان</TableHead>
                    <TableHead>دسته‌بندی</TableHead>
                    <TableHead>وضعیت</TableHead>
                    <TableHead>تاریخ</TableHead>
                    <TableHead>بازدید</TableHead>
                    <TableHead>عملیات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogs.map((blog) => (
                    <TableRow key={blog._id}>
                      <TableCell>
                        <div className="relative w-16 h-12 rounded overflow-hidden">
                          <Image
                            src={blog.featuredImage || '/placeholder.webp'}
                            alt={blog.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div>
                          <div className="font-medium line-clamp-1">
                            {blog.title}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-1">
                            {blog.excerpt}
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Badge variant="secondary">
                          {blog.category}
                        </Badge>
                      </TableCell>
                      
                      <TableCell>
                        {getStatusBadge(blog.status)}
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {formatDate(blog.publishedAt || blog.createdAt)}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Eye className="w-4 h-4" />
                          {blog.views || 0}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/blog/${blog.slug}`} target="_blank">
                                <Eye className="w-4 h-4 ml-2" />
                                مشاهده
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/adminnovin/blog/edit/${blog.slug}`}>
                                <Edit className="w-4 h-4 ml-2" />
                                ویرایش
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setDeleteDialog({ open: true, blog })}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4 ml-2" />
                              حذف
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              قبلی
            </Button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                onClick={() => setCurrentPage(page)}
                className="min-w-[40px]"
              >
                {page}
              </Button>
            ))}
            
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              بعدی
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, blog: null })}
        onConfirm={() => handleDeleteBlog(deleteDialog.blog?._id)}
        title="حذف مقاله"
        message={`آیا از حذف مقاله "${deleteDialog.blog?.title}" اطمینان دارید؟`}
      />
    </div>
    </ClientOnly>
  );
}
