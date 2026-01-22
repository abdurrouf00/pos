"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SimpleNotes() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  // Add Note
  const addNote = () => {
    if (!note.trim()) return;
    setNotes([...notes, note]);
    setNote("");
  };

  // Remove Note
  const removeNote = (index) => {
    const updated = [...notes];
    updated.splice(index, 1);
    setNotes(updated);
  };

  return (
    <div className="p-4 border rounded-xl bg-white ">
      <h2 className="text-lg font-semibold mb-3">Add Note</h2>

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Write a note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="flex-1 border p-2 rounded-md"
        />

        <Button
          onClick={addNote}
          
        >
          Add
        </Button>
      </div>

      {/* Notes List */}
      <div className="space-y-2">
        {notes.map((n, i) => (
          <div
            key={i}
            className="border p-2 rounded-md bg-gray-50 flex justify-between items-center"
          >
            <span>{n}</span>

            <button
              onClick={() => removeNote(i)}
              className="text-red-600 text-sm hover:underline"
            >
              Remove
            </button>
          </div>
        ))}

        {notes.length === 0 && (
          <p className="text-gray-400 text-center ">No notes added yet</p>
        )}
      </div>
    </div>
  );
}
