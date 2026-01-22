// "use client";

// import { useState } from "react";
// import ProductData from "@/tableData.json";
// import { Button } from "@/components/ui/button";

// export default function ProductSelector() {
//   const [open, setOpen] = useState(false);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [tempSelected, setTempSelected] = useState([]); // popup checkbox
//   const [selected, setSelected] = useState([]); // selected rows for delete

//   // Popup checkbox toggle
//   const toggleCheckbox = (product) => {
//     setTempSelected((prev) =>
//       prev.some((p) => p.id === product.id)
//         ? prev.filter((p) => p.id !== product.id)
//         : [...prev, product]
//     );
//   };

//   // Add popup selected products into main table
//   const addSelectedProducts = () => {
//     setSelectedProducts((prev) => [...prev, ...tempSelected]);
//     setTempSelected([]);
//     setOpen(false);
//   };

//   // Selected table checkbox toggle
//   const handleCheckbox = (index) => {
//     setSelected((prev) =>
//       prev.includes(index)
//         ? prev.filter((i) => i !== index)
//         : [...prev, index]
//     );
//   };

//   // Delete selected rows
//   const deleteSelectedRows = () => {
//     setSelectedProducts((prev) =>
//       prev.filter((_, index) => !selected.includes(index))
//     );
//     setSelected([]);
//   };

//   return (
//     <div className="p-4 border rounded-md bg-white shadow-md">

//       {/* HEADER */}
//       <div className="flex mb-2 items-center justify-between ">
//         <h2 className="text-xl font-bold">Products</h2>

//         <Button
         
//           onClick={() => setOpen(true)}
//         >
//           Add Product
//         </Button>
//       </div>

//       {/* DELETE BUTTON (only when rows selected) */}
//       {selected.length > 0 && (
//         <button
//           className="mb-2 bg-red-600 text-white px-3 py-1 rounded"
//           onClick={deleteSelectedRows}
//         >
//           Delete Selected
//         </button>
//       )}

//       {/* MAIN TABLE */}
//       {selectedProducts.length === 0 ? (
//         <div className="border-t text-center text-gray-600  p-2">
//           No products selected
//         </div>
//       ) : (
//         <table className="w-full border mt-3">
//           <thead>
//             <tr>
//               <th className="p-2 border text-center">✓</th>
//               <th className="border px-4 py-2">Product Name</th>
//               <th className="border px-4 py-2">Company</th>
//               <th className="border px-4 py-2">Phone</th>
//               <th className="border px-4 py-2">Email</th>
//               <th className="border px-4 py-2">Owner</th>
//             </tr>
//           </thead>

//           <tbody>
//             {selectedProducts.map((p, index) => (
//               <tr key={index}>
//                 <td className="p-2 border text-center">
//                   <input
//                     type="checkbox"
//                     checked={selected.includes(index)}
//                     onChange={() => handleCheckbox(index)}
//                   />
//                 </td>

//                 <td className="border px-4 py-2">{p.name}</td>
//                 <td className="border px-4 py-2">{p.company}</td>
//                 <td className="border px-4 py-2">{p.phone}</td>
//                 <td className="border px-4 py-2">{p.email}</td>
//                 <td className="border px-4 py-2">{p.owner}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* POPUP / MODAL */}
//       {open && (
//         <div className="fixed  items-center top-0 bg-black/0 flex  justify-center z-50">
//           <div className="bg-white w-4xl rounded-xl shadow-lg p-5 max-h-[80vh] overflow-y-auto">
//             <h2 className="text-xl font-semibold mb-4">Select Products</h2>

//             <table className="w-full border">
//               <thead>
//                 <tr>
//                   <th className="border px-4 py-2"></th>
//                   <th className="border px-4 py-2">Product Name</th>
//                    <th className="border px-4 py-2">Company</th>
//               <th className="border px-4 py-2">Phone</th>
//               <th className="border px-4 py-2">Email</th>
//                   <th className="border px-4 py-2">Owner</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {ProductData.map((product, i) => (
//                   <tr key={i}>
//                     <td className="border px-4 py-2 text-center">
//                       <input
//                         type="checkbox"
//                         checked={tempSelected.some((p) => p.id === product.id)}
//                         onChange={() => toggleCheckbox(product)}
//                       />
//                     </td>
//                     <td className="border px-4 py-2">{product.name}</td>
//                      <td className="border px-4 py-2">{product.company}</td>
//                 <td className="border px-4 py-2">{product.phone}</td>
//                 <td className="border px-4 py-2">{product.email}</td>
//                     <td className="border px-4 py-2">{product.owner}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             <div className="flex justify-end gap-3 mt-4">
//               <Button
//                 className="bg-gray-400 "
//                 onClick={() => {
//                   setTempSelected([]);
//                   setOpen(false);
//                 }}
//               >
//                 Cancel
//               </Button>

//               <Button
               
//                 onClick={addSelectedProducts}
//               >
//                 Add 
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// 'use client'
// import { useState } from "react";
// import { Button } from "@/components/ui/button";

// export default function FileUpload() {
//   const [activeTab, setActiveTab] = useState("upload");
//   const [files, setFiles] = useState([]);
//   const [link, setLink] = useState("");

