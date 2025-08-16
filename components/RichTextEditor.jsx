'use client'

import { useRef, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import ImagesList from '@/components/ImagesList'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false,
  loading: () => <div className="h-32 bg-gray-50 animate-pulse rounded-md" />
})

// Import Quill styles
import 'react-quill/dist/quill.snow.css'

const RichTextEditor = ({ value, content, onChange, placeholder = "متن خود را وارد کنید..." }) => {
  const quillRef = useRef(null)
  const [showImageDialog, setShowImageDialog] = useState(false)

  // Support both `value` and legacy `content` prop names. Prefer explicit `value`.
  const editorValue = typeof value !== 'undefined' ? value : content;

  // Custom image handler
  const imageHandler = useCallback(() => {
    setShowImageDialog(true)
  }, [])

  const handleImageSelect = useCallback((selectedImages) => {
    if (selectedImages && selectedImages.length > 0 && quillRef.current) {
      const quill = quillRef.current.getEditor()
      const range = quill.getSelection(true)
      quill.insertEmbed(range.index, 'image', selectedImages[0])
      quill.setSelection(range.index + 1)
      setShowImageDialog(false)
    }
  }, [])

  // Custom toolbar configuration
  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['blockquote', 'code-block'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    },
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  }

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'list', 'bullet', 'indent',
    'direction', 'align',
    'link', 'image', 'video',
    'blockquote', 'code-block'
  ]

  return (
    <div className="rich-text-editor">
      <style jsx global>{`
        .ql-editor {
          min-height: 200px;
          font-family: 'Yekan Bakh', sans-serif;
          direction: rtl;
          text-align: right;
        }
        
        .ql-toolbar {
          border-top: 1px solid #ccc;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
          border-bottom: none;
          border-radius: 8px 8px 0 0;
        }
        
        .ql-container {
          border-bottom: 1px solid #ccc;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
          border-top: none;
          border-radius: 0 0 8px 8px;
        }
        
        .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: normal;
          content: attr(data-placeholder);
        }
        
        .ql-toolbar .ql-formats {
          margin-right: 15px;
        }
        
        .ql-toolbar .ql-picker {
          color: #374151;
        }
        
        .ql-toolbar .ql-stroke {
          stroke: #374151;
        }
        
        .ql-toolbar .ql-fill {
          fill: #374151;
        }
        
        .ql-toolbar button:hover .ql-stroke {
          stroke: #111827;
        }
        
        .ql-toolbar button:hover .ql-fill {
          fill: #111827;
        }
        
        .ql-toolbar button.ql-active .ql-stroke {
          stroke: #2563eb;
        }
        
        .ql-toolbar button.ql-active .ql-fill {
          fill: #2563eb;
        }
      `}</style>
      
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={editorValue}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{
          backgroundColor: 'white',
        }}
      />

      {/* Image Dialog */}
      {showImageDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden m-4">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">انتخاب تصویر</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowImageDialog(false)}
                className="p-2"
              >
                ✕
              </Button>
            </div>
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <ImagesList onImageSelect={handleImageSelect} maxSelection={1} />
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

export default RichTextEditor
