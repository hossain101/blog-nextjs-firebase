import CountCard from "@/components/CountCard";
import { List, PersonStanding, StickyNote } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <main className="p-10">
      <div className="flex gap-4">

      <CountCard icon={<StickyNote />} name="Post" path="posts" />
      <CountCard icon={<PersonStanding />} name="Authors" path="authors" />
      <CountCard icon={<List />} name="Categories" path="categories" />
      </div>
    </main>
  );
};

export default page;
