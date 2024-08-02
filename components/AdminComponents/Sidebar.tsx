import React from "react";

import Link from "next/link";
import { Layers2, LayoutDashboard, LayoutList, User2 } from "lucide-react";
import { LinkItem } from "@/components/AdminComponents/adminTypes";

const Sidebar = () => {
  const adminlinks: LinkItem[] = [
    {
      name: "Dashboard",
      link: "/admin",
      icon: <LayoutDashboard />,
    },
    {
      name: "Posts",
      link: "/admin/posts",
      icon: <LayoutList />,
    },
    {
      name: "Categories",
      link: "/admin/categories",
      icon: <Layers2 />,
    },
    {
      name: "Authors",
      link: "/admin/authors",
      icon: <User2 />,
    },
  ];
  return (
    <section className="w-52 border-r h-screen p-6">
      <ul className="flex flex-col w-full gap-5 ">
        {adminlinks.map((link, index) => {
          return (
            <Link key={index} href={link.link}>
              <li className="flex gap-3 items-center bg-blue-50 rounded-full px-4 py-2 ">
                {link.icon}
                <span className="font-bold">{link.name}</span>
              </li>
            </Link>
          );
        })}
      </ul>
    </section>
  );
};

export default Sidebar;
