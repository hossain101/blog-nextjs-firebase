import { getAllPosts } from "@/lib/firebase/posts/read_server";
import React from "react";
import PostCard from "./PostCard";

const UserPostListView = async () => {
  const posts = await getAllPosts();

  if (!posts) {
    return <div>No data</div>;
  }

  return (
    <section className="p-10">
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
    </section>
  );
};

export default UserPostListView;
