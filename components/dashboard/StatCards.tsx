import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color: string; // Contoh: "bg-blue-600"
}

export default function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-5 transition-all hover:shadow-md">
      {/* Ikon dengan latar belakang warna transparan */}
      <div className={`p-4 rounded-xl ${color} bg-opacity-10 flex items-center justify-center`}>
        {/* Mengambil warna dasar dari prop color untuk teks ikon */}
        <Icon className={`w-7 h-7 ${color.replace("bg-", "text-")}`} />
      </div>
      
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      </div>
    </div>
  );
}
