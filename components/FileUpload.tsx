import React, { ChangeEvent } from 'react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onFileUpload(event.target.files[0]);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="file-upload" className="block font-medium mb-2">
        Select a file:
      </label>
      <input
        id="file-upload"
        type="file"
        onChange={handleFileChange}
        className="w-full bg-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};
