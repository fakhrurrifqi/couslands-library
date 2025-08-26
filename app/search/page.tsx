"use client";

import React, { useState } from "react";
import { GoogleBook } from "@/types/google-books";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GoogleBook[]>([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Failed to fetch books");
      const data = await res.json();
      setResults(data.items || []);
    } catch (err) {
      console.error("Error fetching books:", err);
    } finally {
      setLoading(false);
    }
  };

  const saveBook = async (book: GoogleBook) => {
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
          isbn: book.volumeInfo.industryIdentifiers?.[0]?.identifier,
        }),
      });

      if (res.ok) {
        alert("Book saved!");
      } else {
        alert("Failed to save book");
      }
    } catch (err) {
      console.error("Save Error:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Search Booksy</h1>
      <div className="flex gap-2 mb-6">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchBooks()}
          placeholder="Search books..."
        />
        <Button onClick={searchBooks} className="px-4 py-2">
          Search
        </Button>
      </div>

      {loading && <p>Loading...</p>}
      <ul className="space-y-4">
        {results.map((book) => (
          <li
            key={book.id}
            className="flex items-center gap-4 border p-4 rounded-lg shadow"
          >
            {book.volumeInfo.imageLinks?.thumbnail && (
              <Image
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
                className="w-16 h-24 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <h2 className="font-semibold">{book.volumeInfo.title}</h2>
              <p className="text-sm text-gray-600">
                {book.volumeInfo.authors?.join(", ")}
              </p>
            </div>
            <Button
              onClick={() => saveBook(book)}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchPage;
