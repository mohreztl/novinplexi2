'use client';

import { useState, useEffect } from 'react';

export default function BrandsPage() {
  const [brands, setBrands] = useState([]);
  const [name, setName] = useState('');


  useEffect(() => {
    fetch('/api/brand')
      .then(res => res.json())
      .then(data => setBrands(data.data || []));
  }, []);

  const addBrand = async () => {
    const res = await fetch('/api/brand', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name}),
    });

    if (res.ok) {
      const newBrand = await res.json();
      setBrands(prev => [...prev, newBrand.data]);
      setName('');
    
    }
  };

  return (
    <div>
      <h1>Manage Brands</h1>
      <div>
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* <select onChange={(e) => setParent(e.target.value)} value={parent || ''}>
          <option value="">No Parent</option>
          {brands.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select> */}
        <button onClick={addBrand}>Add Brand</button>
      </div>
      <ul>
        {brands.map((cat) => (
          <li key={cat._id}>
            {cat.name} {cat.parent && ` (Parent: ${cat.parent.name})`}
          </li>
        ))}
      </ul>
    </div>
  );
}