import { notFound } from "next/navigation";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import BookDetailActions from "./BookDetailActions";
import type { BookSource } from "@/types/google-books";

interface BookDetailProps {
  params: { id: string };
}

const prisma = new PrismaClient();

async function getBook(id: string): Promise<BookSource | null> {
    let dbBook = null;

    if (!isNaN(Number(id))) {
        dbBook = await prisma.book.findUnique({
          where: { id: Number(id) },
        });
    }

    if (!dbBook) {
    dbBook = await prisma.book.findFirst({
      where: { googleId: id },
    });
  }


  if (dbBook) {
    return { source: "db", book: dbBook };
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${id}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    return { source: "api", book: data };
  } catch {
    return null;
  }
}

async function BookDetailPage({ params }: BookDetailProps) {
  const { id } = await params;
  const bookData = await getBook(id);
  if (!bookData) return notFound();

  const { source, book } = bookData;

  const title =
    source === "db" ? book.title : book.volumeInfo?.title ?? "Unknown Title";
  const author =
    source === "db"
      ? book.author
      : book.volumeInfo?.authors?.join(", ") ?? "Unknown author";
  const coverUrl =
    source === "db" ? book.coverUrl : book.volumeInfo?.imageLinks?.thumbnail;
  const description =
    source === "db" ? book.description : book.volumeInfo?.description;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {coverUrl && (
          <Image
            src={coverUrl}
            alt={title}
            width={200}
            height={300}
            className="rounded-md object-contain shadow"
          />
        )}

        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-lg text-muted-foreground">{author}</p>

          <BookDetailActions
            id={id}
            source={source}
            book={{
              title,
              author: author ?? undefined,
              coverUrl: coverUrl ?? undefined,
              description: description ?? undefined,
            }}
          />
        </div>
      </div>

      {description && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      )}
    </div>
  );
}

export default BookDetailPage;
