"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  List, 
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
  Palette
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ImagesList from "@/components/ImagesList";

const RichTextEditor = ({ value, onChange, placeholder = "محتوای مقاله خود را بنویسید..." }) => {
  const editorRef = useRef(null);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertImage = () => {
    setShowImageDialog(true);
  };

  const handleImageSelect = (selectedImages) => {
    if (selectedImages && selectedImages.length > 0) {
      const imageUrl = selectedImages[0];
      execCommand('insertImage', imageUrl);
      setShowImageDialog(false);
    }
  };

  const insertLink = () => {
    setShowLinkDialog(true);
  };

  const confirmLink = () => {
    if (linkUrl) {
      const selection = window.getSelection();
      const text = linkText || selection.toString() || linkUrl;
      
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        
        const link = document.createElement('a');
        link.href = linkUrl;
        link.textContent = text;
        link.target = '_blank';
        link.className = 'text-blue-600 hover:text-blue-800 underline';
        
        range.insertNode(link);
        selection.removeAllRanges();
      }
      
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
    }
    
    setShowLinkDialog(false);
    setLinkUrl('');
    setLinkText('');
  };

  const formatBlock = (tag) => {
    execCommand('formatBlock', tag);
  };

  const toolbarButtons = [
    {
      icon: <Bold className="w-4 h-4" />,
      command: 'bold',
      title: 'درشت (Ctrl+B)'
    },
    {
      icon: <Italic className="w-4 h-4" />,
      command: 'italic',
      title: 'کج (Ctrl+I)'
    },
    {
      icon: <Underline className="w-4 h-4" />,
      command: 'underline',
      title: 'زیرخط (Ctrl+U)'
    },
    { divider: true },
    {
      icon: <Heading1 className="w-4 h-4" />,
      action: () => formatBlock('h1'),
      title: 'عنوان 1'
    },
    {
      icon: <Heading2 className="w-4 h-4" />,
      action: () => formatBlock('h2'),
      title: 'عنوان 2'
    },
    {
      icon: <Heading3 className="w-4 h-4" />,
      action: () => formatBlock('h3'),
      title: 'عنوان 3'
    },
    { divider: true },
    {
      icon: <AlignLeft className="w-4 h-4" />,
      command: 'justifyLeft',
      title: 'چپ‌چین'
    },
    {
      icon: <AlignCenter className="w-4 h-4" />,
      command: 'justifyCenter',
      title: 'وسط‌چین'
    },
    {
      icon: <AlignRight className="w-4 h-4" />,
      command: 'justifyRight',
      title: 'راست‌چین'
    },
    { divider: true },
    {
      icon: <List className="w-4 h-4" />,
      command: 'insertUnorderedList',
      title: 'فهرست نقطه‌ای'
    },
    {
      icon: <ListOrdered className="w-4 h-4" />,
      command: 'insertOrderedList',
      title: 'فهرست شماره‌دار'
    },
    { divider: true },
    {
      icon: <LinkIcon className="w-4 h-4" />,
      action: insertLink,
      title: 'درج لینک'
    },
    {
      icon: <ImageIcon className="w-4 h-4" />,
      action: insertImage,
      title: 'درج تصویر'
    },
    {
      icon: <Quote className="w-4 h-4" />,
      action: () => formatBlock('blockquote'),
      title: 'نقل قول'
    },
    {
      icon: <Code className="w-4 h-4" />,
      command: 'insertHTML',
      value: '<code></code>',
      title: 'کد'
    },
    { divider: true },
    {
      icon: <Undo className="w-4 h-4" />,
      command: 'undo',
      title: 'بازگردانی (Ctrl+Z)'
    },
    {
      icon: <Redo className="w-4 h-4" />,
      command: 'redo',
      title: 'تکرار (Ctrl+Y)'
    }
  ];

  const colorPalette = [
    '#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#efefef', '#f3f3f3', '#ffffff',
    '#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#4a86e8', '#0000ff', '#9900ff', '#ff00ff',
    '#e6b8af', '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#c9daf8', '#cfe2f3', '#d9d2e9', '#ead1dc'
  ];

  return (
    <Card className="w-full border border-gray-200 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="border-b border-gray-200 bg-gray-50 p-3">
        <div className="flex flex-wrap items-center gap-1">
          {toolbarButtons.map((button, index) => {
            if (button.divider) {
              return <div key={index} className="w-px h-6 bg-gray-300 mx-1" />;
            }
            
            return (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-gray-200"
                onClick={() => {
                  if (button.action) {
                    button.action();
                  } else if (button.command) {
                    execCommand(button.command, button.value);
                  }
                }}
                title={button.title}
              >
                {button.icon}
              </Button>
            );
          })}
          
          {/* Color Picker */}
          <div className="relative group">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-gray-200"
              title="رنگ متن"
            >
              <Palette className="w-4 h-4" />
            </Button>
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg p-2 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <div className="grid grid-cols-10 gap-1">
                {colorPalette.map((color) => (
                  <button
                    key={color}
                    className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    onClick={() => execCommand('foreColor', color)}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[400px] max-h-[600px] overflow-y-auto p-4 focus:outline-none prose prose-lg max-w-none"
        style={{ direction: 'rtl' }}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
      />

      {/* Link Dialog */}
      {showLinkDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-96 p-6">
            <h3 className="text-lg font-semibold mb-4">درج لینک</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">آدرس لینک</label>
                <Input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">متن لینک (اختیاری)</label>
                <Input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="متن نمایشی لینک"
                  className="w-full"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowLinkDialog(false)}
                >
                  لغو
                </Button>
                <Button onClick={confirmLink}>
                  درج لینک
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

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
              <ImagesList 
                images={[]}
                onImagesChange={handleImageSelect} 
                maxImages={1}
                inline={true}
              />
            </div>
          </Card>
        </div>
      )}

      <style jsx>{`
        [contenteditable="true"]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        
        .prose h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.5em 0;
          color: #1f2937;
        }
        
        .prose h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.5em 0;
          color: #374151;
        }
        
        .prose h3 {
          font-size: 1.25em;
          font-weight: bold;
          margin: 0.5em 0;
          color: #4b5563;
        }
        
        .prose p {
          margin: 0.5em 0;
          line-height: 1.6;
        }
        
        .prose blockquote {
          border-right: 4px solid #e5e7eb;
          padding-right: 1em;
          margin: 1em 0;
          font-style: italic;
          color: #6b7280;
        }
        
        .prose ul, .prose ol {
          margin: 0.5em 0;
          padding-right: 1.5em;
        }
        
        .prose li {
          margin: 0.25em 0;
        }
        
        .prose code {
          background-color: #f3f4f6;
          padding: 0.125em 0.25em;
          border-radius: 0.25em;
          font-family: 'Courier New', monospace;
        }
        
        .prose img {
          max-width: 100%;
          height: auto;
          margin: 1em 0;
          border-radius: 0.5em;
        }
      `}</style>
    </Card>
  );
};

export default RichTextEditor;
