"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { saveBook, removeBook } from "@/lib/bookActions";
import { toast } from "sonner";
import RemoveBookDialog from "@/components/RemoveBookDialog";

interface BookDetailActionsProps {
  id: string;
  source: "db" | "api";
  book: {
    googleId?: string;
    title: string;
    author?: string;
    coverUrl?: string;
    description?: string;
  };
}

function BookDetailActions({ id, source, book }: BookDetailActionsProps) {
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(source === "db");

  const save = async () => {
    setLoading(true);
    try {
      await saveBook({ ...book, googleId: id });
      toast("Saved", {
        description: `"${book.title}" was added to your library`,
      });
      window.location.reload();
      setIsSaved(true);
    } catch (err) {
      toast("Error", { description: "Failed to save book." });
      console.error("Failed to save book:", err);
    } finally {
      setLoading(false);
    }
  };

  const remove = async () => {
    setLoading(true);
    try {
      await removeBook(id);
      toast("Removed", {
        description: `"${book.title}" was removed from your library`,
      });
      window.location.href = "/library";
      setIsSaved(false);
    } catch (err) {
      toast("Error", { description: "Failed to remove book." });
      console.error("Failed to remove book:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-4">
      {isSaved ? (
        <RemoveBookDialog title={book.title} onConfirm={remove} />
      ) : (
        <Button onClick={save} disabled={loading} className="cursor-pointer">
          {loading ? "Saving..." : "Save to Library"}
        </Button>
      )}
    </div>
  );
}

export default BookDetailActions;
