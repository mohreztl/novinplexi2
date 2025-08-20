 'use client'

import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  Image as ImageIcon,
  X,
  Loader2,
  Search,
  Grid,
  List
} from "lucide-react"
import { Input } from "@/components/ui/input"

export default function ImagesList({
  onImageSelect,
  onImagesChange,
  images = [],
  maxSelection = 1,
  maxImages = 1,
  inline = false,
  disablePortal = false,
}) {
  const max = maxImages || maxSelection || 1
  const [error, setError] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedImages, setUploadedImages] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState(Array.isArray(images) ? images : (images ? [images] : []))
  const [objects, setObjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState('grid')
  const instanceId = useRef(`imageslist_${Math.random().toString(36).slice(2)}`)
  const effectiveInline = !!(inline || disablePortal)

  useEffect(() => {
    if (Array.isArray(images)) setSelectedFile(images)
  }, [images])

  useEffect(() => {
    const onOpen = (e) => {
      const other = e?.detail?.id
      if (other && other !== instanceId.current) setIsModalOpen(false)
    }
    window.addEventListener('imageslist:open', onOpen)
    return () => window.removeEventListener('imageslist:open', onOpen)
  }, [])

  useEffect(() => {
    let mounted = true
    const fetchObjects = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/file')
        const data = await res.json()
        if (mounted) setObjects(data)
      } catch (err) {
        console.error(err)
        setError('خطا در بارگذاری تصاویر')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchObjects()
    return () => { mounted = false }
  }, [])

  const filteredObjects = objects.filter(f => (f?.Key || '').toLowerCase().includes(searchTerm.toLowerCase()))
  const filteredUploadedImages = uploadedImages.filter(u => (u || '').toLowerCase().includes(searchTerm.toLowerCase()))

  const toggleSelection = (url) => {
    const cb = onImagesChange || onImageSelect
    if (max === 1) {
      setSelectedFile([url])
      if (cb) cb([url])
      setIsModalOpen(false)
      return
    }
    const next = selectedFile.includes(url) ? selectedFile.filter(u => u !== url) : [...selectedFile, url].slice(0, max)
    setSelectedFile(next)
    if (cb) cb(next)
  }

  const onDrop = async (accepted) => {
    if (!accepted || accepted.length === 0) return
    setIsUploading(true)
    try {
      const promises = accepted.map(async (file) => {
        const fd = new FormData()
        fd.append('file', file)
        const res = await fetch('/api/upload', { method: 'POST', body: fd })
        const data = await res.json()
        if (!data || !data.url) throw new Error(data?.error || 'upload failed')
        return data.url
      })
      const urls = await Promise.all(promises)
      setUploadedImages(prev => [...prev, ...urls])
    } catch (err) {
      console.error(err)
      setError('خطا در آپلود تصویر')
    } finally {
      setIsUploading(false)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'] }, multiple: true })

  const openModal = () => {
    try { window.dispatchEvent(new CustomEvent('imageslist:open', { detail: { id: instanceId.current } })) } catch {}
    setIsModalOpen(true)
  }
  const closeModal = () => { setIsModalOpen(false); setSearchTerm('') }
  const clearSelection = () => { setSelectedFile([]); const cb = onImagesChange || onImageSelect; if (cb) cb([]) }
  const confirmSelection = () => { const cb = onImagesChange || onImageSelect; if (cb) cb(selectedFile); closeModal() }

  const modalContent = (
    <div className="bg-white w-full h-full md:rounded-2xl md:shadow-2xl md:w-full md:max-w-6xl overflow-hidden flex flex-col">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ImageIcon className="w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold">مدیریت تصاویر</h3>
              <p className="text-xs text-indigo-100">{selectedFile.length > 0 ? `${selectedFile.length} تصویر انتخاب شده` : 'تصاویر خود را مدیریت کنید'}</p>
            </div>
          </div>
          <button onClick={closeModal} className="p-2 rounded-full hover:bg-white hover:bg-opacity-20">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <Card className="mb-4">
          <CardContent>
            <div {...getRootProps()} className={`text-center py-6 px-4 rounded-lg transition cursor-pointer ${isDragActive ? 'bg-indigo-50 border-indigo-300' : 'bg-gray-50 hover:bg-gray-100'}`}>
              <input {...getInputProps()} />
              <Upload className="w-10 h-10 mx-auto mb-2 text-gray-400" />
              <div className="text-sm font-medium">آپلود تصاویر جدید</div>
              <div className="text-xs text-gray-500">فرمت‌های مجاز: JPG, PNG, GIF, WebP</div>
            </div>

            {isUploading && (
              <div className="mt-3">
                <div className="flex items-center gap-2 text-sm text-gray-600"><Loader2 className="w-4 h-4 animate-spin"/> در حال آپلود...</div>
              </div>
            )}
            {error && (
              <div className="text-red-600 text-sm mt-3">{error}</div>
            )}
          </CardContent>
        </Card>

        <div className="flex gap-2 mb-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} className="pl-10" placeholder="جستجو در تصاویر..." />
          </div>
          <div className="flex items-center gap-2">
            <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="sm" onClick={()=>setViewMode('grid')}><Grid className="w-4 h-4"/></Button>
            <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="sm" onClick={()=>setViewMode('list')}><List className="w-4 h-4"/></Button>
          </div>
        </div>

        {filteredUploadedImages.length > 0 && (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Upload className="w-4 h-4 text-green-600"/> تصاویر جدید <Badge variant="secondary">{filteredUploadedImages.length}</Badge></CardTitle>
            </CardHeader>
            <CardContent>
              <div className={viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3' : 'space-y-2'}>
                {filteredUploadedImages.map((u,i)=>(
                  <div key={i} className={`cursor-pointer rounded overflow-hidden ${selectedFile.includes(u)?'ring-4 ring-green-400':'hover:scale-105'}`} onClick={()=>toggleSelection(u)}>
                    <div className="aspect-square relative bg-gray-100">
                      <Image src={u} alt={`uploaded-${i}`} fill className="object-cover" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ImageIcon className="w-4 h-4 text-blue-600"/> تصاویر موجود <Badge variant="secondary">{filteredObjects.length}</Badge></CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-8 text-center"><Loader2 className="w-6 h-6 animate-spin text-indigo-600"/></div>
            ) : filteredObjects.length === 0 ? (
              <div className="py-8 text-center text-sm text-gray-500">تصویری یافت نشد</div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3' : 'space-y-2'}>
                {filteredObjects.map((f)=>(
                  <div key={f.Key} className={`cursor-pointer rounded overflow-hidden ${selectedFile.includes(f.url)?'ring-4 ring-blue-400':'hover:scale-105'}`} onClick={()=>toggleSelection(f.url)}>
                    <div className="aspect-square relative bg-gray-100">
                      <Image src={f.url} alt={f.Key} fill className="object-cover" />
                    </div>
                    <div className="text-xs text-gray-600 mt-1 truncate">{f.Key}</div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="p-3 bg-gray-50 flex items-center justify-between gap-3 flex-shrink-0">
        <div className="text-sm text-gray-600">{selectedFile.length>0?`${selectedFile.length} تصویر انتخاب شده`:'هیچ تصویری انتخاب نشده'}</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={closeModal}>انصراف</Button>
          <Button onClick={confirmSelection} disabled={selectedFile.length===0} className="bg-gradient-to-r from-indigo-600 to-purple-600">انتخاب ({selectedFile.length})</Button>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <div className="space-y-3">
        {selectedFile.length>0 && (
          <div className="p-3 bg-green-50 border border-green-200 rounded">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-green-800">تصاویر انتخاب شده ({selectedFile.length})</div>
              <Button variant="ghost" size="sm" onClick={clearSelection}><X className="w-4 h-4"/></Button>
            </div>
            <div className="flex gap-2">
              {selectedFile.slice(0,4).map((u,i)=>(
                <div key={i} className="w-12 h-12 relative rounded overflow-hidden">
                  <Image src={u} alt={`sel-${i}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        <Button onClick={openModal} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <ImageIcon className="w-4 h-4" /> انتخاب تصاویر {max>1?`(حداکثر ${max})`:''}
        </Button>

        {isModalOpen && (effectiveInline ? (
          <div className="mt-3">{modalContent}</div>
        ) : (typeof document !== 'undefined' ? createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
            <div className="w-full h-full md:w-auto md:h-auto md:max-w-6xl md:max-h-[90vh] md:m-4">
              <div className="w-full h-full md:rounded-2xl overflow-hidden">
                {modalContent}
              </div>
            </div>
          </div>, document.body
        ) : null))}
      </div>
    </div>
  )
}

