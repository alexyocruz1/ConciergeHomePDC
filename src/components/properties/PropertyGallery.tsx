"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  photos: string[];
  title: string;
};

export function PropertyGallery({ photos, title }: Props) {
  const safe = photos.length > 0 ? photos : ["/og-image-en.jpg"];
  const [index, setIndex] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-100">
        <Image
          src={safe[index] ?? safe[0]}
          alt={title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {safe.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-lg shadow"
              onClick={() => setIndex((i) => (i - 1 + safe.length) % safe.length)}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-lg shadow"
              onClick={() => setIndex((i) => (i + 1) % safe.length)}
            >
              ›
            </button>
          </>
        )}
      </div>
      {safe.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {safe.map((src, i) => (
            <button
              title={`View photo ${i + 1} of ${safe.length}`}
              key={src + i}
              type="button"
              onClick={() => setIndex(i)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 ${
                i === index ? "border-primary-600" : "border-transparent"
              }`}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="96px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
