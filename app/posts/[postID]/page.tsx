import AuthorCard from "@/components/Posts/AuthorCard";
import CategoryCard from "@/components/Posts/CategoryCard";
import { getPost } from "@/lib/firebase/posts/read_server";
import Image from "next/image";
import React from "react";

import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
}: {
  params: { postID: string };
}): Promise<Metadata> {
  // read route params
  const id = params.postID;

  // fetch data
  const post = await getPost(params.postID);

  // optionally access and extend (rather than replace) parent metadata

  return {
    title: id,
    openGraph: {
      images: [post?.postImageUrl],
    },
  };
}

const page = async ({ params }: { params: { postID: string } }) => {
  const post = await getPost(params.postID);

  if (!post) {
    return <div>No Data</div>; // Or any other loading state representation
  }

  return (
    <main className="flex justify-center">
      <section className="p-10 flex flex-col gap-4 border max-w-[800px]">
        <CategoryCard categoryId={post.categoryId} />
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <Image
          src={post.postImageUrl}
          alt="post-image"
          height={500}
          width={500}
          className="object-cover w-full"
        />
        <h5 className="text-xs text-gray-500">
          {new Date(post.Timestamp).toLocaleDateString()}
        </h5>
        <AuthorCard authorId={post.authorId} />
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </section>
    </main>
  );
};

export default page;
