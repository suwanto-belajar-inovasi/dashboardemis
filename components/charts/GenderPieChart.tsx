"use client";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function GenderPieChart({ data }: { data: any[] }) {
  const laki = data.filter((d) => d.JenisKelamin?.toLowerCase() === "laki-laki").length;
  const perempuan = data.length - laki;

  const chartData = [
    { name: "Laki-laki", value: laki },
    { name: "Perempuan", value: perempuan },
  ];
  const COLORS = ["#3b82f6", "#ec4899"]; // Biru dan Pink

  if (data.length === 0) return <div className="h-64 flex items-center justify-center">Tidak ada data</div>;

  return (
    <div className="h-72 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
