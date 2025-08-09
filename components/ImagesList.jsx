'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  Image as ImageIcon, 
  Check, 
  X, 
  Loader2,
  Search,
  Grid,
  List
} from "lucide-react";
import { Input } from "@/components/ui/input";

const ImagesList = ({ onImageSelect, maxSelection = 1 }) => {
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState([]);
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/file");
        const data = await response.json();
        setObjects(data);
      } catch (err) {
        console.error("Error fetching objects:", err);
        setError("خطا در بارگذاری تصاویر");
      } finally {
        setLoading(false);
      }
    };

    fetchObjects();
  }, []);

  // فیلتر کردن تصاویر بر اساس جستجو
  const filteredObjects = objects.filter(file => 
    file.Key?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUploadedImages = uploadedImages.filter(url => 
    url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelection = (image) => {
    if (maxSelection === 1) {
      // برای انتخاب تک تصویر
      setSelectedFile([image]);
      if (onImageSelect) {
        onImageSelect(image);
        closeModal();
      }
    } else {
      // برای انتخاب چند تصویر
      setSelectedFile((prev) =>
        prev.includes(image)
          ? prev.filter((img) => img !== image)
          : [...prev, image].slice(0, maxSelection)
      );
    }
  };

  const onDrop = async (acceptedFiles) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      setIsUploading(true);
      setUploadProgress(0);
      
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok) {
        setUploadedImages((prev) => [...prev, ...data.urls]);
        setUploadProgress(100);
        setTimeout(() => {
          setUploadProgress(0);
          setIsUploading(false);
        }, 1000);
      } else {
        throw new Error(data.message || 'خطا در آپلود');
      }
    } catch (error) {
      setIsUploading(false);
      setUploadProgress(0);
      setError("خطا در آپلود تصویر");
      console.error('Error uploading file:', error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: true
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFile([]);
    setSearchTerm("");
  };
  
  const handleFileSelect = () => {
    onImageSelect(selectedFile);
    closeModal();
  };

  const clearSelection = () => setSelectedFile([]);
  return (
    <div>
      {/* دکمه باز کردن مدال */}
      <Button 
        type="button" 
        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg transition-all duration-300 flex items-center gap-2" 
        onClick={openModal}
      >
        <ImageIcon className="w-4 h-4" />
        مدیریت تصاویر
      </Button>
      
      {/* مدال بهبود یافته */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ImageIcon className="w-8 h-8" />
                  <div>
                    <h2 className="text-2xl font-bold">مدیریت تصاویر</h2>
                    <p className="text-indigo-100 text-sm">
                      {selectedFile.length > 0 ? `${selectedFile.length} تصویر انتخاب شده` : 'تصاویر خود را مدیریت کنید'}
                    </p>
                  </div>
                </div>
                <button
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
                  onClick={closeModal}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(95vh-200px)]">
              
              {/* Upload Section */}
              <Card className="mb-6 border-2 border-dashed border-gray-300 hover:border-indigo-400 transition-colors">
                <CardContent className="p-6">
                  <div 
                    {...getRootProps()} 
                    className={`text-center py-8 px-4 rounded-lg transition-all cursor-pointer ${
                      isDragActive 
                        ? 'bg-indigo-50 border-indigo-400' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <input {...getInputProps()} />
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      {isDragActive ? 'فایل‌ها را اینجا رها کنید' : 'آپلود تصاویر جدید'}
                    </h3>
                    <p className="text-gray-500">
                      تصاویر را اینجا بکشید یا کلیک کنید تا انتخاب کنید
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      فرمت‌های پشتیبانی شده: JPG, PNG, GIF, WebP
                    </p>
                  </div>
                  
                  {isUploading && (
                    <div className="mt-4">
                      <div className="flex items-center gap-3">
                        <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
                        <span className="text-sm text-gray-600">در حال آپلود...</span>
                      </div>
                      {uploadProgress > 0 && (
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Search and Controls */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="جستجو در تصاویر..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  {selectedFile.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearSelection}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4 mr-1" />
                      پاک کردن انتخاب
                    </Button>
                  )}
                </div>
              </div>

              {/* تصاویر آپلود شده جدید */}
              {filteredUploadedImages.length > 0 && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="w-5 h-5 text-green-600" />
                      تصاویر آپلود شده جدید
                      <Badge variant="secondary">{filteredUploadedImages.length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4' : 'space-y-2'}>
                      {filteredUploadedImages.map((file, index) => (
                        <div
                          key={index}
                          className={`relative group cursor-pointer transition-all ${
                            selectedFile.includes(file) 
                              ? 'ring-4 ring-green-500 ring-opacity-50' 
                              : 'hover:scale-105'
                          }`}
                          onClick={() => toggleSelection(file)}
                        >
                          {viewMode === 'grid' ? (
                            <>
                              <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
                                <Image
                                  src={file}
                                  alt="تصویر آپلود شده"
                                  fill
                                  className="object-cover"
                                />
                                {selectedFile.includes(file) && (
                                  <div className="absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center">
                                    <Check className="w-8 h-8 text-green-600 bg-white rounded-full p-1" />
                                  </div>
                                )}
                              </div>
                            </>
                          ) : (
                            <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50">
                              <div className="w-16 h-16 relative rounded overflow-hidden bg-gray-100">
                                <Image
                                  src={file}
                                  alt="تصویر آپلود شده"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium truncate">تصویر جدید {index + 1}</p>
                                <p className="text-xs text-gray-500">آپلود شده</p>
                              </div>
                              {selectedFile.includes(file) && (
                                <Check className="w-5 h-5 text-green-600" />
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* تصاویر موجود */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-blue-600" />
                    تصاویر موجود
                    <Badge variant="secondary">{filteredObjects.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                      <span className="ml-3 text-gray-600">در حال بارگذاری...</span>
                    </div>
                  ) : error ? (
                    <div className="text-center py-12 text-red-600">
                      <X className="w-12 h-12 mx-auto mb-4" />
                      <p>{error}</p>
                    </div>
                  ) : filteredObjects.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <ImageIcon className="w-12 h-12 mx-auto mb-4" />
                      <p>تصویری یافت نشد</p>
                    </div>
                  ) : (
                    <div className={viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4' : 'space-y-2'}>
                      {filteredObjects.map((file) => (
                        <div
                          key={file.Key}
                          className={`relative group cursor-pointer transition-all ${
                            selectedFile.includes(file.url) 
                              ? 'ring-4 ring-blue-500 ring-opacity-50' 
                              : 'hover:scale-105'
                          }`}
                          onClick={() => toggleSelection(file.url)}
                        >
                          {viewMode === 'grid' ? (
                            <>
                              <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
                                <Image
                                  src={file.url}
                                  alt={file.Key || "تصویر"}
                                  fill
                                  className="object-cover"
                                />
                                {selectedFile.includes(file.url) && (
                                  <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                                    <Check className="w-8 h-8 text-blue-600 bg-white rounded-full p-1" />
                                  </div>
                                )}
                              </div>
                              <p className="text-xs text-gray-600 mt-2 truncate" title={file.Key}>
                                {file.Key}
                              </p>
                            </>
                          ) : (
                            <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50">
                              <div className="w-16 h-16 relative rounded overflow-hidden bg-gray-100">
                                <Image
                                  src={file.url}
                                  alt={file.Key || "تصویر"}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium truncate" title={file.Key}>
                                  {file.Key}
                                </p>
                                <p className="text-xs text-gray-500">فایل موجود</p>
                              </div>
                              {selectedFile.includes(file.url) && (
                                <Check className="w-5 h-5 text-blue-600" />
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row gap-3 justify-between items-center">
              <div className="text-sm text-gray-600">
                {selectedFile.length > 0 
                  ? `${selectedFile.length} تصویر انتخاب شده` 
                  : 'هیچ تصویری انتخاب نشده'
                }
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={closeModal}
                  className="flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  انصراف
                </Button>
                <Button 
                  onClick={handleFileSelect} 
                  disabled={selectedFile.length === 0}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  انتخاب ({selectedFile.length})
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagesList;
