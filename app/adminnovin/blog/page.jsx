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

// Helper function to convert English category values to Persian labels
const getCategoryLabel = (category) => {
  const categoryMap = {
    'tutorial': 'آموزش',
    'article': 'مقاله'
  };
  return categoryMap[category] || category;
};

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
        setBlogs(data.data);
        setTotalPages(data.pagination.totalPages);
        setTotalBlogs(data.pagination.totalItems);
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
    setSelectedCategory(category === 'all' ? '' : category);
    setCurrentPage(1);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status === 'all' ? '' : status);
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
      <div className="px-2 md:px-4 py-4 md:py-6 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">مدیریت مقالات</h1>
          <p className="text-gray-600 text-sm md:text-base">مدیریت و ویرایش مقالات وبسایت</p>
        </div>
        
        <Link href="/adminnovin/blog/create">
          <Button className="gap-2 w-full md:w-auto">
            <Plus className="w-4 h-4" />
            مقاله جدید
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 md:p-6">
            <CardTitle className="text-xs md:text-sm font-medium">کل مقالات</CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-6 pt-0">
            <div className="text-lg md:text-2xl font-bold">{totalBlogs}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 md:p-6">
            <CardTitle className="text-xs md:text-sm font-medium">منتشر شده</CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-6 pt-0">
            <div className="text-lg md:text-2xl font-bold text-green-600">
              {blogs.filter(b => b.status === 'published').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 md:p-6">
            <CardTitle className="text-xs md:text-sm font-medium">پیش‌نویس</CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-6 pt-0">
            <div className="text-lg md:text-2xl font-bold text-yellow-600">
              {blogs.filter(b => b.status === 'draft').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 md:p-6">
            <CardTitle className="text-xs md:text-sm font-medium">آرشیو شده</CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-6 pt-0">
            <div className="text-lg md:text-2xl font-bold text-red-600">
              {blogs.filter(b => b.status === 'archived').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="p-3 md:p-6">
          <CardTitle className="text-lg md:text-xl">فیلتر و جستجو</CardTitle>
        </CardHeader>
        <CardContent className="p-3 md:p-6 pt-0">
          <div className="flex flex-col gap-3 md:flex-row md:gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="جستجو در مقالات..."
                value={searchTerm}
                onChange={handleSearch}
                className="pr-10 text-sm"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="انتخاب دسته‌بندی" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه دسته‌ها</SelectItem>
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
                <SelectItem value="all">همه وضعیت‌ها</SelectItem>
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
        <CardHeader className="p-3 md:p-6">
          <CardTitle className="text-lg md:text-xl">فهرست مقالات</CardTitle>
        </CardHeader>
        <CardContent className="p-3 md:p-6 pt-0">
          {loading ? (
            <BlogTableSkeleton />
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="whitespace-nowrap">تصویر</TableHead>
                      <TableHead className="whitespace-nowrap">عنوان</TableHead>
                      <TableHead className="whitespace-nowrap">دسته‌بندی</TableHead>
                      <TableHead className="whitespace-nowrap">وضعیت</TableHead>
                      <TableHead className="whitespace-nowrap">تاریخ</TableHead>
                      <TableHead className="whitespace-nowrap">بازدید</TableHead>
                      <TableHead className="whitespace-nowrap">عملیات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blogs.map((blog) => (
                      <TableRow key={blog._id}>
                        <TableCell>
                          <div className="relative w-16 h-12 rounded overflow-hidden bg-gray-100">
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
                            <div className="font-medium line-clamp-1 max-w-xs">
                              {blog.title}
                            </div>
                            <div className="text-sm text-gray-500 line-clamp-1 max-w-xs">
                              {blog.excerpt}
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <Badge variant="secondary">
                            {getCategoryLabel(blog.category)}
                          </Badge>
                        </TableCell>
                        
                        <TableCell>
                          {getStatusBadge(blog.status)}
                        </TableCell>
                        
                        <TableCell className="whitespace-nowrap text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {formatDate(blog.createdAt)}
                          </div>
                        </TableCell>
                        
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Eye className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{blog.views || 0}</span>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/adminnovin/blog/edit/${blog._id}`}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  ویرایش
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => setDeleteDialog({ open: true, blog })}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
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

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {blogs.map((blog) => (
                  <Card key={blog._id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="relative w-20 h-16 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image
                            src={blog.featuredImage || '/placeholder.webp'}
                            alt={blog.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="space-y-2">
                            <div>
                              <h3 className="font-medium text-gray-900 line-clamp-2 text-sm">
                                {blog.title}
                              </h3>
                              <p className="text-xs text-gray-500 line-clamp-1">
                                {blog.excerpt}
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-2 text-xs">
                              <Badge variant="secondary" className="text-xs">
                                {getCategoryLabel(blog.category)}
                              </Badge>
                              {getStatusBadge(blog.status)}
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {formatDate(blog.createdAt)}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  {blog.views || 0}
                                </div>
                              </div>
                              
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <MoreHorizontal className="h-3 w-3" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem asChild>
                                    <Link href={`/adminnovin/blog/edit/${blog._id}`}>
                                      <Edit className="mr-2 h-4 w-4" />
                                      ویرایش
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => setDeleteDialog({ open: true, blog })}
                                    className="text-red-600"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    حذف
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              قبلی
            </Button>
            
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let page;
              if (totalPages <= 5) {
                page = i + 1;
              } else if (currentPage <= 3) {
                page = i + 1;
              } else if (currentPage >= totalPages - 2) {
                page = totalPages - 4 + i;
              } else {
                page = currentPage - 2 + i;
              }
              
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="min-w-[40px]"
                >
                  {page}
                </Button>
              );
            })}
            
            <Button
              variant="outline"
              size="sm"
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
