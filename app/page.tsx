import { redirect } from 'next/navigation';

export default function HomePage() {
  // Mengarahkan pengunjung dari halaman utama (root) langsung ke halaman dashboard
  redirect('/dashboard');
}
