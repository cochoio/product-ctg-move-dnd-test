import React from "react";
import { useDrag, useDrop } from "react-dnd";

export type CardProps = {
  id: number;
  name: string;
  index: number;
  moveCategory: (item: any, targetIndex: number) => void;
};

const CategoryCard: React.FC<CardProps> = (props) => {
  const ref = React.useRef<HTMLDivElement>();

  const [{ handlerId }, drop] = useDrop({
    accept: "CARD",
    collect(monitor) {
      console.log("collect");
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      const dragIndex = item.index;
      const hoverIndex = props.index;

      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      props.moveCategory(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: () => {
      return { id: props.id, index: props.index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      style={{
        width: 300,
        height: 80,
        border: "1px dotted #333",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: opacity,
        transition: "all 300ms",
      }}
    >
      {props.id}: {props.name}
    </div>
  );
};

export default CategoryCard;
