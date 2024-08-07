"use client";
import useCollectionCount from "@/lib/firebase/count";
import React, { ReactNode } from "react";

const CountCard = ({
  path,
  name,
  icon,
}: {
  path?: string;
  name?: string;
  icon?: ReactNode;
}) => {
  const { data, isLoading, error } = useCollectionCount({ path: path || "" });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-blue-50 flex gap-2 items-center rounded px-4 py-2 ">
      {icon}
      <div>
        <h1 className="font-bold">{name}</h1>
        <p className="text-xl font-bold">{data}</p>
      </div>
    </div>
  );
};

export default CountCard;