//   // Local file upload
//   const handleFileUpload = (e) => {
//     const uploadedFiles = Array.from(e.target.files);
//     setFiles([...files, ...uploadedFiles.map(f => ({ type: "file", name: f.name }))]);
//   };

//   // Link Upload
//   const handleAddLink = () => {
//     if (!link.trim()) return;
//     setFiles([...files, { type: "link", name: link }]);
//     setLink("");
//   };

//   // Remove Attachment
//   const removeItem = (index) => {
//     const updated = [...files];
//     updated.splice(index, 1);
//     setFiles(updated);
//   };

//   return (
//     <div className="border rounded-xl bg-white">
//       <div className="flex items-center justify-between p-4 border-b">
//         <h2 className="font-semibold text-lg">Attachments</h2>
//       </div>

//       {/* Tabs */}
//       <div className="flex border-b">
//         <p
//           className={`p-3 cursor-pointer ${activeTab === "upload" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
//           onClick={() => setActiveTab("upload")}
//         >
//           Upload File
//         </p>

//         <p
//           className={`p-3 cursor-pointer ${activeTab === "workdrive" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
//           onClick={() => setActiveTab("workdrive")}
//         >
//           Zoho WorkDrive
//         </p>

//         <p
//           className={`p-3 cursor-pointer ${activeTab === "link" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
//           onClick={() => setActiveTab("link")}
//         >
//           Link (URL)
//         </p>
//       </div>

//       <div className="p-4">
//         {/* ================= Upload File ================= */}
//         {activeTab === "upload" && (
//           <div>
//             <input
//               type="file"
//               multiple
//               onChange={handleFileUpload}
//               className="border p-3 rounded-md w-full"
//             />
//           </div>
//         )}

//         {/* ================= Zoho WorkDrive ================= */}
//         {activeTab === "workdrive" && (
//           <div>
//             <input
//               type="text"
//               placeholder="Enter WorkDrive URL"
//               value={link}
//               onChange={(e) => setLink(e.target.value)}
//               className="border p-2 rounded-md w-full"
//             />
//             <Button className="mt-3" onClick={handleAddLink}>Attach</Button>
//           </div>
//         )}

//         {/* ================= URL Link ================= */}
//         {activeTab === "link" && (
//           <div>
//             <input
//               type="text"
//               placeholder="Enter URL"
//               value={link}
//               onChange={(e) => setLink(e.target.value)}
//               className="border p-2 rounded-md w-full"
//             />
//             <Button className="mt-3" onClick={handleAddLink}>Attach</Button>
//           </div>
//         )}

//         {/* ================= Attached List ================= */}
//         <div className="mt-4 space-y-2">
//           {files.map((item, index) => (
//             <div key={index} className="flex justify-between items-center border p-2 rounded-md bg-gray-50">
//               <span>{item.name}</span>
//               <button
//                 onClick={() => removeItem(index)}
//                 className="text-red-600 text-sm hover:underline"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}

//           {files.length === 0 && <p className="text-gray-400">No attachments found</p>}
//         </div>
//       </div>
//     </div>
//   );
// }


'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";


export default function FileUpload() {
  const [showMenu, setShowMenu] = useState(false);
  const [activeTab, setActiveTab] = useState(null); // upload | workdrive | link
  const [files, setFiles] = useState([]);
  const [link, setLink] = useState("");

  // Upload File
  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles([
      ...files,
      ...uploadedFiles.map((f) => ({ type: "file", name: f.name })),
    ]);
  };

  // Add Link & WorkDrive
  const handleAddLink = () => {
    if (!link.trim()) return;
    setFiles([...files, { type: "link", name: link }]);
    setLink("");
  };

  // Remove
  const removeItem = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  return (
    <div className="border rounded-xl bg-white">
      {/* HEADER */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold mb-3">Attachments</h2>

        {/* ATTACH BUTTON */}
        <div className="relative">
          <Button onClick={() => setShowMenu(!showMenu)}>
            Attach
          </Button>

          {/* DROPDOWN MENU */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 border bg-white shadow-lg rounded-md z-20">
              <p
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setActiveTab("upload");
                  setShowMenu(false);
                }}
              >
                Upload File
              </p>

              {/* <p
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setActiveTab("workdrive");
                  setShowMenu(false);
                }}
              >
                HR-360 WorkDrive
              </p> */}

              <p
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setActiveTab("link");
                  setShowMenu(false);
                }}
              >
                Link (URL)
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ACTIVE INPUT AREA */}
      <div className="p-4">
        {activeTab === "upload" && (
          <div className="mb-4">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="border p-3 rounded-md w-full"
            />
          </div>
        )}

        {activeTab === "workdrive" && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter WorkDrive URL"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="border p-2 rounded-md w-full"
            />
            <Button className="mt-3" onClick={handleAddLink}>
              Attach
            </Button>
          </div>
        )}

        {activeTab === "link" && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter URL"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="border p-2 rounded-md w-full"
            />
            <Button className="mt-3" onClick={handleAddLink}>
              Attach
            </Button>
          </div>
        )}

        {/* FILE LIST */}
        <div className="mt-4 space-y-2">
          {files.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border p-2 rounded-md bg-gray-50"
            >
              <span>{item.name}</span>
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
    </div>
  );
}
