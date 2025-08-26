import { BookToSave } from "@/types/google-books";
import { toast } from "sonner";

export async function saveBook(book: BookToSave) {
  const res = await fetch(`/api/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });

  if (!res.ok) throw new Error("Failed to save book");
  return res.json();
}

export async function removeBook(id: number | string) {
  try {
    const res = await fetch(`/api/books/${id}`, { method: "DELETE" });

    if (!res.ok) throw new Error("Failed to remove book");
    const data = await res.json();

    toast("Removed", {
      description: `"${data.title}" was removed from your library.`,
    });
    return data;
  } catch (err) {
    console.error("Remove Error:", err);
    toast("Error", { description: "Failed to remove book" });
    throw err;
  }
}
