import AuthorCard from "@/components/Posts/AuthorCard";
import CategoryCard from "@/components/Posts/CategoryCard";
import { getPost } from "@/lib/firebase/posts/read_server";
import Image from "next/image";
import React from "react";

const page = async ({ params }: { params: { postID: string } }) => {
  const post = await getPost(params.postID);

  return (
    <main className="flex justify-center">

      <section className="p-10 flex flex-col gap-4 border max-w-[800]">

      <CategoryCard categoryId={post?.categoryId} />
      <h1 className="text-3xl font-bold">{post?.title}</h1>

      <Image
        src={post?.postImageUrl}
        alt="post-image"
        height={500}
        width={500}
        className="object-cover w-full "
        />
      <h5 className="text-xs text-gray-500">
        {post?.Timestamp.toDate().toLocaleDateString()}
      </h5>
      <AuthorCard authorId={post?.authorId} />
      <div dangerouslySetInnerHTML={{__html:post?.content}}></div>
        </section>
    </main>
  );
};

export default page;
