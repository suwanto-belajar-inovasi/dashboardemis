import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dashboard Pantauan EMIS | MIS Baiturrahman",
  description: "Sistem informasi pemantauan terpadu data siswa madrasah",
  icons: {
    icon: "https://lh3.googleusercontent.com/d/1t_n8TT2eR1zOXUMctvJtdW_TZos4Iy0u",
    apple: "https://lh3.googleusercontent.com/d/1t_n8TT2eR1zOXUMctvJtdW_TZos4Iy0u",
  },
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
