"use client";
import { useState } from "react";
import Image from "next/image";

export function ProductGallery({ images = [], alt = "Product image" }) {
  const [mainImage, setMainImage] = useState(images[0] || "/assets/products/placeholders/default.svg");

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-slate-100 shadow-inner">
        <Image
          src={mainImage}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain p-4 transition-opacity duration-300"
          priority
        />
      </div>
      
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setMainImage(img)}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition ${
                mainImage === img ? "border-sky-600 ring-2 ring-sky-100" : "border-transparent hover:border-slate-300"
              }`}
            >
              <Image
                src={img}
                alt={`${alt} ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
