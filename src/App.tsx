import React from "react";
import { AppFileType } from "@/types";
import { AppBar } from "@components/AppBar";
import Draggable from "@components/Draggable";
import { ToastContainer } from "react-toastify";
import { ImageUploader } from "@components/ImageUploader";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import {
  useSensor,
  useSensors,
  DndContext,
  MouseSensor,
  DragOverlay,
  TouchSensor,
  DragEndEvent,
  closestCenter,
  DragStartEvent,
} from "@dnd-kit/core";

import Image1 from "@assets/images/image-1.webp";
import Image2 from "@assets/images/image-2.webp";
import Image3 from "@assets/images/image-3.webp";
import Image4 from "@assets/images/image-4.webp";
import Image5 from "@assets/images/image-5.webp";
import Image6 from "@assets/images/image-6.webp";
import Image7 from "@assets/images/image-7.webp";
import Image8 from "@assets/images/image-8.webp";
import Image9 from "@assets/images/image-9.webp";
import Image10 from "@assets/images/image-10.jpeg";
import Image11 from "@assets/images/image-11.jpeg";

const App = () => {
  const [activeImg, setActiveImg] = React.useState<AppFileType | null>(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const [images, setImages] = React.useState<AppFileType[]>([
    {
      id: 1,
      imgSrc: Image1,
      isChecked: false,
    },
    {
      id: 2,
      imgSrc: Image2,
      isChecked: false,
    },
    {
      id: 3,
      imgSrc: Image3,
      isChecked: false,
    },
    {
      id: 4,
      imgSrc: Image4,
      isChecked: false,
    },
    {
      id: 5,
      imgSrc: Image5,
      isChecked: false,
    },
    {
      id: 6,
      imgSrc: Image6,
      isChecked: false,
    },
    {
      id: 7,
      imgSrc: Image7,
      isChecked: false,
    },
    {
      id: 8,
      imgSrc: Image8,
      isChecked: false,
    },
    {
      id: 9,
      imgSrc: Image9,
      isChecked: false,
    },
    {
      id: 10,
      imgSrc: Image10,
      isChecked: false,
    },
    {
      id: 11,
      imgSrc: Image11,
      isChecked: false,
    },
  ]);

  function uploadImageHandler(uploadedFile: AppFileType) {
    setImages([...images, uploadedFile]);
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveImg(event.active.data.current as AppFileType);
  }

  function handleDragCancel() {
    setActiveImg(null);
  }

  function handleCheckboxChange(imageId: number) {
    const updatedImages = images.map((image) => {
      if (image.id === imageId) {
        return {
          ...image,
          isChecked: !image.isChecked,
        };
      }
      return image;
    });

    setImages(updatedImages);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setImages((prevImages) => {
        const dragImageIndex = prevImages.findIndex(
          (img) => img.id === active.data.current!.id
        );
        const dropImageIndex = prevImages.findIndex(
          (img) => img.id === over!.data.current!.id
        );
        const updateImages = [...prevImages];

        if (dragImageIndex > -1 && dropImageIndex > -1) {
          const dragImage = prevImages[dragImageIndex];

          if (dragImageIndex > dropImageIndex) {
            // dragging item er index er chaite dropzone er index choto hoile tahole ek ghore dane sore jabe reordering e
            for (let index = dragImageIndex; index > dropImageIndex; index--) {
              updateImages[index] = updateImages[index - 1];
            }
          } else if (dragImageIndex < dropImageIndex) {
            // dragging item er index er chaite dropzone er index boro hoile tahole ek ghor bame sore jabe reordering e
            for (
              let index = dragImageIndex;
              dropImageIndex < updateImages.length && index < dropImageIndex;
              index++
            ) {
              updateImages[index] = updateImages[index + 1];
            }
          }

          updateImages[dropImageIndex] = dragImage;
        }

        return updateImages;
      });
    }
    setActiveImg(null);
  }

  function handleDeleteFiles() {
    setImages((prevImages) => prevImages.filter((img) => !img.isChecked));
  }

  function handleUncheckAllImages() {
    setImages((prevImages) =>
      prevImages.map((img) => ({
        ...img,
        isChecked: false,
      }))
    );
  }

  return (
    <div className="bg-gray-100 py-5">
      <div className="container mx-auto">
        <div className="bg-white rounded-lg shadow-md">
          <AppBar
            images={images}
            handleDeleteFiles={handleDeleteFiles}
            handleUncheckAllImages={handleUncheckAllImages}
          />

          <div className="grid grid-cols-2 ss:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 auto-rows-[minmax(200px,_1fr)] gap-4 relative p-8">
            <DndContext
              sensors={sensors}
              onDragEnd={handleDragEnd}
              onDragStart={handleDragStart}
              onDragCancel={handleDragCancel}
              collisionDetection={closestCenter}
            >
              {images.map((image, index) => (
                <Draggable
                  image={image}
                  key={image.id}
                  featured={index === 0}
                  handleCheckboxChange={handleCheckboxChange}
                />
              ))}

              <DragOverlay adjustScale modifiers={[restrictToParentElement]}>
                {activeImg ? (
                  <div
                    className={`border-solid border-[.5px] border-gray-500 rounded-lg relative h-full w-full`}
                  >
                    <img
                      draggable={false}
                      src={activeImg.imgSrc}
                      alt={`image-${activeImg.id}`}
                      className={"rounded-lg block bg-white h-full w-full"}
                    />
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>

            {/* Image Uploader  */}
            <ImageUploader uploadImageHandler={uploadImageHandler} />
            {/* Image Uploader  */}
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default App;
