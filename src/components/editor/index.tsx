"use client"
import { useEffect, useRef, useCallback } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { PenTool, Undo, Redo } from "lucide-react";
//@ts-ignore
import plugin from "grapesjs-tailwind";
import { Component } from "@/components/editor/config"; // Adjust import path as needed

interface EditorProps {
  template: Component;
}

const Editor: React.FC<EditorProps> = ({ template }) => {
  const editorRef = useRef<any>(null);

  useEffect(() => {
    editorRef.current = grapesjs.init({
      container: "#gjs",
      fromElement: true,
      width: "100%",
      height: "100%",
      plugins: [plugin],
      pluginsOpts: {
        [plugin]: {},
      },
      storageManager: false,
      styleManager: {
        sectors: [
          {
            name: 'Typography',
            open: false,
            buildProps: ['font-size', 'color', 'text-align', 'font-family', 'line-height', 'letter-spacing'],
            properties: [
              { name: 'Font Size', property: 'font-size' },
              { name: 'Text Color', property: 'color' },
              { name: 'Text Align', property: 'text-align' },
              { name: 'Font Family', property: 'font-family' },
              { name: 'Line Height', property: 'line-height' },
              { name: 'Letter Spacing', property: 'letter-spacing' },
            ]
          },
          {
            name: 'Decorations',
            open: false,
            buildProps: ['background-color', 'border', 'border-radius', 'box-shadow'],
            properties: [
              { name: 'Background Color', property: 'background-color' },
              { name: 'Border', property: 'border' },
              { name: 'Border Radius', property: 'border-radius' },
              { name: 'Box Shadow', property: 'box-shadow' },
            ]
          }
        ]
      },
    });

    const editor = editorRef.current;

    // Load the selected template into the editor
    if (template && editor) {
      editor.setComponents(template.html);
    }
  }, [template]);

  const exportHtml = useCallback(() => {
    if (editorRef.current) {
      const templateHtml = editorRef.current.getHtml();
      const templateCss = editorRef.current.getCss();

      const html = `
        <html>
          <head>
            <style>${templateCss}</style>
          </head>
          <body>${templateHtml}</body>
        </html>
      `;

      const blob = new Blob([html], { type: "text/html" });
      const link = document.createElement("a");

      link.href = URL.createObjectURL(blob);
      link.download = "custom-template.html";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, []);

  const handleUndo = () => {
    if (editorRef.current) {
      editorRef.current.runCommand("core:undo");
    }
  };

  const handleRedo = () => {
    if (editorRef.current) {
      editorRef.current.runCommand("core:redo");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-900 text-white">
      <div className="w-full p-2 bg-gray-950 flex gap-4 justify-between">
        <div className="flex items-center gap-2">
          <PenTool size={30} color="white" />
          <div className="text-xl font-bold">Website Builder</div>
        </div>

        <div className="flex gap-2">
          <button
            // onClick={() => applyTemplate(template.id)}
            className="px-2 py-2 text-sm rounded-md bg-gray-800 text-white"
          >
            {template.name}
          </button>
        </div>

        <div className="flex gap-4 items-center">
          <Undo className="w-5 h-5 text-white" onClick={handleUndo} />
          <Redo className="w-5 h-5 text-white" onClick={handleRedo} />
          <button
            onClick={exportHtml}
            className="px-3 py-2 bg-blue-700 rounded-md"
          >
            Export
          </button>
        </div>
      </div>

      <div className="flex-grow grid grid-cols-12">
        <div id="blocks" className="col-span-12 p-4 border-r bg-gray-800 contain">
        <div id="gjs" className="col-span-9 h-full bg-gray-900">
          {/* GrapesJS editor */}
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default Editor;
