import { fetchFromSpreadsheet } from "@/lib/spreadsheet";
import { Users, UserCheck, GraduationCap } from "lucide-react";
import StatCard from "@/components/dashboard/StatCards";
import StatistikKelasChart from "@/components/charts/StatistikKelasChart";

// Definisi Tipe berdasarkan struktur data EMIS yang disimpan di Spreadsheet
export interface Siswa {
  NISN: string;
  Status: string;
  JenisKelamin: string;
  TingkatRombel: string;
  // Anda bisa menambahkan field lain jika diperlukan nanti
}

export default async function DashboardPage() {
  let data: Siswa[] = [];
  let errorMsg = "";

  try {
    // Ambil data langsung dari server via GAS (TIDAK terekspos di browser pengguna)
    const response = await fetchFromSpreadsheet("GET_STUDENTS");
    if (response && response.data) {
      data = response.data;
    }
  } catch (error: any) {
    errorMsg = "Gagal mengambil data dari server. Pastikan URL dan Secret Key sudah benar.";
    console.error("Dashboard Fetch Error:", error);
  }

  // Kalkulasi Statistik Data
  const totalSiswa = data.length;
  const siswaAktif = data.filter(s => s.Status?.toLowerCase() === "aktif").length;
  const siswaLaki = data.filter(s => s.JenisKelamin?.toLowerCase() === "laki-laki").length;
  const siswaPerempuan = totalSiswa - siswaLaki;

  return (
    <div className="p-4 md:p-8 space-y-8 bg-slate-50 min-h-screen">
      {/* Header Dashboard */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard Pantauan EMIS</h1>
        <p className="text-slate-500 mt-1">Ringkasan statistik data siswa madrasah terintegrasi.</p>
      </div>

      {/* Pesan Error jika koneksi ke GAS gagal */}
      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
          <span className="font-medium">{errorMsg}</span>
        </div>
      )}

      {/* Grid Kartu Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Siswa" 
          value={totalSiswa} 
          icon={Users} 
          color="bg-blue-600" 
        />
        <StatCard 
          title="Siswa Aktif" 
          value={siswaAktif} 
          icon={UserCheck} 
          color="bg-emerald-500" 
        />
        <StatCard 
          title="Siswa Laki-laki" 
          value={siswaLaki} 
          icon={GraduationCap} 
          color="bg-indigo-500" 
        />
        <StatCard 
          title="Siswa Perempuan" 
          value={siswaPerempuan} 
          icon={GraduationCap} 
          color="bg-pink-500" 
        />
      </div>

      {/* Bagian Grafik Visualisasi */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-slate-800">Statistik Siswa per Tingkat</h2>
          <p className="text-sm text-slate-500">Perbandingan jumlah siswa laki-laki dan perempuan di setiap kelas.</p>
        </div>
        
        {/* Memanggil komponen Recharts (Client Component) dan mengirim data */}
        <StatistikKelasChart data={data} />
      </div>
    </div>
  );
}
