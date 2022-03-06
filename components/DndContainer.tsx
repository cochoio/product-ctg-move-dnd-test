import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CategoryCard from "./CategoryCard";

const DndContainer: React.FC = () => {
  const [categories, setCategories] = React.useState([
    { id: 1, name: "의류" },
    { id: 2, name: "식품" },
    { id: 3, name: "가구" },
  ]);

  const handleMoveCategory = (dragIndex: number, hoverIndex: number) => {
    let newCtgs = [...categories];

    let tmp = newCtgs[dragIndex];

    newCtgs.splice(dragIndex, 1);
    newCtgs.splice(hoverIndex, 0, tmp);

    console.log("ctgs", newCtgs);
    setCategories(newCtgs);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {categories.map((ctg, index) => (
          <CategoryCard
            key={ctg.id}
            index={index}
            {...ctg}
            moveCategory={handleMoveCategory}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default DndContainer;
