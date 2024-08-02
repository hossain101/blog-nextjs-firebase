import { getAuthor } from '@/lib/firebase/author/read_server';
import Image from 'next/image';
import React from 'react'

const AuthorCard = async ({ authorId }: { authorId: string }) => {
    const authorData = await getAuthor(authorId);
  
    return (
      <div className="p-5 rounded flex gap-3 items-center">
        <Image
          src={authorData?.authorPhotoURL}
          alt="author-image"
          width={150}
          height={50}
          className="rounded-full h-5 w-6 object-cover"
        />
        <h1 className="font-bold text-sm text-gray-500">{authorData?.name}</h1>
        <h5 className="text-xs text-gray-500">{authorData?.email}</h5>
      </div>
    );
  };

export default AuthorCard