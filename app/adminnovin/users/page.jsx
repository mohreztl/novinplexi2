"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Search,
  User,
  MoreVertical,
  Loader2,
  ShieldCheck,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const UserRow = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-500" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email || 'ایمیل ندارد'}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-gray-500">{user.phoneNumber}</td>
      <td className="px-4 py-4">
        {user.admin ? (
          <Badge variant="destructive" className="flex items-center gap-1 w-fit">
            <ShieldCheck className="w-3 h-3" />
            مدیر
          </Badge>
        ) : (
          <Badge variant="secondary" className="flex items-center gap-1 w-fit">
            <User className="w-3 h-3" />
            کاربر
          </Badge>
        )}
      </td>
      <td className="px-4 py-4 text-sm text-gray-500">
        {user.createdAt ? new Date(user.createdAt).toLocaleDateString('fa-IR') : 'نامشخص'}
      </td>
      <td className="px-4 py-4">
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </button>
          {isMenuOpen && (
            <div className="absolute left-0 mt-2 w-48 rounded-lg bg-white shadow-lg border border-gray-200 py-1 z-10">
              <button
                className="w-full px-4 py-2 text-sm text-right text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                مشاهده پروفایل
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20'
      });
      
      if (searchTerm) {
        params.append('search', searchTerm);
      }
      
      const response = await fetch(`/api/users?${params}`);
      
      if (!response.ok) {
        throw new Error('خطا در دریافت کاربران');
      }
      
      const data = await response.json();
      setUsers(data.users || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setTotalUsers(data.pagination?.totalUsers || 0);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('خطا در دریافت کاربران');
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">مدیریت کاربران</h1>
      </div>

      {/* آمار کلی */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">کل کاربران</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalUsers.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">کاربران فعال</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{users.filter(u => !u.admin).length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">مدیران</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{users.filter(u => u.admin).length}</div>
          </CardContent>
        </Card>
      </div>

      {/* فیلتر و جستجو */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="جستجو بر اساس نام، شماره تلفن یا ایمیل..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* جدول کاربران */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              <span className="mr-2">در حال بارگذاری...</span>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        کاربر
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        شماره تلفن
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        نقش
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        تاریخ عضویت
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        عملیات
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                          کاربری یافت نشد
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => (
                        <UserRow key={user._id} user={user} />
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    صفحه {currentPage} از {totalPages}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronRight className="w-4 h-4" />
                      قبلی
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                    >
                      بعدی
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
