import CategoryCard from "@/components/Posts/CategoryCard";
import PostCard from "@/components/Posts/PostCard";
import {
  getAllPosts,
  getAllPostsWithCategory,
} from "@/lib/firebase/posts/read_server";
import React from "react";

const page = async ({ params }: { params: { categoryID: string } }) => {
  const { categoryID } = params;
  const posts = await getAllPostsWithCategory(categoryID.toString());
  return (
    <main>
      <CategoryCard categoryId={categoryID} />
      <div className="grid grid-cols-4 gap-5 border">
        {posts.map((post: Record<string, string>, index: number) => (
          <div key={post.id}>
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
          </div>
        ))}
      </div>
    </main>
  );
};

export default page;
