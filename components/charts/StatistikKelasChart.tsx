"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface Siswa {
  TingkatRombel: string;
  JenisKelamin: string;
}

interface StatistikKelasChartProps {
  data: Siswa[];
}

export default function StatistikKelasChart({ data }: StatistikKelasChartProps) {
  // Mengolah data mentah menjadi format yang diterima Recharts
  const olahDataGrafik = () => {
    const rekap: Record<string, { nama: string; LakiLaki: number; Perempuan: number }> = {};

    data.forEach((siswa) => {
      // Mengambil "Kelas 1", "Kelas 2", dst dari string panjang jika ada
      const kelas = siswa.TingkatRombel ? siswa.TingkatRombel.split(" - ")[0] : "Tidak Diketahui";
      
      if (!rekap[kelas]) {
        rekap[kelas] = { nama: kelas, LakiLaki: 0, Perempuan: 0 };
      }

      if (siswa.JenisKelamin?.toLowerCase() === "laki-laki") {
        rekap[kelas].LakiLaki += 1;
      } else {
        rekap[kelas].Perempuan += 1;
      }
    });

    // Mengubah object menjadi array dan mengurutkannya
    return Object.values(rekap).sort((a, b) => a.nama.localeCompare(b.nama));
  };

  const chartData = olahDataGrafik();

  if (chartData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-slate-400">
        Belum ada data untuk ditampilkan
      </div>
    );
  }

  return (
    <div className="h-80 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="nama" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#64748b", fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#64748b", fontSize: 12 }} 
          />
          <Tooltip 
            cursor={{ fill: "#f8fafc" }}
            contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
          />
          <Legend iconType="circle" wrapperStyle={{ paddingTop: "20px" }} />
          <Bar dataKey="LakiLaki" name="Laki-laki" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={40} />
          <Bar dataKey="Perempuan" name="Perempuan" fill="#ec4899" radius={[4, 4, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
