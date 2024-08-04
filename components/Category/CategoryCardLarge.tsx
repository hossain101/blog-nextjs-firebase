import Image from "next/image";
import React from "react";

const CategoryCardLarge = ({
  category,
}: {
  category: Record<string, string>;
}) => {
  return (
    <div className="">
      <Image
        src={category?.iconUrl}
        alt="category-image"
        width={150}
        height={150}
        className="h-100 w-100 object-cover"
      />
      <h1>{category?.name}</h1>
    </div>
  );
};

export default CategoryCardLarge;
