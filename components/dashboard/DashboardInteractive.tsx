"use client";
import { useState, useMemo } from "react";
import { Users, UserCheck, GraduationCap, School, Search } from "lucide-react";
import StatCard from "./StatCards";
import StatistikKelasChart from "../charts/StatistikKelasChart";
import GenderPieChart from "../charts/GenderPieChart";

export default function DashboardInteractive({ data }: { data: any[] }) {
  const [selectedKelas, setSelectedKelas] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Kalkulasi Statistik
  const totalSiswa = data.length;
  const siswaAktif = data.filter(s => String(s.Status || "").toLowerCase() === "aktif").length;
  const siswaLaki = data.filter(s => String(s.JenisKelamin || "").toLowerCase() === "laki-laki").length;
  const siswaPerempuan = totalSiswa - siswaLaki;

  // Mendapatkan daftar kelas unik (mencegah error jika data kosong)
  const daftarKelas = Array.from(
    new Set(data.map(s => s.TingkatRombel ? String(s.TingkatRombel).split(" - ")[0] : "Lainnya"))
  ).sort();

  // Memfilter siswa berdasarkan Kelas yang diklik DAN Pencarian (Nama/NISN/Kelas)
  const filteredStudents = useMemo(() => {
    let filtered = selectedKelas 
      ? data.filter(s => (s.TingkatRombel ? String(s.TingkatRombel).split(" - ")[0] : "Lainnya") === selectedKelas)
      : [];

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        s => 
          String(s.NamaLengkap || "").toLowerCase().includes(query) ||
          String(s.NISN || "").toLowerCase().includes(query) ||
          String(s.TingkatRombel || "").toLowerCase().includes(query) // Tambahan pencarian Rombel/Kelas
      );
    }
    return filtered;
  }, [data, selectedKelas, searchQuery]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* IDENTITAS MADRASAH DENGAN LOGO BARU */}
      <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 bg-gradient-to-r from-blue-50 to-white">
        <div className="flex items-center gap-4">
          {/* Logo Madrasah (Menggunakan tag img standar agar tidak perlu config next.config.js) */}
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 p-1 overflow-hidden shrink-0">
            <img 
              src="https://lh3.googleusercontent.com/d/1t_n8TT2eR1zOXUMctvJtdW_TZos4Iy0u" 
              alt="Logo MIS Baiturrahman" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-900 flex items-center gap-2">
              MIS BAITURRAHMAN GUBENG
            </h2>
            <div className="flex flex-wrap gap-2 md:gap-4 mt-2 text-sm font-semibold text-slate-600">
              <span className="bg-white px-3 py-1 rounded-md border border-slate-200 shadow-sm">NSM: 111235780024</span>
              <span className="bg-white px-3 py-1 rounded-md border border-slate-200 shadow-sm">NPSN: 60720893</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500 font-medium">Status Sinkronisasi</p>
          <p className="text-emerald-600 font-bold flex items-center gap-1 justify-end">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Terhubung EMIS
          </p>
        </div>
      </div>

      {/* 4 Kartu Statistik Atas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Siswa" value={totalSiswa} icon={Users} color="bg-blue-600" />
        <StatCard title="Siswa Aktif" value={siswaAktif} icon={UserCheck} color="bg-emerald-500" />
        <StatCard title="Siswa Laki-laki" value={siswaLaki} icon={GraduationCap} color="bg-indigo-500" />
        <StatCard title="Siswa Perempuan" value={siswaPerempuan} icon={GraduationCap} color="bg-pink-500" />
      </div>

      {/* Area Grafik */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-800">Distribusi Siswa per Tingkat</h2>
          <StatistikKelasChart data={data} />
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 text-center">Komposisi Gender</h2>
          <GenderPieChart data={data} />
        </div>
      </div>

      {/* Area Pilihan Kelas & Tabel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Navigasi Kelas */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-1 flex flex-col">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Pilih Kelas</h2>
          <div className="space-y-3 overflow-y-auto pr-1 max-h-[500px]">
            {daftarKelas.map((kelas, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedKelas(kelas);
                  setSearchQuery(""); // Reset pencarian saat ganti kelas
                }}
                className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedKelas === kelas 
                    ? "bg-blue-50 border-blue-500 text-blue-700 shadow-md" 
                    : "bg-white border-transparent hover:border-slate-300 text-slate-600 bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3 font-semibold">
                  <School className="w-5 h-5" />
                  <span>{kelas}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tabel Siswa */}
        <div className="lg:col-span-3">
          {selectedKelas ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col min-h-[500px]">
              
              {/* Header Tabel & Input Pencarian */}
              <div className="bg-blue-600 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5"/> Data Siswa: {selectedKelas}
                </h2>
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* Kolom Pencarian */}
                  <div className="relative flex-1 sm:w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Cari Nama, NISN, Rombel..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-lg leading-5 bg-blue-700 text-white placeholder-blue-300 focus:outline-none focus:bg-white focus:text-slate-900 focus:placeholder-slate-400 sm:text-sm transition-colors"
                    />
                  </div>
                  
                  <button onClick={() => setSelectedKelas(null)} className="text-blue-100 hover:text-white bg-blue-700/80 px-3 py-2 rounded-lg text-sm font-medium transition-colors border border-blue-500 shrink-0">
                    Tutup
                  </button>
                </div>
              </div>

              {/* Tabel */}
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4">No</th>
                      <th className="px-6 py-4">Nama Lengkap</th>
                      <th className="px-6 py-4">NISN</th>
                      <th className="px-6 py-4 text-center">L/P</th>
                      <th className="px-6 py-4">Rombel</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((siswa, idx) => (
                        <tr key={idx} className="border-b border-slate-100 hover:bg-blue-50/50 transition-colors">
                          <td className="px-6 py-4 font-medium">{idx + 1}</td>
                          <td className="px-6 py-4 font-bold text-slate-900">{siswa.NamaLengkap || "-"}</td>
                          {/* Konversi ke String yang aman untuk mencegah error replace */}
                          <td className="px-6 py-4 font-mono text-slate-500">{String(siswa.NISN || "-").replace(/'/g, "")}</td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${String(siswa.JenisKelamin || "").toLowerCase() === 'laki-laki' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
                              {String(siswa.JenisKelamin || "").toLowerCase() === "laki-laki" ? "L" : "P"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-500">{siswa.TingkatRombel || "-"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                          Tidak ada siswa yang cocok dengan pencarian "{searchQuery}" di {selectedKelas}.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 h-full min-h-[500px] flex flex-col items-center justify-center text-slate-400">
              <School className="w-16 h-16 mb-4 text-slate-300" />
              <p className="font-medium text-lg text-slate-500">Pilih Kelas</p>
              <p className="text-sm mt-1">Klik salah satu kelas di samping kiri untuk menampilkan data siswa.</p>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
