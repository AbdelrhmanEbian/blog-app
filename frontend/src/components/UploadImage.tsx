'use client'
import { CldUploadWidget } from "next-cloudinary";
import { image } from "./Write";
import React, { useState }  from "react";
type UploadButtonProps = {
  setImage: (image: image) => void;
};
const UploadImage = ({ setImage }: UploadButtonProps) => {
  const  [Uploaded, setUploaded] = useState<boolean>(false)
  const handleUpload = (result: any, error: string | null) => {
    if (result.event === "success" && result.info?.secure_url) {
      // Call the onImageUpload function with the uploaded image URL
      const original_filename = result.info.original_filename;
      const format = result.info.format;
      const fileName = original_filename.concat("." + format);
      const publicId = result.info.public_id;
      const secureUrl = result.info.secure_url;
      setImage({ secureUrl, fileName, publicId });
      setUploaded(true)
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
            >
            Upload an Image
          </button>
          {Uploaded &&  (<h3 className="text-2xl my-3 text-accent font-semibold">the photo is uploaded succefully</h3>) }
            </>
        );
      }}
    </CldUploadWidget>
  );
};

export default UploadImage;
