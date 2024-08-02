"use client";
import { usePosts } from "@/lib/firebase/posts/read";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PostListView = () => {
  const { data, error, isLoading } = usePosts();
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
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Slug</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((post: Record<string, string>, index: number) => (
            <tr key={post.id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">
                <Image
                  src={post.postImageUrl}
                  alt="post-image"
                  width={50}
                  height={50}
                />
              </td>
              <td className="border px-4 py-2">{post.title}</td>
              <td className="border px-4 py-2">{post.slug}</td>
              <td className="border px-4 py-2">
                <Link href={`/admin/posts/form?id=${post.id}`}>
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

export default PostListView;
