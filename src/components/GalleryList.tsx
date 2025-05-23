// src/components/GalleryList.tsx
import { useEffect, useState } from "react";
import { fetchGallery } from "../services/api";

interface GalleryItem {
  _id: string;
  title: string;
  url: string;
  mediaType: "image" | "video";
  description: string;
}

export default function GalleryList() {
  const [mediaItems, setMediaItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    async function loadGallery() {
      const items = await fetchGallery();
      setMediaItems(items);
    }
    loadGallery();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {mediaItems.map((item: GalleryItem) => (
        <div key={item._id} className="rounded overflow-hidden shadow">
          <h3 className="font-bold p-2">{item.title}</h3>
          {item.mediaType === "image" ? (
            <img src={item.url} alt={item.title} className="w-full h-60 object-cover" />
          ) : (
            <video controls className="w-full h-60">
              <source src={item.url} type="video/mp4" />
            </video>
          )}
          <p className="text-sm p-2">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
