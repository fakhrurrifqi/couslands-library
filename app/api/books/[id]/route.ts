import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const numericId = Number(id);
    let deletedBook;

    if (!isNaN(numericId)) {
      deletedBook = await prisma.book.delete({
        where: { id: numericId },
      });
    } else {
      deletedBook = await prisma.book.delete({
        where: { googleId: id },
      });
    }
    return NextResponse.json(deletedBook);
  } catch (error) {
    console.error("DELETE book error:", error);
    return new NextResponse("Failed to delete book", { status: 500 });
  }
}
