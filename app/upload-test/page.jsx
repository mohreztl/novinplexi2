"use client";

import React, { useState } from 'react';

export default function UploadTest() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('لطفاً فایلی انتخاب کنید');
      return;
    }

    setUploading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || 'خطا در آپلود فایل');
      }
    } catch (err) {
      setError('خطا در ارسال درخواست: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const testApiStatus = async () => {
    try {
      const response = await fetch('/api/upload');
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('خطا در تست API: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">تست آپلود فایل</h1>
        
        {/* API Status Test */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">تست وضعیت API</h2>
          <button 
            onClick={testApiStatus}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            تست وضعیت API
          </button>
        </div>

        {/* File Upload Test */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">تست آپلود فایل</h2>
          <div className="space-y-4">
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            
            {file && (
              <div className="text-sm text-gray-600">
                فایل انتخاب شده: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            )}
            
            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {uploading ? 'در حال آپلود...' : 'آپلود فایل'}
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-green-800 mb-2">نتیجه:</h3>
            <pre className="text-sm text-green-700 whitespace-pre-wrap overflow-x-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <h3 className="font-semibold text-red-800 mb-2">خطا:</h3>
            <p className="text-red-700">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
