import firebase from "firebase/compat/app";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AuthorCard from "./AuthorCard";
import CategoryCard from "./CategoryCard";

interface PostData {
  title: string;
  content: string;
  postImageUrl?: string;
  Timestamp: string;
  authorId: string;
  categoryId: string;
  postID: string;
}

const PostCard = ({
  postID,
  title,
  content,
  postImageUrl,
  Timestamp,
  authorId,
  categoryId,
}: PostData) => {
  const date = Timestamp as unknown as firebase.firestore.Timestamp;
  return (
    <Link href={`/posts/${postID}`}>
      <div className="p-5 rounded flex flex-col gap-2">
        <div className="relative">
          <div className="absolute  flex justify-end w-full p-3">
            <CategoryCard categoryId={categoryId} />
          </div>
          
          <Image
            src={postImageUrl!}
            alt="post-image"
            width={150}
            height={50}
            className="w-full"
          />
        </div>
        <h1 className="font-bold">{title}</h1>

        <div className="flex justify-between items-center">
          <AuthorCard authorId={authorId} />
          <h5 className="text-xs text-gray-500">
            {date.toDate().toLocaleDateString()}
          </h5>
        </div>
        
      </div>
    </Link>
  );
};

export default PostCard;
