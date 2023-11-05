import clsx from "clsx";
import { CSS } from "@dnd-kit/utilities";
import { useDraggable, useDroppable } from "@dnd-kit/core";

type Props = {
  image: {
    id: number;
    imgSrc: string;
    isChecked: boolean;
  };
  featured: boolean;
  handleCheckboxChange: (imageId: number) => void;
};

function Draggable({ image, featured, handleCheckboxChange }: Props) {
  const {
    listeners,
    attributes,
    transform,
    isDragging,
    setNodeRef: setDraggableNodeRef,
  } = useDraggable({
    id: `image-${image.id}`,
    data: {
      id: image.id,
      imgSrc: image.imgSrc,
    },
  });

  const { isOver, setNodeRef: setDroppableNodeRef } = useDroppable({
    id: `image-${image.id}`,
    data: {
      id: image.id,
      imgSrc: image.imgSrc,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setDraggableNodeRef}
      className={clsx("h-full w-full", {
        "col-span-2 row-span-2": featured,
      })}
    >
      <div ref={setDroppableNodeRef} className={"relative h-full w-full"}>
        {!isDragging && (
          <input
            type="checkbox"
            checked={image.isChecked}
            onChange={() => handleCheckboxChange(image.id)}
            className={`top-4 absolute z-10 left-4 group-hover:block`}
          />
        )}

        <div
          className={`border-solid border-[.5px] border-gray-500 rounded-lg h-full w-full`}
        >
          <div
            style={style}
            {...listeners}
            {...attributes}
            className={`relative group h-full w-full transition-all duration-500`}
          >
            <div
              className={clsx(
                `absolute top-0 left-0 w-full h-full transition-all duration-500 group-hover:bg-gray-500 opacity-60`,
                {
                  "bg-slate-300 opacity-40": image.isChecked,
                }
              )}
            />

            <img
              draggable={false}
              src={image.imgSrc}
              alt={`image-${image.id}`}
              className={clsx("rounded-lg block bg-white h-full w-full", {
                "opacity-0": isDragging || isOver,
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Draggable;
