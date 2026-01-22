"use client";
import Link from "next/link";
import { useState } from "react";

export default function DocumentManager() {
  const [folders, setFolders] = useState([{ name: "Files", files: [] }]);
  const [activeFolder, setActiveFolder] = useState("All Documents");
  const [selectedFiles, setSelectedFiles] = useState([]); //  selected file ids

  // Count all files length
  const totalFilesCount = folders.reduce((count, folder) => count + folder.files.length, 0);

  // create new folder
  const createFolder = () => {
    const name = prompt("Enter new folder name:");
    if (name && !folders.find((f) => f.name === name)) {
      setFolders([...folders, { name, files: [] }]);
    }
  };

  // upload file
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newFile = {
      id: Date.now(),
      name: file.name,
      uploadedBy: "Admin",
      uploadedOn: new Date().toLocaleString(),
    };

    if (activeFolder === "All Documents") {
      alert("Please select a folder before uploading.");
      return;
    }

    setFolders((prev) =>
      prev.map((f) =>
        f.name === activeFolder ? { ...f, files: [...f.files, newFile] } : f
      )
    );
  };

  // Active folder files
  const getActiveFiles = () => {
    if (activeFolder === "All Documents") {
      return folders.flatMap((f) =>
        f.files.map((file) => ({ ...file, folder: f.name }))
      );
    }
    return folders
      .find((f) => f.name === activeFolder)
      ?.files.map((file) => ({ ...file, folder: activeFolder })) || [];
  };

  const activeFiles = getActiveFiles();

  //  Folder Delete
  const deleteFolder = (folderName) => {
    if (confirm(`Delete folder "${folderName}"? All files inside will be removed.`)) {
      setFolders(folders.filter((f) => f.name !== folderName));
      if (activeFolder === folderName) setActiveFolder("All Documents");
    }
  };

  //  File Select Toggle
  const toggleFileSelect = (id) => {
    setSelectedFiles((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  //  Delete Selected Files
  const deleteSelectedFiles = () => {
    if (selectedFiles.length === 0) {
      alert("No files selected.");
      return;
    }

    if (!confirm(`Delete ${selectedFiles.length} selected file(s)?`)) return;

    setFolders((prev) =>
      prev.map((folder) => ({
        ...folder,
        files: folder.files.filter((file) => !selectedFiles.includes(file.id)),
      }))
    );

    setSelectedFiles([]);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 h-screen p-4">
        <h2 className="text-lg font-semibold mb-4">Documents</h2>

        <div className="mb-4">
          
          <ul className="space-y-1 mt-1">
            <li
              className={`cursor-pointer  py-1 rounded flex justify-between ${
                activeFolder === "All Documents"
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setActiveFolder("All Documents")}
            >
              <span> All Documents</span>
              <span className="text-xs bg-gray-300 text-gray-700 px-2 pt-1 rounded-4xl">
                {totalFilesCount}
              </span>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-gray-600 text-xs font-medium">INBOXES</p>
          <ul className="space-y-1 mt-1">
            {folders.map((folder) => (
              <li
                key={folder.name}
                className={`cursor-pointer  py-1 rounded flex justify-between items-center  ${
                  activeFolder === folder.name
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "hover:bg-gray-200"
                }`}
              >
                <span className="w-full " onClick={() => setActiveFolder(folder.name)}>{folder.name} </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-700 px-2 py-1 bg-gray-300 rounded-4xl">
                    {folder.files.length}
                  </span>
                  <button
                    onClick={() => deleteFolder(folder.name)}
                    className="text-red-500 hover:text-red-700 px-2"
                    title="Delete Folder"
                  >
                    ⋮
                  </button>
                </div>
              </li>
            ))}
            <Link href="/dashboard/documents/new-document">
              <li>Bank Statements</li>
            </Link>
            
          </ul>
           

          {/* Folder Create Button */}
          <div className="flex justify-between mt-5 hover:bg-gray-200 rounded">
            <p className="text-sm text-gray-500 p-1">FOLDERS</p>
            <button onClick={createFolder} className="text-2xl mr-2 px-5">
              +
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">
            {activeFolder}
            {activeFolder === "All Documents" && (
              <span className="ml-2 text-gray-500 text-base">
               
              </span>
            )}
          </h1>

          <div className="flex gap-3">
            {selectedFiles.length > 0 && (
              <button
                onClick={deleteSelectedFiles}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete  ({selectedFiles.length})
              </button>
            )}

            {activeFolder !== "All Documents" && (
              <label className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
                Upload File
                <input type="file" className="hidden" onChange={handleFileUpload} />
              </label>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      setSelectedFiles(
                        e.target.checked ? activeFiles.map((f) => f.id) : []
                      )
                    }
                    checked={
                      selectedFiles.length > 0 &&
                      selectedFiles.length === activeFiles.length
                    }
                  />
                </th>
                
                <th className="p-3 text-left text-sm font-semibold text-gray-600">
                  File Name
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">
                  Uploaded By
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">
                  Uploaded On
                </th>
                {activeFolder === "All Documents" && (
                  <th className="p-3 text-left text-sm font-semibold text-gray-600">
                    Folder
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {activeFiles.length > 0 ? (
                activeFiles.map((file) => (
                  <tr key={file.id} className="border-t hover:bg-gray-50">
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={selectedFiles.includes(file.id)}
                        onChange={() => toggleFileSelect(file.id)}
                      />
                    </td>
                  
                    <td className="p-3 text-sm">{file.name}</td>
                    <td className="p-3 text-sm">{file.uploadedBy}</td>
                    <td className="p-3 text-sm">{file.uploadedOn}</td>
                      {activeFolder === "All Documents" && (
                      <td className="p-3 text-sm font-medium text-gray-700 ">
                        {file.folder}
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={activeFolder === "All Documents" ? 5 : 4}
                    className="p-4 text-center text-gray-500"
                  >
                    No files available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
