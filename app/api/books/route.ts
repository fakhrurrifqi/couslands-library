import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const books = await prisma.book.findMany({
    orderBy: { createdAt: "desc" },
  });
  return Response.json(books);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { googleId, title, author, coverUrl, description } = body;

    const book = await prisma.book.upsert({
      where: { googleId },
      update: {},
      create: {
        googleId,
        title,
        author,
        coverUrl,
        description,
        userId: 1,
      },
    });
    return NextResponse.json(book);
  } catch (error) {
    console.error("Save book error:", error);
    return new NextResponse("Failed to save book", { status: 500 });
  }
}
