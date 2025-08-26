"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface BookPageProps {
  id?: number | string;
  title: string;
  author?: string;
  coverUrl?: string;
  description?: string;
  action?: ReactNode;
}

export default function BookCard({
  id,
  title,
  author,
  coverUrl,
  description,
  action,
}: BookPageProps) {
  return (
    <div className="flex flex-col bg-card rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-300 overflow-hidden h-full cursor-pointer">
      <Link href={`/books/${id}`} className="flex flex-col flex-1">
        <div className="relative w-full h-48 md:h-56 bg-gray-100">
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt={title}
              fill
              className="object-contain size-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              No cover
            </div>
          )}
        </div>

        <div className="flex flex-col p-4 grow">
          <h2 className="text-lg font-semibold mb-1 line-clamp-2">{title}</h2>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
            {author || "Unknown"}
          </p>

          <p className="text-sm line-clamp-3 text-muted-foreground grow mb-3">
            {description || "No description available."}
          </p>
        </div>
      </Link>
      <div className="mt-auto p-4">{action}</div>
    </div>
  );
}
