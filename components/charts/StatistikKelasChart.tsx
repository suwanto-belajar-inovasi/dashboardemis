"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function StatistikKelasChart({ data }: { data: any[] }) {
  const chartData = data.reduce((acc, curr) => {
    const kelas = curr.TingkatRombel ? curr.TingkatRombel.split(" - ")[0] : "Lainnya";
    const found = acc.find((item: any) => item.nama === kelas);
    if (found) {
      curr.JenisKelamin?.toLowerCase() === "laki-laki" ? found.LakiLaki++ : found.Perempuan++;
    } else {
      acc.push({
        nama: kelas,
        LakiLaki: curr.JenisKelamin?.toLowerCase() === "laki-laki" ? 1 : 0,
        Perempuan: curr.JenisKelamin?.toLowerCase() !== "laki-laki" ? 1 : 0,
      });
    }
    return acc;
  }, []).sort((a: any, b: any) => a.nama.localeCompare(b.nama));

  if (!chartData.length) return <div className="h-64 flex items-center justify-center">Belum ada data</div>;

  return (
    <div className="h-80 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="nama" axisLine={false} tickLine={false} dy={10} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip cursor={{ fill: "#f8fafc" }} />
          <Legend wrapperStyle={{ paddingTop: "20px" }} />
          <Bar dataKey="LakiLaki" name="Laki-laki" fill="#6366f1" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Perempuan" name="Perempuan" fill="#ec4899" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
