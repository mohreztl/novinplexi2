"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function TestAPIPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);

  const testUploadAPI = async () => {
    try {
      const response = await fetch('/api/upload');
      const data = await response.json();
      console.log('API Status:', data);
      toast.success('API در حال کار است');
    } catch (error) {
      console.error('API Error:', error);
      toast.error('خطا در API');
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      toast.error('لطفا فایلی انتخاب کنید');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (data.success) {
        setUploadResult(data);
        toast.success('فایل با موفقیت آپلود شد');
      } else {
        console.error('Upload Error:', data);
        toast.error(data.error || 'خطا در آپلود فایل');
      }
    } catch (error) {
      console.error('Upload Error:', error);
      toast.error('خطا در آپلود فایل');
    } finally {
      setUploading(false);
    }
  };

  const testProductsAPI = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      console.log('Products:', data);
      toast.success(`${data.length} محصول یافت شد`);
    } catch (error) {
      console.error('Products Error:', error);
      toast.error('خطا در دریافت محصولات');
    }
  };

  const testCategoriesAPI = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      console.log('Categories:', data);
      toast.success('دسته‌بندی‌ها دریافت شد');
    } catch (error) {
      console.error('Categories Error:', error);
      toast.error('خطا در دریافت دسته‌بندی‌ها');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">تست API ها</h1>
      
      <div className="space-y-6">
        
        {/* Test Upload API Status */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">تست وضعیت API Upload</h2>
          <Button onClick={testUploadAPI}>
            بررسی وضعیت API Upload
          </Button>
        </div>

        {/* Test File Upload */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">تست آپلود فایل</h2>
          <div className="space-y-4">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button 
              onClick={handleFileUpload}
              disabled={uploading || !file}
            >
              {uploading ? 'در حال آپلود...' : 'آپلود فایل'}
            </Button>
            
            {uploadResult && (
              <div className="bg-green-50 p-4 rounded">
                <h3 className="font-semibold text-green-800">نتیجه آپلود:</h3>
                <pre className="text-sm text-green-700 mt-2">
                  {JSON.stringify(uploadResult, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Test Products API */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">تست API محصولات</h2>
          <Button onClick={testProductsAPI}>
            دریافت محصولات
          </Button>
        </div>

        {/* Test Categories API */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">تست API دسته‌بندی‌ها</h2>
          <Button onClick={testCategoriesAPI}>
            دریافت دسته‌بندی‌ها
          </Button>
        </div>

      </div>
    </div>
  );
}
