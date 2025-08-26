import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const allBooks = await prisma.book.findMany();
  return Response.json(allBooks);
}
