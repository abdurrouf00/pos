"use client";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";

export default function Attachments() {
  const editorRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [linkInput, setLinkInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLinkBox, setShowLinkBox] = useState(false);

  // ---------------- File Upload ----------------
  const handleFileUpload = (e) => {
    const uploaded = Array.from(e.target.files);
    const mapped = uploaded.map((f) => ({
      name: f.name,
      file: f,
      type: "file",
    }));

    setFiles((prev) => [...prev, ...mapped]);
    setShowDropdown(false); // dropdown close after upload
  };

  // ---------------- Add Link ----------------
  const addLink = () => {
    if (!linkInput.trim()) return;

    setFiles((prev) => [
      ...prev,
      { name: linkInput.trim(), type: "link" },
    ]);

    setLinkInput("");
    setShowLinkBox(false);
    setShowDropdown(false);
  };

  // ---------------- Remove Item ----------------
  const removeItem = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
   <div className="p-4 border rounded-md bg-white shadow-md">

      {/* ---------- ATTACH BUTTON & DROPDOWN ---------- */}
      <div className="relative flex justify-between items-center border-b rounded p-2 bg-white">
        <span className="font-medium">Attachments</span>

        <div className="relative">
          <Button
            onClick={() => setShowDropdown(!showDropdown)}            
          >
            Attach
          </Button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-10">
              <label className="block px-4 py-2 cursor-pointer hover:bg-gray-100">
                Upload File
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
              <button
                onClick={() => { setShowLinkBox(!showLinkBox); setShowDropdown(false); }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Add Link (URL)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ---------- LINK INPUT FIELD ---------- */}
      {showLinkBox && (
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
            placeholder="Enter URL"
            className="border p-2 rounded w-full"
          />
          <button
            onClick={addLink}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add
          </button>
        </div>
      )}

    

      {/* --------- FILE & LINK LIST ---------- */}
      <div className="space-y-2">
        {files.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border p-2 rounded-md bg-gray-50"
          >
            {/* Link Click → open new tab */}
            {item.type === "link" ? (
              <a
                href={item.name}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline truncate max-w-[70%]"
              >
                {item.name}
              </a>
            ) : (
              <span className="truncate max-w-[70%]">{item.name}</span>
            )}

            <button
              onClick={() => removeItem(index)}
              className="text-red-600 text-sm hover:underline"
            >
              Remove
            </button>
          </div>
        ))}

        {files.length === 0 && (
          <p className="text-gray-400">No attachments found</p>
        )}
      </div>
    </div>
  );
}
