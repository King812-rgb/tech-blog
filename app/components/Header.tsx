"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Category } from "@/types/Category";
import { toUpperFirstChar } from "@/lib/toUpperFirst";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 py-6 bg-black">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tighter leading-none"
        >
          TSURE<span className="text-red-400 block">ZURE</span>
        </Link>

        {/* モバイルメニューボタン */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* デスクトップナビゲーション */}
        <nav className="hidden md:flex space-x-6 ml-auto cursor-pointer font-bold px-2 md:px-4 py-1">
          <Link href="/" className="hover:text-gray-400 transition">
            Home
          </Link>
          <Link
            href={`/categories/${Category.Issues}`}
            className="hover:text-gray-400 transition"
          >
            {toUpperFirstChar(Category.Issues)}
          </Link>
          <Link
            href={`/categories/${Category.Researches}`}
            className="hover:text-gray-400 transition"
          >
            {toUpperFirstChar(Category.Researches)}
          </Link>
          <Link
            href={`/categories/${Category.Others}`}
            className="hover:text-gray-400 transition"
          >
            {toUpperFirstChar(Category.Others)}
          </Link>
        </nav>
      </div>

      {/* モバイルナビゲーション */}
      {isMenuOpen && (
        <nav className="md:hidden fixed top-16 right-4 bg-black/90 p-4 rounded-lg shadow-lg z-50">
          <div className="space-y-4">
            <Link
              href="/"
              className="block hover:text-gray-400 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href={`/categories/${Category.Issues}`}
              className="block hover:text-gray-400 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              {toUpperFirstChar(Category.Issues)}
            </Link>
            <Link
              href={`/categories/${Category.Researches}`}
              className="block hover:text-gray-400 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              {toUpperFirstChar(Category.Researches)}
            </Link>
            <Link
              href={`/categories/${Category.Others}`}
              className="block hover:text-gray-400 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              {toUpperFirstChar(Category.Others)}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
