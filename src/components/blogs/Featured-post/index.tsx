"use client"

import { Blog } from "@/utils/types";
import FeaturedDesign from "../Featured-Post-Design";
import { useEffect } from "react";
import {useRouter} from 'next/navigation'

export default function Featured({ lists }: { lists: Blog[] }) {
  const router = useRouter();

  useEffect(() => {
    router.refresh()
}, [router]); // Add 'router' to the dependency array


    async function handleDelete(id: number) {
      console.log(id);
    
      if (typeof window !== 'undefined') {
        // Client-side logic
        const res = await fetch(`/api/blog-post/delete-post?id=${id}`, {
          method: "DELETE",
          cache: "no-store",
        });
    
        const data = await res.json();
    
        if (data && data.success) router.refresh();
      } else {
        // Server-side logic or skip during static generation
        console.log("Running on the server or during static generation.");
      }
    }
    
    
    

  return (
    <section className="py-[120px]">
      <div className="container">
      {
          lists && lists.length
            ? lists.map((listItem: Blog) => (
                <div className="" key={listItem.id}>
                  <FeaturedDesign handleDelete={handleDelete} blogitem={listItem} />
                </div>
              ))
            : null
            }
      </div>
    </section>
  )
}