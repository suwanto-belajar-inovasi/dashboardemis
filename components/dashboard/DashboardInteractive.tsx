"use client";
import { useState } from "react";
import { Users, UserCheck, GraduationCap, School } from "lucide-react";
import StatCard from "./StatCards";
import StatistikKelasChart from "../charts/StatistikKelasChart";
import GenderPieChart from "../charts/GenderPieChart";

export default function DashboardInteractive({ data }: { data: any[] }) {
  const [selectedKelas, setSelectedKelas] = useState<string | null>(null);

  const totalSiswa = data.length;
  const siswaAktif = data.filter(s => s.Status?.toLowerCase() === "aktif").length;
  const siswaLaki = data.filter(s => s.JenisKelamin?.toLowerCase() === "laki-laki").length;
  const siswaPerempuan = totalSiswa - siswaLaki;

  const daftarKelas = Array.from(
    new Set(data.map(s => s.TingkatRombel ? s.TingkatRombel.split(" - ")[0] : "Lainnya"))
  ).sort();

  const filteredStudents = selectedKelas 
    ? data.filter(s => (s.TingkatRombel ? s.TingkatRombel.split(" - ")[0] : "Lainnya") === selectedKelas)
    : [];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* 4 Kartu Statistik Atas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Siswa" value={totalSiswa} icon={Users} color="bg-blue-600" />
        <StatCard title="Siswa Aktif" value={siswaAktif} icon={UserCheck} color="bg-emerald-500" />
        <StatCard title="Siswa Laki-laki" value={siswaLaki} icon={GraduationCap} color="bg-indigo-500" />
        <StatCard title="Siswa Perempuan" value={siswaPerempuan} icon={GraduationCap} color="bg-pink-500" />
      </div>

      {/* Area Grafik (Kiri: Batang Kelas, Kanan: Pie Gender) */}
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
        
        {/* Navigasi Kelas (Kiri) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-1 flex flex-col">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Pilih Kelas</h2>
          <div className="space-y-3 overflow-y-auto pr-1">
            {daftarKelas.map((kelas, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedKelas(kelas)}
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

        {/* Tabel Siswa (Kanan) */}
        <div className="lg:col-span-3">
          {selectedKelas ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-full">
              <div className="bg-blue-600 px-6 py-4 flex justify-between items-center">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5"/> Data Siswa: {selectedKelas}
                </h2>
                <button onClick={() => setSelectedKelas(null)} className="text-blue-100 hover:text-white bg-blue-700/50 px-3 py-1 rounded-lg text-sm font-medium transition-colors">Tutup</button>
              </div>
              <div className="overflow-x-auto">
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
                    {filteredStudents.map((siswa, idx) => (
                      <tr key={idx} className="border-b border-slate-100 hover:bg-blue-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium">{idx + 1}</td>
                        <td className="px-6 py-4 font-bold text-slate-900">{siswa.NamaLengkap || "-"}</td>
                        <td className="px-6 py-4 font-mono text-slate-500">{siswa.NISN?.replace(/'/g, "") || "-"}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${siswa.JenisKelamin?.toLowerCase() === 'laki-laki' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
                            {siswa.JenisKelamin?.toLowerCase() === "laki-laki" ? "L" : "P"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-500">{siswa.TingkatRombel || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 h-full min-h-[300px] flex flex-col items-center justify-center text-slate-400">
              <School className="w-12 h-12 mb-3 text-slate-300" />
              <p className="font-medium">Klik salah satu kelas di samping untuk melihat data siswa.</p>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
