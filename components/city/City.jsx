'use client';

import { useState, useEffect } from 'react';

export default function SelectProvince({onLocationChange}) {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  useEffect(() => {
    // بارگذاری استان‌ها و شهرها همزمان
    const fetchData = async () => {
      const [provincesResponse, citiesResponse] = await Promise.all([
        fetch('/data/provinces.json'),
        fetch('/data/cities.json'),
      ]);
      const provincesData = await provincesResponse.json();
      const citiesData = await citiesResponse.json();

      setProvinces(provincesData);
      setCities(citiesData);
    };
    fetchData();
  }, []);

  const handleProvinceChange = (e) => {
    const provinceId = Number(e.target.value);
    setSelectedProvince(provinceId);

    // فیلتر کردن شهرها بر اساس استان انتخابی
    const matchedCities = cities.filter((city) => city.province_id === provinceId);
    setFilteredCities(matchedCities);
    onLocationChange({ province: provinceId, city: selectedCity });
  };
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    onLocationChange({ province: selectedProvince, city: e.target.value });
  };
  return (
    <div className="p-6 max-w-md mx-auto grid md:grid-cols-2 grid-cols-1 ">

      {/* منوی انتخاب استان */}
      <label className="block mb-2 font-medium">استان</label>
      <select
        className="w-full p-2 border rounded-md"
        value={selectedProvince}
        onChange={handleProvinceChange}
      >
        <option value="">یک استان را انتخاب کنید</option>
        {provinces.map((province) => (
          <option key={province.id} value={province.id}>
            {province.name}
          </option>
        ))}
      </select>



      {/* منوی انتخاب شهر */}
    
          <label className="block mt-4 mb-2 font-medium">شهر</label>
          <select className="w-full p-2 border rounded-md"onChange={handleCityChange}>
            <option value="">یک شهر را انتخاب کنید</option>
            {filteredCities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
   
   
    </div>
  );
}