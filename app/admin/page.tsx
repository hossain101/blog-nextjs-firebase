import CountCard from "@/components/CountCard";
import { StickyNote } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <main>
      <CountCard icon={<StickyNote />} name="post" path="post" />
    </main>
  );
};

export default page;
