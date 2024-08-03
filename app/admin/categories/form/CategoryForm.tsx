
import { useCategoryForm } from "@/lib/contexts/CategoryFormContext";

import Image from "next/image";
import React, { useEffect } from "react";

const CategoryForm = () => {
  const categoryForm = useCategoryForm();
  const handelCreate = categoryForm?.handleCreate;
  const handleData = categoryForm?.handleData;
  const data = categoryForm?.data;
  const isLoading = categoryForm?.isLoading;
  const error = categoryForm?.error;
  const image = categoryForm?.image;
  const setImage = categoryForm?.setImage;
  const isDone = categoryForm?.isDone;
  const updateCategoryId = categoryForm?.updateCategoryId;
  const fetchData = categoryForm?.fetchData;
  const handleUpdate = categoryForm?.handleUpdate;
  const handleDelete = categoryForm?.handleDelete;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (updateCategoryId) {
      fetchData!(updateCategoryId);
    }
  }, [fetchData, updateCategoryId]);

  return (
    <main className="p-6 w-full flex flex-col gap-5">
      <h1>Category|Form</h1>
      {updateCategoryId ? (
        <div className="flex">
          <h3 className="text-white bg-blue-600 rounded-full px-4 py-2 ">
            Update {updateCategoryId}
          </h3>
        </div>
      ) : (
        <div className="flex">
          <h3 className="text-white bg-green-600 rounded-full px-4 py-2 ">
            Create
          </h3>
        </div>
      )}
      <div className="flex justify-center items-center"></div>
      <section className="flex justify-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (updateCategoryId) {
              handleUpdate!();
            } else {
              handelCreate!();
            }
          }}
          className="bg-slate-300 rounded-xl p-7"
        >
          <div className="flex flex-col gap-2 justify-center items-baseline">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Category Name"
              className="px-4 py-2 my-2 rounded-full border bg-gray-200"
              required
              onChange={(e) => {
                handleData!("name", e.target.value);
              }}
              value={data?.name}
            />
          </div>
          <div className="flex flex-col gap-2 justify-start items-baseline">
            <label htmlFor="name">Slug</label>
            <input
              type="text"
              placeholder="Enter Category Slug"
              className="px-4 py-2 my-2 rounded-full border bg-gray-200"
              required
              onChange={(e) => {
                handleData!("slug", e.target.value);
              }}
              value={data?.slug}
            />
          </div>
          {image && (
            <div className="flex justify-center items-center">
              <Image
                src={URL.createObjectURL(image)}
                alt="category-image"
                className="object-cover "
                width={150}
                height={150}
              />
            </div>
          )}
          {data!.iconUrl && (
            <div className="flex justify-center items-center">
              <Image
                src={data!.iconUrl}
                alt="category-image"
                className="object-cover "
                width={150}
                height={150}
              />
            </div>
          )}
          <div className="flex flex-col gap-2 justify-start items-baseline">
            <label htmlFor="name">Image</label>
            <input
              type="file"
              placeholder="Enter Category Image"
              className="px-4 py-2 my-2 rounded-full border bg-gray-200"
              onChange={(e) => {
                setImage!(e.target.files![0]);
              }}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {!isDone && (
            <button
              type="submit"
              className="bg-blue-500 rounded-full py-2 px-4 gap-2 flex"
              disabled={isLoading}
            >
              {isLoading
                ? "Loading..."
                : updateCategoryId
                ? "update"
                : "Add Category"}
            </button>
          )}
          {updateCategoryId && !isDone && (
            <button
              onClick={() => {
                handleDelete!(updateCategoryId);
              }}
              className="bg-red-500 rounded-full py-2 px-4 gap-2 flex"
              disabled={isLoading}
            >
              {isLoading
                ? "Loading..."
                : updateCategoryId
                ? "Delete"
                : "Add Category"}
            </button>
          )}
          {isDone && (
            <p className="text-green-500">
              Category {updateCategoryId ? "Updated" : "Added"} Successfully
            </p>
          )}
        </form>
      </section>
    </main>
  );
};

export default CategoryForm;
