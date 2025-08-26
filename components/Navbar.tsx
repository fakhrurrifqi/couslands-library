"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm shadow-sm">
      <nav className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="font-serif text-xl font-bold text-primary">
          Cousland&apos;s Library
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden md:flex items-center gap-6 ml-4">
            <Link href="/" className="text-sm font-sans hover:text-primary">
              Home
            </Link>
            <Link
              href="/library"
              className="text-sm font-sans hover:text-primary"
            >
              My Books
            </Link>
            <Link
              href="/quotes"
              className="text-sm font-sans hover:text-primary"
            >
              My Quotes
            </Link>
            <Button variant="outline" size="sm">
              Login
            </Button>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="size-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-128 p-6" side="right">
                <SheetHeader>
                  <SheetTitle className="font-serif text-lg text-center text-primary">
                    Cousland&apos;s Library
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-4 flex flex-col gap-4 font-sans">
                  <Link href="/" className="hover:text-primary">
                    Home
                  </Link>
                  <Link href="/library" className="hover:text-primary">
                    My Books
                  </Link>
                  <Link href="/quotes" className="hover:text-primary">
                    My Quotes
                  </Link>
                  <Button variant="outline" className="mt-4">
                    Login
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
