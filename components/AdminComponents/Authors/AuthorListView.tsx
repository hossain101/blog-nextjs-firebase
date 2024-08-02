"use client";

import { useAuthors } from "@/lib/firebase/author/read";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AuthorListView = () => {
  const { data, error, isLoading } = useAuthors();
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
            <th className="border px-4 py-2">Author Photo</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((author: Record<string, string>, index: number) => (
            <tr key={author.id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">
                <Image
                  src={author.authorPhotoURL}
                  alt="author-image"
                  width={50}
                  height={50}
                />
              </td>
              <td className="border px-4 py-2">{author.name}</td>
              <td className="border px-4 py-2">{author.email}</td>
              <td className="border px-4 py-2">
                <Link href={`/admin/authors/form?id=${author.id}`}>
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

export default AuthorListView;
