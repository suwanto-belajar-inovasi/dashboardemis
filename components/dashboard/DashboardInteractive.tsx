"use client";

import { useState } from "react";
import { Users, UserCheck, GraduationCap, School } from "lucide-react";
import StatCard from "./StatCards";
import StatistikKelasChart from "../charts/StatistikKelasChart";

export default function DashboardInteractive({ data }: { data: any[] }) {
  const [selectedKelas, setSelectedKelas] = useState<string | null>(null);

  // Kalkulasi Statistik
  const totalSiswa = data.length;
  const siswaAktif = data.filter(s => s.Status?.toLowerCase() === "aktif").length;
  const siswaLaki = data.filter(s => s.JenisKelamin?.toLowerCase() === "laki-laki").length;
  const siswaPerempuan = totalSiswa - siswaLaki;

  // Mendapatkan daftar kelas unik
  const daftarKelas = Array.from(
    new Set(data.map(s => s.TingkatRombel ? s.TingkatRombel.split(" - ")[0] : "Lainnya"))
  ).sort();

  // Filter siswa berdasarkan kelas yang diklik
  const filteredStudents = selectedKelas 
    ? data.filter(s => (s.TingkatRombel ? s.TingkatRombel.split(" - ")[0] : "Lainnya") === selectedKelas)
    : [];

  return (
    <div className="space-y-8">
      {/* Grid Statistik Utama */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Siswa" value={totalSiswa} icon={Users} color="bg-blue-600" />
        <StatCard title="Siswa Aktif" value={siswaAktif} icon={UserCheck} color="bg-emerald-500" />
        <StatCard title="Siswa Laki-laki" value={siswaLaki} icon={GraduationCap} color="bg-indigo-500" />
        <StatCard title="Siswa Perempuan" value={siswaPerempuan} icon={GraduationCap} color="bg-pink-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bagian Grafik */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Statistik Siswa per Tingkat</h2>
          <StatistikKelasChart data={data} />
        </div>

        {/* Daftar Kelas yang Bisa Diklik */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Pilih Kelas</h2>
          <div className="space-y-3 flex-1 overflow-y-auto max-h-80">
            {daftarKelas.map((kelas, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedKelas(kelas)}
                className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${
                  selectedKelas === kelas 
                    ? "bg-blue-50 border-blue-500 text-blue-700 font-medium shadow-sm" 
                    : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <School className="w-5 h-5 opacity-70" />
                  <span>{kelas}</span>
                </div>
                <span className="bg-white px-2 py-1 text-xs rounded-md shadow-sm border">
                  {data.filter(s => (s.TingkatRombel ? s.TingkatRombel.split(" - ")[0] : "Lainnya") === kelas).length} Siswa
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabel Data Siswa (Muncul jika kelas diklik) */}
      {selectedKelas && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-blue-600 px-6 py-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">Data Siswa: {selectedKelas}</h2>
            <button onClick={() => setSelectedKelas(null)} className="text-blue-100 hover:text-white text-sm font-medium">Tutup Data (X)</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-700 uppercase font-semibold border-b">
                <tr>
                  <th className="px-6 py-4">No</th>
                  <th className="px-6 py-4">Nama Lengkap</th>
                  <th className="px-6 py-4">NISN</th>
                  <th className="px-6 py-4">L/P</th>
                  <th className="px-6 py-4">Rombel</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((siswa, idx) => (
                  <tr key={idx} className="border-b hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">{idx + 1}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{siswa.NamaLengkap || "-"}</td>
                    <td className="px-6 py-4">{siswa.NISN?.replace(/'/g, "") || "-"}</td>
                    <td className="px-6 py-4">{siswa.JenisKelamin === "Laki-laki" ? "L" : "P"}</td>
                    <td className="px-6 py-4">{siswa.TingkatRombel || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
