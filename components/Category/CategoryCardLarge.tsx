import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryCardLarge = ({
  category,
}: {
  category: Record<string, string>;
}) => {
  return (
    <Link href={`/categories/${category?.id}`}>
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl  hover:bg-slate-600 ">
      <Image
        src={category?.iconUrl}
        alt="category-image"
        width={150}
        height={150}
        className="h-100 w-100 object-cover"
      />
      <h1>{category?.name}</h1>
    </div>
    </Link>
  );
};

export default CategoryCardLarge;
