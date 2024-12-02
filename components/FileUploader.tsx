"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { convertFileToUrl } from "@/lib/utils";
import { X } from "lucide-react";

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};

export const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the dropzone click
    onChange([]); // Clear the files array
  };

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <div className="relative">
          <Image
            src={convertFileToUrl(files[0])}
            width={1000}
            height={1000}
            alt="uploaded image"
            className="max-h-[400px] overflow-hidden object-cover"
          />
          <button
            onClick={handleDelete}
            className="absolute top-2 right-2 p-1 bg-gray-800 bg-opacity-50 rounded-full hover:bg-opacity-70 transition-all"
            type="button"
            aria-label="Delete uploaded file"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      ) : (
        <>
          <Image
            src="/assets/icons/upload.svg"
            width={40}
            height={40}
            alt="upload"
          />
          <div className="file-upload_label">
            <p className="text-14-regular ">
              <span className="text-green-500">Click to upload </span>
              or drag and drop
            </p>
            <p className="text-12-regular">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
        </>
      )}
    </div>
  );
};
