import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import { storage, storageRef } from "/services/firebaseConfig";

export const InputImg = ({ onChange, img }) => {
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  // const addImg = ref(storage, 'img');


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validTypes = [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/webp',
      'image/svg+xml'
    ];

    if (!validTypes.includes(file.type)) {
      setError("Unsupported file type. Please select a valid image.");
      
    } else {
      setError("");
      setFileName(file.name);
      console.log("Valid file selected:", file);
      onChange(file); // ✅ pass file back to parent
    }
  };

  return (
    <>
      <div className="grid w-full items-center gap-3 text-white">
        <Label htmlFor="picture">Image</Label>
        <Input  
          id="picture"
          type="file"
          accept=".png, .jpeg, .jpg, .webp, .svg"
          onChange={handleFileChange}
          className="text-white"
        />
        {fileName && <p className="text-green-400 mt-1">Selected: {fileName}</p>}
        {error && <p className="text-red-500 mt-1">{error}</p>}
      </div>
    </>
  );
};

export default InputImg;
