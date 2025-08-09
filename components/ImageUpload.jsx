import React, { useState } from 'react';

const ImageUpload = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // پیش‌نمایش تصویر
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert("لطفاً یک تصویر انتخاب کنید.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        // ارسال مسیر تصویر به والد
        onImageUpload(data.url);
      } else {
        alert(`خطا در آپلود تصویر: ${data.error}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert("خطا در آپلود تصویر: " + error.message);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="image" className="block text-sm font-semibold">انتخاب تصویر</label>
      <input
        type="file"
        id="image"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full p-2 mt-2"
      />
      {imagePreview && (
        <div className="mt-4 text-center">
          <img src={imagePreview} alt="Preview" className="w-40 h-40 object-cover" />
        </div>
      )}
      <button
        onClick={handleUpload}
        className="mt-2 w-full py-2 bg-primary/90 text-white rounded hover:bg-primary"
      >
        ارسال تصویر
      </button>
    </div>
  );
};

export default ImageUpload;