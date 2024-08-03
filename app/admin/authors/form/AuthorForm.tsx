'use client'
import { useAuthorForm } from "@/lib/contexts/AuthorFormContext";
import { getAuthor } from "@/lib/firebase/author/read";
import Image from "next/image";
import React, { useEffect } from "react";

const AuthorForm = () => {
  const authorForm = useAuthorForm();
  const handelCreate = authorForm?.handleCreate;
  const handleData = authorForm?.handleData;
  const data = authorForm?.data;
  const isLoading = authorForm?.isLoading;
  const error = authorForm?.error;
  const image = authorForm?.image;
  const setImage = authorForm?.setImage;
  const isDone = authorForm?.isDone;
  const updateAuthorId = authorForm?.updateAuthorId;
  const fetchData = authorForm?.fetchData;
  const handleUpdate = authorForm?.handleUpdate;
  const handleDelete = authorForm?.handleDelete;

  useEffect(() => {
    if (updateAuthorId) {
      fetchData!(updateAuthorId);
    }
  }, []);

  return (
    <main className="p-6 w-full flex flex-col gap-5">
      <h1>Author|Form</h1>
      {updateAuthorId ? (
        <div className="flex">
          <h3 className="text-white bg-blue-600 rounded-full px-4 py-2 ">
            Update {updateAuthorId}
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
            if (updateAuthorId) {
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
              placeholder="Enter Author Name"
              className="px-4 py-2 my-2 rounded-full border bg-gray-200"
              required
              onChange={(e) => {
                handleData!("name", e.target.value);
              }}
              value={data?.name}
            />
          </div>
          <div className="flex flex-col gap-2 justify-start items-baseline">
            <label htmlFor="name">Email</label>
            <input
              type="email"
              placeholder="Enter Author Email"
              className="px-4 py-2 my-2 rounded-full border bg-gray-200"
              required
              onChange={(e) => {
                handleData!("email", e.target.value);
              }}
              value={data?.email}
            />
          </div>
          {image && (
            <div className="flex justify-center items-center">
              <Image
                src={URL.createObjectURL(image)}
                alt="Author-image"
                className="object-cover "
                width={150}
                height={150}
              />
            </div>
          )}
          {data!.authorPhotoURL && (
            <div className="flex justify-center items-center">
              <Image
                src={data!.authorPhotoURL}
                alt="Author-image"
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
              placeholder="Enter Author Image"
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
                : updateAuthorId
                ? "update"
                : "Add Author"}
            </button>
          )}
          {updateAuthorId && !isDone && (
            <button
              onClick={() => {
                handleDelete!(updateAuthorId);
              }}
              className="bg-red-500 rounded-full py-2 px-4 gap-2 flex"
              disabled={isLoading}
            >
              {isLoading
                ? "Loading..."
                : updateAuthorId
                ? "Delete"
                : "Add Author"}
            </button>
          )}
          {isDone && (
            <p className="text-green-500">
              Author {updateAuthorId ? "Updated" : "Added"} Successfully
            </p>
          )}
        </form>
      </section>
    </main>
  );
};

export default AuthorForm;
