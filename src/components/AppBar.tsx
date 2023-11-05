import React from "react";
import { AppFileType } from "@/types";

type Props = {
  images: AppFileType[];
  handleDeleteFiles: () => void;
  handleUncheckAllImages: () => void;
};

export function AppBar({
  images,
  handleDeleteFiles,
  handleUncheckAllImages,
}: Props) {
  const selectedCount = React.useMemo(
    () => images.filter((img) => img.isChecked).length,
    [images]
  );

  const fileText = selectedCount > 1 ? "Files" : "File";

  return (
    <div className="flex justify-between items-center py-4 px-8 border-b">
      {selectedCount > 0 ? (
        <React.Fragment>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedCount > 0}
              onChange={handleUncheckAllImages}
            />
            <h6 className="text-lg font-semibold">
              {selectedCount} {fileText} Selected
            </h6>
          </div>

          <div>
            <button className="text-red-500" onClick={handleDeleteFiles}>
              Delete Files
            </button>
          </div>
        </React.Fragment>
      ) : (
        <div>
          <h6 className="text-lg font-semibold">Gallery</h6>
        </div>
      )}
    </div>
  );
}
