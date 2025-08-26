import React from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="hidden md:flex justify-between text-sm text-muted-foreground font-sans">
          <div>
            <p className="font-serif text-primary font-bold">
              Cousland&apos;s Library
            </p>
            <p className="mt-2">
              A timeless place for book, knowledge, and inspiration.
            </p>
          </div>
          <div className="flex gap-12">
            <div>
              <p className="font-semibold mb-2">Explore</p>
              <ul className="space-y-1">
                <li>
                  <Link href="/" className="hover:text-primary">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/library" className="hover:text-primary">
                    My Books
                  </Link>
                </li>
                <li>
                  <Link href="/quotes" className="hover:text-primary">
                    My Quotes
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">About</p>
              <ul className="space-y-1">
                <li>
                  <Link href="/about" className="hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <Accordion type="single" collapsible>
            <AccordionItem value="explore">
              <AccordionTrigger>Explore</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="hover:text-primary">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/library" className="hover:text-primary">
                      My Books
                    </Link>
                  </li>
                  <li>
                    <Link href="/quotes" className="hover:text-primary">
                      My Quotes
                    </Link>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="about">
              <AccordionTrigger>About</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1">
                  <li>
                    <Link href="/about" className="hover:text-primary">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-primary">
                      Contact
                    </Link>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Cousland&apos;s Library. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
