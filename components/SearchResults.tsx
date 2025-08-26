"use client";

import { GoogleBook, BookToSave } from "@/types/google-books";
import BookCard from "@/components/BookCard";
import { useEffect, useState } from "react";
import { removeBook, saveBook } from "@/lib/bookActions";
import RemoveBookDialog from "./RemoveBookDialog";
import SaveBookButton from "./SaveBookButton";

interface SearchResultsProps {
  books: GoogleBook[];
  loading: boolean;
}

function SearchResults({ books, loading }: SearchResultsProps) {
  const [savedBooks, setSavedBooks] = useState<string[]>([]);

  useEffect(() => {
    const fetchSaved = async () => {
      const res = await fetch("/api/books");
      if (res.ok) {
        const data = await res.json();
        setSavedBooks(data.map((b: BookToSave) => b.googleId));
      }
    };
    fetchSaved();
  }, []);

  const handleSave = async (book: GoogleBook) => {
    const bookToSave: BookToSave = {
      googleId: book.id,
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors?.join(", ") || "Unknown",
      coverUrl: book.volumeInfo.imageLinks?.thumbnail || "",
      description: book.volumeInfo.description || "",
    };
    try {
      const saved = await saveBook(bookToSave);
      setSavedBooks((prev) => [...prev, saved.googleId]);
    } catch (err) {
      console.error("Save Failed", err);
    }
  };

  const handleRemove = async (googleId: string) => {
    try {
      const removed = await removeBook(googleId);
      setSavedBooks((prev) => prev.filter((id) => id !== removed.googleId));
    } catch (err) {
      console.error("Save Failed", err);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!loading && books.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-6 gap-4 items-stretch">
      {books.map((book) => {
        const isSaved = savedBooks.includes(book.id);

        return (
          <div key={book.id} className="flex flex-col">
            <BookCard
              id={book.id}
              title={book.volumeInfo.title}
              author={book.volumeInfo.authors?.join(", ")}
              coverUrl={book.volumeInfo.imageLinks?.thumbnail}
              description={book.volumeInfo.description}
              action={isSaved ? (
                <RemoveBookDialog
                  title={book.volumeInfo.title}
                  onConfirm={() => handleRemove(book.id)}
                  triggerLabel="Remove From Library"
                />
              ) : (
                <SaveBookButton book={book} onSaved={() => handleSave(book)} />
              )}
            />
          </div>
        );
      })}
    </div>
  );
}

export default SearchResults;
