import { getCategory } from "@/lib/firebase/category/read_server";
import Image from "next/image";
import React from "react";

const CategoryCard = async ({ categoryId }: { categoryId: string }) => {
  const categoryData = await getCategory(categoryId);

  return (
    <div className="p-2 rounded flex gap-3 items-center bg-white opacity-70">
      <Image
        src={categoryData?.iconUrl}
        alt="author-image"
        width={150}
        height={50}
        className="rounded-full h-5 w-6 object-cover"
      />
      <h1 className="font-bold text-sm text-gray-500">{categoryData?.name}</h1>
      <h5 className="text-xs text-gray-500">{categoryData?.slug}</h5>
    </div>
  );
};

export default CategoryCard;
