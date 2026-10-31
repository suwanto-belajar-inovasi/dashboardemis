import type { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}
