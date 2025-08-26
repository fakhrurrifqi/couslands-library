"use client";

import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import BookCard from "@/components/BookCard";
import { removeBook } from "@/lib/bookActions";
import RemoveBookDialog from "@/components/RemoveBookDialog";

interface BookPageProps {
  id: number;
  title: string;
  author?: string;
  coverUrl?: string;
  description?: string;
}

function LibraryPage() {
  const [books, setBooks] = useState<BookPageProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`/api/books`);
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error("Failed to fetch books:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleRemove = async (id: number | string) => {
    try {
      const removed = await removeBook(id);
      setBooks((prev) => prev.filter((book) => book.id !== removed.id));
    } catch (err) {
      console.error("Failed to remove book:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">My Library</h1>

      {loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      )}

      {!loading && books.length === 0 && <p>No books saved yet.</p>}

      {!loading && books.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book.id} className="flex flex-col">
              <BookCard
                id={book.id}
                title={book.title}
                author={book.author}
                coverUrl={book.coverUrl}
                description={book.description}
                action={
                  <RemoveBookDialog
                    title={book.title}
                    onConfirm={() => handleRemove(book.id)}
                  />
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LibraryPage;
