
'use client';

import { useState, useEffect } from "react";
import { useAddressStore } from "@/store/addressStore";

export default function AddressStep({ onAdressChange, adressData, onLocationChange, onValidationChange }) {
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const { addresses, setAddresses, selectedAddress, setSelectedAddress } = useAddressStore();
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({
        province: '',
        city: '',
        street: '',
        postalCode: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [provincesResponse, citiesResponse, addressResponse] = await Promise.all([
                    fetch('/data/provinces.json'),
                    fetch('/data/cities.json'),
                    fetch("/api/address/list")
                ]);

                const provincesData = await provincesResponse.json();
                const citiesData = await citiesResponse.json();
                const addressData = await addressResponse.json();

                setProvinces(provincesData);
                setCities(citiesData);

                if (addressData.success) {
                    setAddresses(addressData.addresses);
                }
            } catch (error) {
                console.error("خطا در دریافت داده‌ها:", error);
            }
        };

        fetchData();
    }, []);

    const validateField = (name, value) => {
        switch (name) {
            case 'province':
                return value ? '' : 'استان اجباری است.';
            case 'city':
                return value ? '' : 'شهر اجباری است.';
            case 'street':
                return value ? '' : 'آدرس کامل اجباری است.';
            case 'postalCode':
                return value ? '' : 'کد پستی اجباری است.';
            default:
                return '';
        }
    };

    const handleProvinceChange = (e) => {
        const provinceId = Number(e.target.value);
        setSelectedProvince(provinceId);
      
        const selectedProvinceObj = provinces.find(p => p.id === provinceId);
        const matchedCities = cities.filter(city => city.province_id === provinceId);
      
        setFilteredCities(matchedCities);
        setErrors(prev => ({ ...prev, province: validateField('province', provinceId) }));
      
        if (matchedCities.length > 0) {
          const firstCity = matchedCities[0];
          setSelectedCity(firstCity.id);
      
          onLocationChange({
            province: selectedProvinceObj?.name || "",
            city: firstCity.name,
          });
      
          setErrors(prev => ({ ...prev, city: validateField('city', firstCity.id) }));
        } else {
          setSelectedCity("");
          setErrors(prev => ({ ...prev, city: validateField('city', '') }));
        }
      };
      

      const handleCityChange = (e) => {
        const cityId = Number(e.target.value);
        setSelectedCity(cityId);
      
        const selectedCityObj = cities.find(city => city.id === cityId);
        const selectedProvinceObj = provinces.find(p => p.id === selectedProvince);
      
        onLocationChange({
          province: selectedProvinceObj?.name || "",
          city: selectedCityObj?.name || "",
        });
      
        setErrors(prev => ({ ...prev, city: validateField('city', cityId) }));
      };

    const handleAdressChange = (e) => {
        onAdressChange(e);
        const { name, value } = e.target;
        setErrors(prevErrors => ({ ...prevErrors, [name]: validateField(name, value) }));
    }

    useEffect(() => {
        const newErrors = {
            province: validateField('province', selectedProvince),
            city: validateField('city', selectedCity),
            street: validateField('street', adressData?.street),
            postalCode: validateField('postalCode', adressData?.postalCode),
        };
        setErrors(newErrors);
        const isValid = Object.values(newErrors).every(error => error === '');
        onValidationChange(isValid);
    }, [selectedProvince, selectedCity, adressData, onValidationChange]);

    const saveAddress = async () => {
        setSaving(true);
    
        const provinceObj = provinces.find(p => p.id === Number(selectedProvince));
        const cityObj = cities.find(c => c.id === Number(selectedCity));
    
        const res = await fetch("/api/address/save", {
            method: "POST",
            body: JSON.stringify({
                ...adressData,
                province: provinceObj?.name || "",
                city: cityObj?.name || ""
            }),
            headers: { "Content-Type": "application/json" },
        });
    
        const data = await res.json();
        setSaving(false);
    
        if (data.success) {
            alert("آدرس ذخیره شد!");
            setAddresses([...addresses, data.address]);
        } else {
            alert("خطا در ذخیره آدرس");
        }
    };

    return (
        <div className="space-y-6">
        {/* هدر با خطوط طلایی */}
        <div className="flex items-center mb-6">
          <div className="flex-grow border-t border-gold-400"></div>
          <h2 className="px-4 text-xl font-bold text-blues-800 whitespace-nowrap">
            اطلاعات آدرس
            <span className="text-sm font-normal text-gray-500 ml-2">(فیلدهای ستاره‌دار الزامی هستند)</span>
          </h2>
          <div className="flex-grow border-t border-gold-400"></div>
        </div>
      
        {/* انتخاب استان و شهر */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-blues-700">
              استان <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={selectedProvince}
                onChange={handleProvinceChange}
                className="w-full px-4 py-3 border-2 border-blues-100 rounded-lg focus:outline-none focus:border-blues-500 focus:ring-2 focus:ring-blues-100 appearance-none bg-white"
              >
                <option value="">انتخاب استان...</option>
                {provinces.map((province) => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                ))}
              </select>
              <svg
                className="absolute left-3 top-3.5 h-5 w-5 text-blues-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
              {errors.province && (
                <div className="text-red-500 text-xs mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.province}
                </div>
              )}
            </div>
          </div>
      
          {/* انتخاب شهر (مشابه استان) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-blues-700">
              شهر <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={selectedCity}
                onChange={handleCityChange}
                className="w-full px-4 py-3 border-2 border-blues-100 rounded-lg focus:outline-none focus:border-blues-500 focus:ring-2 focus:ring-blues-100 appearance-none bg-white"
              >
                <option value="">انتخاب شهر...</option>
                {filteredCities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
              <svg
                className="absolute left-3 top-3.5 h-5 w-5 text-blues-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
              {errors.province && (
                <div className="text-red-500 text-xs mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.province}
                </div>
              )}
            </div>
          </div>
      
        
        </div>
      
        {/* آدرس و کدپستی */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-blues-700">
              آدرس کامل <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="street"
                value={adressData?.street || ""}
                onChange={handleAdressChange}
                placeholder="مثال: تهران، خیابان آزادی، پلاک ۱۲۳"
                className="w-full px-4 py-3 border-2 border-blues-100 rounded-lg focus:outline-none focus:border-blues-500 focus:ring-2 focus:ring-blues-100 pr-10"
              />
              <svg
                className="absolute right-3 top-3.5 h-5 w-5 text-blues-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
      
          <div className="space-y-2">
            <label className="block text-sm font-medium text-blues-700">
              کدپستی <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="postalCode"
              value={adressData?.postalCode || ""}
              onChange={handleAdressChange}
              placeholder="مثال: 1234567890"
              className="w-full px-4 py-3 border-2 border-blues-100 rounded-lg focus:outline-none focus:border-blues-500 focus:ring-2 focus:ring-blues-100"
              maxLength="10"
            />
          </div>
        </div>
      
        {/* آدرس‌های ذخیره شده */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-blues-800">آدرس‌های ثبت شده</h3>
          {addresses.length === 0 ? (
            <div className="text-center p-6 bg-blues-50 rounded-lg">
              <p className="text-gray-500">هنوز آدرسی ثبت نکرده‌اید</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((address) => (
                <div
                  key={address._id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedAddress?._id === address._id
                      ? "border-blues-500 bg-blues-50"
                      : "border-gray-200 hover:border-blues-200"
                  }`}
                  onClick={() => setSelectedAddress(address)}
                >
                  <div className="flex items-start">
                    <div className="flex-1">
                      <p className="font-medium text-blues-800">{address.street}</p>
                      <p className="text-sm text-gray-600">
                        {address.city}، {address.province}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">کدپستی: {address.postalCode}</p>
                    </div>
                    {selectedAddress?._id === address._id && (
                      <svg
                        className="w-5 h-5 text-green-500 ml-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      
        {/* دکمه ذخیره */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={saveAddress}
            disabled={saving}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              saving
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blues-600 text-white hover:bg-blues-700"
            }`}
          >
            {saving ? (
              <span className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                در حال ذخیره...
              </span>
            ) : (
              "ذخیره آدرس جدید"
            )}
          </button>
        </div>
      </div>)}
