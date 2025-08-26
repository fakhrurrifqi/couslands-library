"use client";

import { useState } from "react";
import type { GoogleBook } from "@/types/google-books";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchResults from "@/components/SearchResults";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GoogleBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchBooks = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setHasSearched(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Failed to fetch books");
      const data = await res.json();
      setResults(data.items || []);
    } catch (err) {
      console.error("Error fetching books:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Cousland&apos;s Library</h1>
      <div className="flex gap-2 mb-6">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchBooks()}
          placeholder="Search books..."
        />
        <Button onClick={searchBooks} disabled={loading}>
          {loading ? "Loading" : "Search"}
        </Button>
      </div>

      <div className="mt-6">
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-4 border rounded space-y-3">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-5 animate-pulse w-3/4" />
                <Skeleton className="h-4 animate-pulse w-1/2" />
              </div>
            ))}
          </div>
        )}

        {!loading && results.length > 0 && (
          <SearchResults books={results} loading={loading} />
        )}

        {!loading && hasSearched && results.length === 0 && (
          <p>No results found.</p>
        )}
      </div>
    </main>
  );
}
