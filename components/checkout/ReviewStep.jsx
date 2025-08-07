'use client';
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

export default function ReviewStep({ formData, addressData, items, totalPrice, shippingCost, onConfirm }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center mb-6">
                <div className="flex-grow border-t border-secondary-400"></div>
                <h2 className="px-4 text-xl font-bold text-primary-800 whitespace-nowrap flex items-center">
                    <FaCheckCircle className="ml-2 text-green-600" />
                    تایید نهایی
                </h2>
                <div className="flex-grow border-t border-secondary-400"></div>
            </div>

            <div className="bg-primary-50 rounded-lg p-4">
                <h3 className="text-lg font-bold text-primary-800 mb-4">خلاصه سفارش</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium text-primary-700">اطلاعات مشتری:</h4>
                        <p>{formData.firstName} {formData.lastName}</p>
                        <p>{formData.phoneNumber}</p>
                        {formData.email && <p>{formData.email}</p>}
                    </div>
                    
                    <div className="space-y-2">
                        <h4 className="font-medium text-primary-700">آدرس ارسال:</h4>
                        <p>{addressData.street}</p>
                        <p>{addressData.city} - {addressData.province}</p>
                        <p>کد پستی: {addressData.postalCode}</p>
                    </div>
                </div>

                <div className="mt-6 border-t border-primary-200 pt-4">
                    <h4 className="font-medium text-primary-700 mb-2">محصولات:</h4>
                    <div className="space-y-2">
                        {items.map(item => (
                            <div key={item._id} className="flex justify-between">
                                <span>{item.name}</span>
                                <span>{item.quantity} × {new Intl.NumberFormat('fa-IR').format(item.price)} تومان</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between font-bold">
                        <span>مجموع کل:</span>
                        <span>{new Intl.NumberFormat('fa-IR').format(totalPrice + shippingCost)} تومان</span>
                    </div>
                </div>
            </div>

            <button 
                onClick={onConfirm}
                className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
                تایید و پرداخت نهایی
            </button>
        </div>
    );
}