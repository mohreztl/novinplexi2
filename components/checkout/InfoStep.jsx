'use client';

import React, { useState, useEffect } from 'react';

export default function InfoStep({ formData, handleChange, onValidationChange }) {
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        nationalId: '',
        email: '',
        company: '',
    });

    const validateField = (name, value) => {
        switch (name) {
            case 'firstName':
                return value ? '' : 'نام اجباری است.';
            case 'lastName':
                return value ? '' : 'نام خانوادگی اجباری است.';
            case 'phoneNumber':
                return value ? '' : 'شماره تلفن اجباری است.';
            case 'nationalId':
                return value ? '' : 'کد ملی اجباری است.';
           
            default:
                return '';
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleChange(e);
        const error = validateField(name, value);
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    };

    useEffect(() => {
        const newErrors = {};
        for (const key in formData) {
            newErrors[key] = validateField(key, formData[key]);
        }
        setErrors(newErrors);
        const isValid = Object.values(newErrors).every(error => error === '');
        onValidationChange(isValid); // Report validation status to parent
    }, [formData, onValidationChange]);

    return (
        <div className="space-y-6">
        <div className="flex items-center mb-6">
          <div className="flex-grow border-t border-gold-400"></div>
          <h2 className="px-4 text-xl font-bold text-blues-800 whitespace-nowrap">
            اطلاعات شخصی
            <span className="text-sm font-normal text-gray-500 ml-2">(فیلدهای ستاره‌دار الزامی هستند)</span>
          </h2>
          <div className="flex-grow border-t border-gold-400"></div>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* فیلد نام */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-blues-700">
              نام <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="نام خود را وارد کنید"
                className="w-full px-4 py-3 border-2 border-blues-100 rounded-lg focus:outline-none focus:border-blues-500 focus:ring-2 focus:ring-blues-100 transition-all"
              />
              {errors.firstName && (
                <div className="absolute -bottom-5 left-0 text-red-500 text-xs flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.firstName}
                </div>
              )}
            </div>
          </div>
      
          {/* فیلد نام خانوادگی */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-blues-700">
              نام خانوادگی <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="نام خانوادگی خود را وارد کنید"
                className="w-full px-4 py-3 border-2 border-blues-100 rounded-lg focus:outline-none focus:border-blues-500 focus:ring-2 focus:ring-blues-100 transition-all"
              />
              {/* نمایش خطا  */}
              {errors.lastName && (
                <div className="absolute -bottom-5 left-0 text-red-500 text-xs flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.lastName}
                </div>
              )}
            </div>
          </div>
      
          {/* فیلد شماره تلفن */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-blues-700">
              شماره همراه <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="مثال: 09123456789"
                className="w-full px-4 py-3 border-2 border-blues-100 rounded-lg focus:outline-none focus:border-blues-500 focus:ring-2 focus:ring-blues-100 transition-all pl-12"
              />
      <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">

      <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M5.73268 2.043C6.95002 0.832583 8.95439 1.04804 9.9737 2.40962L11.2347 4.09402C12.0641 5.20191 11.9909 6.75032 11.0064 7.72923L10.7676 7.96665C10.7572 7.99694 10.7319 8.09215 10.76 8.2731C10.8232 8.6806 11.1635 9.545 12.592 10.9654C14.02 12.3853 14.8905 12.7253 15.3038 12.7887C15.4911 12.8174 15.5891 12.7906 15.6194 12.78L16.0274 12.3743C16.9026 11.5041 18.2475 11.3414 19.3311 11.9305L21.2416 12.9691C22.8775 13.8584 23.2909 16.0821 21.9505 17.4148L20.53 18.8273C20.0824 19.2723 19.4805 19.6434 18.7459 19.7119C16.9369 19.8806 12.7187 19.6654 8.28659 15.2584C4.14868 11.144 3.35462 7.556 3.25415 5.78817L4.00294 5.74562L3.25415 5.78817C3.20335 4.89426 3.62576 4.13796 4.16308 3.60369L5.73268 2.043ZM8.77291 3.30856C8.26628 2.63182 7.322 2.57801 6.79032 3.10668L5.22072 4.66737C4.8908 4.99542 4.73206 5.35695 4.75173 5.70307C4.83156 7.10766 5.47286 10.3453 9.34423 14.1947C13.4057 18.2331 17.1569 18.3536 18.6067 18.2184C18.9029 18.1908 19.1975 18.0369 19.4724 17.7636L20.8929 16.3511C21.4704 15.777 21.343 14.7315 20.5252 14.2869L18.6147 13.2484C18.0871 12.9616 17.469 13.0562 17.085 13.438L16.6296 13.8909L16.1008 13.359C16.6296 13.8909 16.6289 13.8916 16.6282 13.8923L16.6267 13.8937L16.6236 13.8967L16.6171 13.903L16.6025 13.9166C16.592 13.9262 16.5799 13.9367 16.5664 13.948C16.5392 13.9705 16.5058 13.9959 16.4659 14.0227C16.3858 14.0763 16.2801 14.1347 16.1472 14.1841C15.8764 14.285 15.5192 14.3392 15.0764 14.2713C14.2096 14.1384 13.0614 13.5474 11.5344 12.0291C10.0079 10.5113 9.41194 9.36834 9.2777 8.50306C9.20906 8.06061 9.26381 7.70331 9.36594 7.43225C9.41599 7.29941 9.47497 7.19378 9.5291 7.11389C9.5561 7.07405 9.58179 7.04074 9.60446 7.01368C9.6158 7.00015 9.6264 6.98817 9.63604 6.9777L9.64977 6.96312L9.65606 6.95666L9.65905 6.95363L9.66051 6.95217C9.66122 6.95146 9.66194 6.95075 10.1908 7.48258L9.66194 6.95075L9.94875 6.66556C10.3774 6.23939 10.4374 5.53194 10.0339 4.99297L8.77291 3.30856Z" fill="#1C274C"/>
</svg>
              {/* نمایش خطا */}
              {errors.phoneNumber && (
                <div className="absolute -bottom-5 left-0 text-red-500 text-xs flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.phoneNumber}
                </div>
              )}
            </div>
          </div>
      
          {/* فیلد کد ملی */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-blues-700">
              کد ملی <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="nationalId"
                value={formData.nationalId}
                onChange={handleInputChange}
                placeholder="مثال: 1234567890"
                className="w-full px-4 py-3 border-2 border-blues-100 rounded-lg focus:outline-none focus:border-blues-500 focus:ring-2 focus:ring-blues-100 transition-all"
                maxLength="10"
              />
              {/* نمایش خطا */}
              {errors.nationalId && (
                <div className="absolute -bottom-5 left-0 text-red-500 text-xs flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.nationalId}
                </div>
              )}
            </div>
          </div>
      
          {/* فیلد ایمیل */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-blues-700">
              ایمیل (اختیاری)
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@domain.com"
                className="w-full px-4 py-3 border-2 border-blues-100 rounded-lg focus:outline-none focus:border-blues-500 focus:ring-2 focus:ring-blues-100 transition-all"
              />
              <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              {/* نمایش خطا */}
              
            </div>
          </div>
      
          {/* فیلد نام شرکت */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-blues-700">
              نام شرکت (اختیاری)
            </label>
            <div className="relative">
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="در صورت وجود نام شرکت را وارد کنید"
                className="w-full px-4 py-3 border-2 border-blues-100 rounded-lg focus:outline-none focus:border-blues-500 focus:ring-2 focus:ring-blues-100 transition-all"
              />
              <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
}