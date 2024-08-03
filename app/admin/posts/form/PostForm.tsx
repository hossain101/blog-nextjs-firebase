
'use client';
import { RTEField } from "@/components/AdminComponents/Posts/RTEField";
import { usePostForm } from "@/lib/contexts/PostFormContext";
import { useAuthors } from "@/lib/firebase/author/read";
import { useCategories } from "@/lib/firebase/category/read";

import Image from "next/image";
import React, { useEffect } from "react";

const PostForm = () => {
   
  const postForm = usePostForm();
  const handelCreate = postForm?.handleCreate;
  const handleData = postForm?.handleData;
  const data = postForm?.data;
  const isLoading = postForm?.isLoading;
  const error = postForm?.error;
  const image = postForm?.image;
  const setImage = postForm?.setImage;
  const isDone = postForm?.isDone;
  const updatePostId = postForm?.updatePostId;
  const fetchData = postForm?.fetchData;
  const handleUpdate = postForm?.handleUpdate;
  const handleDelete = postForm?.handleDelete;

 
  useEffect(() => {
    if (updatePostId) {
      fetchData!(updatePostId);
    }
  }, []);

  return (
    
    <main className="p-6 w-full flex flex-col gap-5">
      <h1>Post|Form</h1>
      {updatePostId ? (
        <div className="flex">
          <h3 className="text-white bg-blue-600 rounded-full px-4 py-2 ">
            Update {updatePostId}
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
            if (updatePostId) {
              handleUpdate!();
            } else {
              handelCreate!();
            }
          }}
          className="bg-slate-300 rounded-xl p-7"
        >
          <div className="flex flex-col gap-2 justify-center items-baseline">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="Enter Post title"
              className="px-4 py-2 my-2 rounded-full border bg-gray-200"
              required
              onChange={(e) => {
                handleData!("title", e.target.value);
              }}
              value={data?.title}
            />
          </div>
          <div className="flex flex-col gap-2 justify-start items-baseline">
            <label htmlFor="title">Slug</label>
            <input
              type="text"
              placeholder="Enter Post Slug"
              className="px-4 py-2 my-2 rounded-full border bg-gray-200"
              required
              disabled={updatePostId ? true : false}
              onChange={(e) => {
                handleData!("slug", e.target.value);
              }}
              value={data?.slug}
            />
          </div>
          <div className="flex flex-col gap-2 justify-start items-baseline">
            <label htmlFor="title">Category</label>
            <SelectCategoryField />
          </div>
          <div className="flex flex-col gap-2 justify-start items-baseline">
            <label htmlFor="title">Category</label>
            <SelectAuthorField />
          </div>
          {image && (
            <div className="flex justify-center items-center">
              <Image
                src={URL.createObjectURL(image)}
                alt="post-image"
                className="object-cover "
                width={150}
                height={150}
              />
            </div>
          )}
          {data!.postImageUrl && (
            <div className="flex justify-center items-center">
              <Image
                src={data!.postImageUrl}
                alt="post-image"
                className="object-cover "
                width={150}
                height={150}
              />
            </div>
          )}
          <div className="flex flex-col gap-2 justify-start items-baseline">
            <label htmlFor="title">Image</label>
            <input
              type="file"
              placeholder="Enter Post Image"
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
              {isLoading ? "Loading..." : updatePostId ? "update" : "Add Post"}
            </button>
          )}
          {updatePostId && !isDone && (
            <button
              onClick={() => {
                handleDelete!(updatePostId);
              }}
              className="bg-red-500 rounded-full py-2 px-4 gap-2 flex"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : updatePostId ? "Delete" : "Add Post"}
            </button>
          )}
          {isDone && (
            <p className="text-green-500">
              Post {updatePostId ? "Updated" : "Added"} Successfully
            </p>
          )}
        </form>
        <RTEField />
      </section>
    </main>
   
  );
};

function SelectCategoryField() {
  const postForm = usePostForm();
  const handelCreate = postForm?.handleCreate;
  const handleData = postForm?.handleData;
  const postData = postForm?.data;

  const categoryDataContext = useCategories();
  const categoryData: [] = categoryDataContext?.data;
  const isLoading: boolean = categoryDataContext?.isLoading;
  return (
    <div>
      <select
        name="category"
        id="category"
        value={postData?.id}
        onChange={(e) => {
          handleData!("categoryId", e.target.value);
        }}
      >
        <option value="" disabled selected>
          Select Category
        </option>
        {categoryData &&
          categoryData?.map(
            (category: Record<string, string>, index: number) => {
              return (
                <option key={index} value={category!.id}>
                  {category!.name}
                </option>
              );
            }
          )}
      </select>
    </div>
  );
}
function SelectAuthorField() {
  const postForm = usePostForm();
  const handelCreate = postForm?.handleCreate;
  const handleData = postForm?.handleData;
  const postData = postForm?.data;

  const AuthorDataContext = useAuthors();
  const authoryData: [] = AuthorDataContext?.data;
  const isLoading: boolean = AuthorDataContext?.isLoading;
  return (
    <div>
      <select
        name="author"
        id="author"
        value={postData?.id}
        onChange={(e) => {
          handleData!("authorId", e.target.value);
        }}
      >
        <option value="" disabled selected>
          Select Category
        </option>
        {authoryData &&
          authoryData?.map((author: Record<string, string>, index: number) => {
            return (
              <option key={index} value={author!.id}>
                {author!.name}
              </option>
            );
          })}
      </select>
    </div>
  );
}
export default PostForm