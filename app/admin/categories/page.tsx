import CategoriesListView from "@/components/AdminComponents/Categories/CategoriesListView";
import { FilePlus } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <main className="p-6 w-full flex flex-col gap-4 " >
      <div className="flex justify-between items-center">
        <h1 className="text-4xl text-orange-600 font-bold">Categories</h1>
        <Link href={'/admin/categories/form'}>
        <button className="bg-blue-500 rounded-full py-2 px-4 gap-2 flex">
          {" "}
          <FilePlus />
          Add
        </button>
        </Link>
      </div>
      <CategoriesListView />
    </main>
  );
};

export default page;
