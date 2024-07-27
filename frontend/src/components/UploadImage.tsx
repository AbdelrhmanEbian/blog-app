'use client'
import { CldUploadWidget } from "next-cloudinary";
import { image } from "./Write";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
type UploadButtonProps = {
  setImage: (image: image) => void;
};
const UploadImage = ({ setImage }: UploadButtonProps) => {
  const [imageUrl , setUrl] = useState<string | null>(null)
  const handleUpload = (result: any, error: string | null) => {
    if (result.event === "success" && result.info?.secure_url) {
      // Call the onImageUpload function with the uploaded image URL
      const original_filename = result.info.original_filename;
      const format = result.info.format;
      const fileName = original_filename.concat("." + format);
      const publicId = result.info.public_id;
      const secureUrl = result.info.secure_url;
      setImage({ secureUrl, fileName, publicId });
      toast.success('Image uploaded successfully');
      setUrl(secureUrl)
    } else {
      console.error(error || "Image upload failed");
    }
  };

  return (
    <CldUploadWidget
      uploadPreset="yvboxb9e"
      onUpload={handleUpload}
      options={{
        sources: ["local", "camera", "url"],
        maxFiles: 1, // Allow only one file to be uploaded
        resourceType: "image", // Specify the resource type as 'image'
      }}
    >
      {({ open }) => {
        function handleOnClick(e: React.MouseEvent<HTMLButtonElement>) {
          e.preventDefault();
          open();
        }
        return (
          <>
          <button
            className="btn btn-secondary mt-5 w-full"
            onClick={handleOnClick}
            aria-label="upload image"
            >
            Upload an Image
          </button>
          {
            imageUrl && (
              <div className="w-full my-5 md:w-1/2 h-[250px] relative">
              <Image
              sizes="(max-width: 600px) 100vw, 
              (max-width: 1200px) 50vw, 
              33vw"
              loading="lazy"
              className="rounded-lg"
              width={100}
              height={250}
              style={{
                objectFit: "contain",
                width: "fit-content",
                margin: "auto",
                height: "100%",
              }}
              alt={"uploaded post image"}
              src={imageUrl ? imageUrl : "/p1.jpeg"}
              />
              </div>
            )
          }
            </> 
        );
      }}
    </CldUploadWidget>
  );
};

export default UploadImage;
