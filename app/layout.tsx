import type { Metadata } from "next";
import "./globals.css"; // Panggilan CSS

export const metadata: Metadata = {
  title: "Dashboard Pantauan EMIS",
  description: "Sistem informasi data siswa madrasah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="text-slate-900 bg-slate-50">{children}</body>
    </html>
  );
}
