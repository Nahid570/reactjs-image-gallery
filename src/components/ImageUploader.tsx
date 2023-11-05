import React from "react";
import { toast } from "react-toastify";
import { AppFileType } from "@/types";
import ImageUploadIcon from "@assets/icons/image_upload_icon.png";

type Props = {
  uploadImageHandler: (uploadedFile: AppFileType) => void;
};

const VALID_IMG_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
]);

const checkMimeType = (fileType: string) => {
  return VALID_IMG_TYPES.has(fileType);
};

export function ImageUploader({ uploadImageHandler }: Props) {
  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const file = event.target.files.item(0);
      if (file && checkMimeType(file.type)) {
        const reader = new FileReader();

        reader.onload = (e) => {
          if (e.target) {
            const dataURL = e.target.result as string;

            uploadImageHandler({
              id: Date.now(),
              imgSrc: dataURL,
              isChecked: false,
            });
          }
        };

        reader.readAsDataURL(file);
      } else {
        toast("File is not a valid image format", {
          type: "error",
          position: "top-center",
        });
      }
    }
  }

  return (
    <div className="flex justify-center items-center overflow-hidden">
      <form>
        <input
          hidden
          value={""}
          type={"file"}
          id="custom-image-upload"
          onChange={handleFileUpload}
        />
        <label
          htmlFor="custom-image-upload"
          className="flex flex-col items-center cursor-pointer"
        >
          <img
            draggable={false}
            src={ImageUploadIcon}
            alt="image-upload-icon"
            className="object-cover h-[64px] w-[64px]"
          />
          <p className="mt-5">Add Images</p>
        </label>
      </form>
    </div>
  );
}
