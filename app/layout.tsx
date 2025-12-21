import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Diecast Collection",
  description: "Vintage Hot Wheels and Matchbox diecast cars from the 1970s and 1980s",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-200 leading-relaxed">
        <header className="bg-gray-100 dark:bg-neutral-800 border-b border-gray-200 dark:border-neutral-700 px-8 py-4">
          <div className="max-w-[1200px] mx-auto">
            <h1 className="text-2xl font-bold">
              <Link href="/" className="hover:text-red-600">
                Diecast Collection
              </Link>
            </h1>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
