"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { GoogleBook } from "@/types/google-books";

interface SaveBookButtonProps {
  book: GoogleBook;
  onSaved?: () => void;
}

const SaveBookButton = ({ book, onSaved }: SaveBookButtonProps) => {
  const [loading, setLoading] = useState(false);

  const saveBook = async () => {
    try {
      const res = await fetch(`/api/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          googleId: book.id,
          title: book.volumeInfo.title,
          author: book.volumeInfo.authors?.join(", ") || "Unknown",
          coverUrl: book.volumeInfo.imageLinks?.thumbnail || "",
          description: book.volumeInfo.description,
        }),
      });

      if (res.ok) {
        toast("Saved", {
          description: `"${book.volumeInfo.title}" was added to your library.`,
        });
        onSaved?.();
      } else {
        toast("Failed to save", {
          description: "Could not save the book. Try again later.",
        });
      }
    } catch (err) {
      console.error("Save Error:", err);
      toast("Error", {
        description: "Something went wrong while saving the book.",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        saveBook();
      }}
      disabled={loading}
      className="w-full"
    >
      {loading ? "Saving..." : "Save to Library"}
    </Button>
  );
};

export default SaveBookButton;
