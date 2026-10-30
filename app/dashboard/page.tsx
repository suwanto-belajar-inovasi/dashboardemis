import { fetchFromSpreadsheet } from "@/lib/spreadsheet";
import { Users, UserCheck, GraduationCap } from "lucide-react";
import StatCard from "@/components/dashboard/StatCards";
import StatistikKelasChart from "@/components/charts/StatistikKelasChart";

export default async function DashboardPage() {
  let data: any[] = [];
  let errorMsg = "";

  try {
    const response = await fetchFromSpreadsheet("GET_STUDENTS");
    if (response && response.data) data = response.data;
  } catch (error: any) {
    errorMsg = "Gagal mengambil data dari Spreadsheet.";
  }

  const totalSiswa = data.length;
  const siswaAktif = data.filter(s => s.Status?.toLowerCase() === "aktif").length;
  const siswaLaki = data.filter(s => s.JenisKelamin?.toLowerCase() === "laki-laki").length;
  const siswaPerempuan = totalSiswa - siswaLaki;

  return (
    <div className="p-4 md:p-8 space-y-8 bg-slate-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard Pantauan EMIS</h1>
        <p className="text-slate-500 mt-1">Sistem informasi data siswa terintegrasi.</p>
      </div>

      {errorMsg && (
        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg font-medium">{errorMsg}</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Siswa" value={totalSiswa} icon={Users} color="bg-blue-600" />
        <StatCard title="Siswa Aktif" value={siswaAktif} icon={UserCheck} color="bg-emerald-500" />
        <StatCard title="Siswa Laki-laki" value={siswaLaki} icon={GraduationCap} color="bg-indigo-500" />
        <StatCard title="Siswa Perempuan" value={siswaPerempuan} icon={GraduationCap} color="bg-pink-500" />
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Statistik Siswa per Tingkat</h2>
        <StatistikKelasChart data={data} />
      </div>
    </div>
  );
}
