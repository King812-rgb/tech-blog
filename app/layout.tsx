import type { Metadata } from "next";
import "./global.css";
import "prismjs/themes/prism-tomorrow.css";
import { Header } from "./components/Header";

export const metadata: Metadata = {
  title: "Tech Blog",
  description: "技術ブログ",
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="container bg-black text-white mx-auto px-4 md:px-6">
        <Header />
        <div>{children}</div>
      </body>
    </html>
  );
}
