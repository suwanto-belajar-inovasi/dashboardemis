import type { Metadata } from "next";
import "./globals.css";

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
      <body className="text-slate-800 bg-slate-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}
