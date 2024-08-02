"use client";
import { useCategories } from "@/lib/firebase/category/read";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoriesListView = () => {
  const { data, error, isLoading } = useCategories();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (!data) {
    return <div>No data</div>;
  }
  return (
    <section>
      <table className="w-full">
        <thead className="bg-blue-50">
          <tr>
            <th className="border px-4 py-2">Sr.</th>
            <th className="border px-4 py-2">Icon</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Slug</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((category: Record<string, string>, index: number) => (
            <tr key={category.id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">
                <Image
                  src={category.iconUrl}
                  alt="category-image"
                  width={50}
                  height={50}
                />
              </td>
              <td className="border px-4 py-2">{category.name}</td>
              <td className="border px-4 py-2">{category.slug}</td>
              <td className="border px-4 py-2">
                <Link href={`/admin/categories/form?id=${category.id}`}>
                <button className="bg-blue-500 rounded-full px-3 py-1 text-sm text-white">
                  Action
                </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default CategoriesListView;
