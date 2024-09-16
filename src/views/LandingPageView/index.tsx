"use client"
import React, { useState } from "react";
import { components, Component } from "@/components/editor/config"; // Adjust import path as needed
import Editor from "@/components/editor";

const templates = [
  { id: "template_1", name: "Template 1", imageUrl: "/asset/Template1.png" },
  { id: "template_2", name: "Template 2", imageUrl: "/asset/Template1.png" },
  { id: "template_3", name: "Template 3", imageUrl: "/asset/Template1.png" },
  { id: "template_4", name: "Template 4", imageUrl: "/asset/Template1.png" },
];

const LandingPageView: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Component | null>(null);
  const [viewMode, setViewMode] = useState<'editor' | 'demo'>('editor');

  const handleTemplateClick = (templateId: string, mode: 'editor' | 'demo') => {
    const template = components.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
      setViewMode(mode);
    }
  };

  const handleBackClick = () => {
    setSelectedTemplate(null);
    setViewMode('editor');
  };

  return (
    <div className="container mx-auto p-4">
      {selectedTemplate && (
        <button
          onClick={handleBackClick}
          className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-lg"
        >
          Back
        </button>
      )}
      
      {!selectedTemplate ? (
        <>
          <h1 className="text-2xl font-bold mb-6 text-center">
            Choose a Template
          </h1>
          <div className="flex space-x-6 overflow-x-auto gap-2">
            {templates.map((template) => (
              <div
                key={template.id}
                className="flex flex-col items-center border p-4 rounded-lg cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white w-80"
              >
                <img
                  src={template.imageUrl}
                  alt={template.name}
                  className="w-full h-32 object-cover rounded-md mb-4"
                />
                <h2 className="text-lg font-semibold text-center text-black mb-4">
                  {template.name}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleTemplateClick(template.id, 'demo')}
                    className="w-28 px-2 py-1 bg-blue-500 text-white rounded-lg text-sm text-center"
                  >
                    View Demo
                  </button>
                  <button
                    onClick={() => handleTemplateClick(template.id, 'editor')}
                    className="w-28 px-2 py-1 bg-blue-500 text-white rounded-lg text-sm text-center"
                  >
                    Editor
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : viewMode === 'editor' ? (
        <Editor template={selectedTemplate} />
      ) : (
        <div className="w-full h-screen flex justify-center items-center bg-gray-100">
          <iframe
            srcDoc={selectedTemplate.html}
            title="Demo View"
            className="w-full h-full border-none"
          />
        </div>
      )}
    </div>
  );
};

export default LandingPageView;
