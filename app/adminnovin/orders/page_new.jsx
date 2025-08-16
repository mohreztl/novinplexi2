"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Search,
  Loader2,
  ArrowUpDown,
  Eye,
  Calendar,
  Package,
  ShoppingCart,
  User,
  Edit3,
  Trash2,
  Download,
  RefreshCw,
  AlertCircle,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import moment from "moment-jalaali";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [dateFilter, setDateFilter] = useState("all");
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    processing: 0,
    completed: 0,
    cancelled: 0,
    totalRevenue: 0,
  });

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/orders");
      let filteredOrders = response.data;

      // فیلتر بر اساس تاریخ
      if (dateFilter !== "all") {
        const now = new Date();
        let startDate;
        
        switch (dateFilter) {
          case "today":
            startDate = new Date(now.setHours(0, 0, 0, 0));
            break;
          case "week":
            startDate = new Date(now.setDate(now.getDate() - 7));
            break;
          case "month":
            startDate = new Date(now.setMonth(now.getMonth() - 1));
            break;
          case "year":
            startDate = new Date(now.setFullYear(now.getFullYear() - 1));
            break;
          default:
            startDate = null;
        }
        
        if (startDate) {
          filteredOrders = filteredOrders.filter(
            (order) => new Date(order.createdAt) >= startDate
          );
        }
      }

      // فیلتر بر اساس وضعیت
      if (statusFilter !== "all") {
        filteredOrders = filteredOrders.filter(
          (order) => order.status === statusFilter
        );
      }

      // محاسبه آمار
      const newStats = {
        total: filteredOrders.length,
        pending: filteredOrders.filter((order) => order.status === "pending").length,
        processing: filteredOrders.filter((order) => order.status === "processing").length,
        completed: filteredOrders.filter((order) => order.status === "completed").length,
        cancelled: filteredOrders.filter((order) => order.status === "cancelled").length,
        totalRevenue: filteredOrders
          .filter((order) => order.status === "completed")
          .reduce((sum, order) => sum + order.totalAmount, 0),
      };
      setStats(newStats);

      // مرتب‌سازی
      filteredOrders.sort((a, b) => {
        if (sortBy === "newest") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        } else if (sortBy === "oldest") {
          return new Date(a.createdAt) - new Date(b.createdAt);
        } else if (sortBy === "highAmount") {
          return b.totalAmount - a.totalAmount;
        } else if (sortBy === "lowAmount") {
          return a.totalAmount - b.totalAmount;
        }
        return 0;
      });

      setOrders(filteredOrders);
    } catch (error) {
      toast.error("خطا در دریافت سفارشات");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [sortBy, statusFilter, dateFilter]);

  useEffect(() => {
    fetchOrders();
  }, [sortBy, statusFilter, dateFilter, fetchOrders]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(`/api/orders/${orderId}`, { status: newStatus });
      toast.success("وضعیت سفارش با موفقیت به‌روزرسانی شد");
      fetchOrders();
    } catch (error) {
      toast.error("خطا در به‌روزرسانی وضعیت سفارش");
      console.error(error);
    }
  };

  const deleteOrder = async (orderId) => {
    if (!confirm("آیا از حذف این سفارش اطمینان دارید؟")) return;
    
    try {
      await axios.delete(`/api/orders/${orderId}`);
      toast.success("سفارش با موفقیت حذف شد");
      fetchOrders();
    } catch (error) {
      toast.error("خطا در حذف سفارش");
      console.error(error);
    }
  };

  const exportOrders = () => {
    const csvContent = [
      ['شماره سفارش', 'تاریخ', 'نام مشتری', 'مبلغ', 'وضعیت'],
      ...filteredOrders.map(order => [
        order.orderNumber,
        moment(order.createdAt).format("jYYYY/jMM/jDD"),
        order.customer?.name || 'نامشخص',
        order.totalAmount,
        getStatusText(order.status)
      ])
    ].map(e => e.join(",")).join("\\n");
    
    const element = document.createElement("a");
    const file = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    element.href = URL.createObjectURL(file);
    element.download = `orders_${moment().format('jYYYY-jMM-jDD')}.csv`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-3 h-3" />;
      case "processing":
        return <Package className="w-3 h-3" />;
      case "completed":
        return <CheckCircle2 className="w-3 h-3" />;
      case "cancelled":
        return <XCircle className="w-3 h-3" />;
      default:
        return <AlertCircle className="w-3 h-3" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "در انتظار تأیید";
      case "processing":
        return "در حال پردازش";
      case "completed":
        return "تکمیل شده";
      case "cancelled":
        return "لغو شده";
      default:
        return status;
    }
  };

  const filteredOrders = orders.filter((order) => {
    try {
      return (
        order.orderNumber.toString().includes(searchTerm) ||
        (order.customer?.name &&
          typeof order.customer.name === "string" &&
          order.customer.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (order.customer?.email &&
          typeof order.customer.email === "string" &&
          order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    } catch (error) {
      console.error("Error filtering orders:", error);
      return false;
    }
  });

  const StatusUpdateDialog = ({ order }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Edit3 className="w-3 h-3" />
          تغییر وضعیت
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            تغییر وضعیت سفارش #{order.orderNumber}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {["pending", "processing", "completed", "cancelled"].map((status) => (
              <Button
                key={status}
                variant={order.status === status ? "default" : "outline"}
                size="sm"
                onClick={() => updateOrderStatus(order._id, status)}
                className="flex items-center gap-2"
              >
                {getStatusIcon(status)}
                {getStatusText(status)}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const OrderDetailsDialog = ({ order }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Eye className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            جزئیات سفارش #{order.orderNumber}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* اطلاعات مشتری */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <User className="w-4 h-4" />
              اطلاعات مشتری
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-3 h-3 text-gray-500" />
                <span>{order.customer?.name || 'نامشخص'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3 text-gray-500" />
                <span>{order.customer?.email || 'نامشخص'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3 text-gray-500" />
                <span>{order.customer?.phone || 'نامشخص'}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3 text-gray-500" />
                <span>{order.customer?.address || 'نامشخص'}</span>
              </div>
            </div>
          </div>

          {/* محصولات */}
          <div>
            <h3 className="font-medium mb-3">محصولات سفارش</h3>
            <div className="space-y-2">
              {order.cartProducts?.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <span className="font-medium">{item.product?.name || 'محصول نامشخص'}</span>
                    <span className="text-sm text-gray-500 mr-2">تعداد: {item.quantity}</span>
                  </div>
                  <span className="font-medium">
                    {(item.price * item.quantity).toLocaleString("fa-IR")} تومان
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* جمع کل */}
          <div className="flex justify-between items-center text-lg font-bold">
            <span>مجموع کل:</span>
            <span>{order.totalAmount.toLocaleString("fa-IR")} تومان</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">مدیریت سفارشات</h1>
          <p className="text-gray-500 mt-1">مدیریت و پیگیری تمام سفارشات</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={fetchOrders} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 ml-2" />
            به‌روزرسانی
          </Button>
          <Button onClick={exportOrders} variant="outline" size="sm">
            <Download className="w-4 h-4 ml-2" />
            خروجی CSV
          </Button>
        </div>
      </div>

      {/* آمار */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              کل سفارشات
            </CardTitle>
            <ShoppingCart className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              در انتظار تأیید
            </CardTitle>
            <Clock className="w-4 h-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              در حال پردازش
            </CardTitle>
            <Package className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.processing}</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              تکمیل شده
            </CardTitle>
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              درآمد کل
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-green-600">
              {stats.totalRevenue.toLocaleString("fa-IR")} تومان
            </div>
          </CardContent>
        </Card>
      </div>

      {/* فیلترها و جستجو */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="جستجوی سفارش، مشتری یا ایمیل..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="فیلتر وضعیت" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه وضعیت‌ها</SelectItem>
                <SelectItem value="pending">در انتظار تأیید</SelectItem>
                <SelectItem value="processing">در حال پردازش</SelectItem>
                <SelectItem value="completed">تکمیل شده</SelectItem>
                <SelectItem value="cancelled">لغو شده</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="فیلتر تاریخ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه تاریخ‌ها</SelectItem>
                <SelectItem value="today">امروز</SelectItem>
                <SelectItem value="week">هفته گذشته</SelectItem>
                <SelectItem value="month">ماه گذشته</SelectItem>
                <SelectItem value="year">سال گذشته</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="مرتب‌سازی" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">جدیدترین</SelectItem>
                <SelectItem value="oldest">قدیمی‌ترین</SelectItem>
                <SelectItem value="highAmount">بیشترین مبلغ</SelectItem>
                <SelectItem value="lowAmount">کمترین مبلغ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* جدول سفارشات */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p className="text-gray-500">در حال بارگذاری سفارشات...</p>
          </div>
        </div>
      ) : filteredOrders.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">سفارشی یافت نشد</h3>
            <p className="text-gray-500">هیچ سفارشی با فیلترهای انتخابی پیدا نشد.</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">شماره سفارش</TableHead>
                  <TableHead className="font-semibold">
                    <div className="flex items-center gap-2">
                      تاریخ
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold">مشتری</TableHead>
                  <TableHead className="font-semibold">مبلغ (تومان)</TableHead>
                  <TableHead className="font-semibold">وضعیت</TableHead>
                  <TableHead className="font-semibold text-left">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order._id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      #{order.orderNumber}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {moment(order.createdAt).format("jYYYY/jMM/jDD")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customer?.name || 'نامشخص'}</div>
                        <div className="text-sm text-gray-500">{order.customer?.email || 'ایمیل نامشخص'}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {order.totalAmount.toLocaleString("fa-IR")}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`flex items-center gap-1 w-fit ${getStatusColor(order.status)}`}
                      >
                        {getStatusIcon(order.status)}
                        {getStatusText(order.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <OrderDetailsDialog order={order} />
                        <StatusUpdateDialog order={order} />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteOrder(order._id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrdersPage;
