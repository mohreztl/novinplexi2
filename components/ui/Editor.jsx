"use client";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// داینامیک ایمپورت ReactQuill برای جلوگیری از خطاهای SSR
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Editor = ({ value, onChange, placeholder = "متن خود را وارد کنید..." }) => {
  // تنظیمات toolbar برای ادیتور
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ["code-block"],
        ["clean"],
      ],
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      },
    }),
    []
  );

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "background",
    "align",
    "code-block",
  ];

  return (
    <div className="editor-container">
      <ReactQuill
        theme="snow"
        value={value || ""}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        className="bg-white border rounded-lg"
        style={{
          height: "300px",
          marginBottom: "60px",
        }}
      />
      <style jsx global>{`
        .ql-container {
          font-family: inherit;
          font-size: 14px;
        }
        
        .ql-editor {
          min-height: 250px;
          font-family: inherit;
          direction: rtl;
          text-align: right;
        }
        
        .ql-editor.ql-blank::before {
          font-style: normal;
          direction: rtl;
          text-align: right;
        }
        
        .ql-toolbar {
          border-top: 1px solid #ccc;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
          border-bottom: none;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }
        
        .ql-container {
          border-bottom: 1px solid #ccc;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
          border-top: none;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
        }
        
        .ql-snow .ql-tooltip {
          z-index: 1000;
        }

        /* RTL Support */
        .ql-editor[dir="rtl"] {
          text-align: right;
        }
        
        .ql-editor ul, .ql-editor ol {
          padding-right: 1.5em;
          padding-left: 0;
        }
        
        .ql-editor li {
          direction: rtl;
          text-align: right;
        }
        
        .ql-editor blockquote {
          border-right: 4px solid #ccc;
          border-left: none;
          margin-right: 0;
          margin-left: 16px;
          padding-right: 16px;
          padding-left: 0;
        }
      `}</style>
    </div>
  );
};

export default Editor;
