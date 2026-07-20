import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Publish Flow｜地域サイト公開・鮮度管理",
  description: "地域型ページの審査、公開、情報鮮度、修正、停止を一元管理する編集運用ツール。",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="ja"><body>{children}</body></html>;
}
