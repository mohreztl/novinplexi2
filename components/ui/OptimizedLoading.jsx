import React from 'react';

const OptimizedLoading = ({ 
  type = 'default', 
  height = 'h-96', 
  className = '' 
}) => {
  const getLoadingType = () => {
    switch (type) {
      case 'hero':
        return (
          <div className={`${height} bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden ${className}`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-3 h-3 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-3 h-3 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        );
      
      case 'products':
        return (
          <div className={`${height} bg-gray-50 p-6 ${className}`}>
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
                    <div className="h-48 bg-gray-200 animate-pulse"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                      <div className="h-5 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'categories':
        return (
          <div className={`${height} bg-white p-6 ${className}`}>
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-6 animate-pulse">
                    <div className="h-12 w-12 bg-gray-300 rounded-full mb-4"></div>
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-300 rounded"></div>
                      <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'features':
        return (
          <div className={`${height} bg-white p-6 ${className}`}>
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className="text-center p-6">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse"></div>
                    <div className="h-5 bg-gray-200 rounded mx-auto mb-2 w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded mx-auto w-full animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'blog':
        return (
          <div className={`${height} bg-gray-50 p-6 ${className}`}>
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }, (_, i) => (
                  <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
                    <div className="h-40 bg-gray-200 animate-pulse"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className={`${height} bg-gray-50 flex items-center justify-center ${className}`}>
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        );
    }
  };

  return getLoadingType();
};

export default OptimizedLoading;
