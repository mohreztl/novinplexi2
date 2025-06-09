import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Modal from 'react-modal';
import { useDropzone } from 'react-dropzone';
import { Button } from "@/components/ui/button";

const ImagesList = ({ onImageSelect }) => {

  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState([]);

      const [objects, setObjects] = useState([]);
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        const fetchObjects = async () => {
          try {
            const response = await fetch("/api/file");
            const data = await response.json();
            setObjects(data);
          } catch (err) {
            console.error("Error fetching objects:", err);
          } finally {
            setLoading(false);
          }
        };
   
        fetchObjects();
      }, []);
    
      // if (loading) return <p>Loading...</p>;
      const toggleSelection = (image) => {
        setSelectedFile((prev) =>
          prev.includes(image)
            ? prev.filter((img) => img !== image)
            : [...prev, image]
        );
      };
      const onDrop = async (acceptedFiles) => {
        const formData = new FormData();
        acceptedFiles.forEach((file) => {
          formData.append("files", file);
        });
    
    
        try {
          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
        
      setIsUploading(true)
      const data = await response.json();
           
            setUploadedImages((prev) => [...prev,...data.urls]);
            setIsUploading(false);
         
            // ارسال مسیر تصویر به والد
            alert("موفقیت در آپلود تصویر.");
         

          alert('File uploaded successfully!');
       
        } catch (error) {
          setIsUploading(false);
          console.error('Error uploading file:', error);
        }
      };
      const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        
      });
        // باز کردن مدال
  const openModal = () => setIsModalOpen(true);

  // بستن مدال
  const closeModal = () => setIsModalOpen(false);
  //انتخاب فایل
  const handleFileSelect = () => {

    onImageSelect(selectedFile);
    closeModal();
  };
  return (
    <div>
      
    <Button type="button" className="bg-blues hover:opacity-70 text-white" onClick={openModal}>آپلود عکس محصول</Button>
    
    <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="S3 File Management "      className="relative bg-white rounded-lg shadow-lg max-w-full w-full max-h-[90vh] p-6 overflow-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

    <button
    class="absolute top-2 left-2 text-red-500 hover:text-red-800 hover:bg-gray-300 rounded-full p-2"
    aria-label="Close"
    onClick={closeModal}
  >
    ✕
  </button>
      <h2>عکس های موجود</h2>

      {/* آپلود فایل */}
      <div {...getRootProps()} style={{ border: '1px dashed #ccc', padding: '10px', marginBottom: '20px' }}>
        <input {...getInputProps()} />
        <p>فایل مورد نظر را انتخاب کنید</p>
      </div>
      <div>
        <h3>آپلود عکس</h3>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {uploadedImages.map((file, index) => (
            <div
              key={index}
       
        
            >
           <Image
                src={file}
               
                height={200}
               width={200}
               
               style={{
                border: selectedFile.includes(file) ? "2px solid green" : "2px solid transparent",
                cursor: "pointer",
              }}
                className=' cursor-pointer '
         
                onClick={() => toggleSelection(file)}
              />
            </div>
          ))}
        </div>
        </div>
      {isUploading && <p>Uploading...</p>}

      {/* لیست فایل‌ها */}
      <h3>Uploaded Files</h3>
      <ul >
        <div className='grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2'>
        {objects.map((file) =>{return (
          <li key={file.Key} className='flex flex-col justify-between w-[300px] h-[300px]'>
             <Image
                src={file.url}
          alt={file.key||"photos"}
                height={250}
               width={250}
               style={{
                border: selectedFile.includes(file.url) ? "2px solid green" : "2px solid transparent",
                cursor: "pointer",
              }}
                className=' cursor-pointer '
         
                onClick={() => toggleSelection(file.url)}
              />
            <span className=' overflow-x-hidden w-full'>{file.Key}</span>
            {/* <button >Delete</button> */}
          </li>
        )})}
        </div>
      </ul>
      
      <div className="fixed bottom-8 left-0 w-full bg-gray-100 border-t border-gray-300 p-4 flex justify-between px-12 ">
      <Button className="bg-red-600 hover:bg-opacity-70 w-[120px] font-bold text-md text-white" onClick={closeModal}>بستن</Button>
      <Button className="bg-blues hover:bg-opacity-70 font-bold text-md text-white" onClick={handleFileSelect}>
انتخاب عکس محصول
      </Button>
      </div>
   
    </Modal>
    
  </div>
  );
};

export default  ImagesList;
