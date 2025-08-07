"use client"

import { useState } from "react"
import { Editor } from "@/components/blocks/editor-00/editor"

const initialValue = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "Welcome to the editor!",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
}

export default function EditorPage() {
  const [editorState, setEditorState] = useState(initialValue)

  return (
    <div className="container max-w-screen-lg mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Editor Page</h1>
      <Editor
        editorSerializedState={editorState}
        onSerializedChange={(value) => setEditorState(value)}
      />
    </div>
  )
}
