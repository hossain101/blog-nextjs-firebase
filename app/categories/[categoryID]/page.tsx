import PostCard from "@/components/Posts/PostCard";
import { getAllPostsWithCategory } from "@/lib/firebase/posts/read_server";
import React from "react";

const page = async ({ params }: { params: { categoryID: string } }) => {
  const { categoryID } = params;
  const posts = await getAllPostsWithCategory(categoryID);
  return (
    <main>
      <h1>Category: {categoryID}</h1>
      <div className="grid grid-cols-4 gap-5 border">
        {posts.map((post: Record<string, string>, index: number) => (
          <PostCard
            key={post.id}
            Timestamp={post.Timestamp}
            authorId={post.authorId}
            content={post.content}
            title={post.title}
            postImageUrl={post.postImageUrl}
            categoryId={post.categoryId}
            postID={post.id}
          />
        ))}
      </div>
    </main>
  );
};

export default page;
