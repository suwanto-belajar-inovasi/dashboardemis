import { fetchFromSpreadsheet } from "../../lib/spreadsheet";
import DashboardInteractive from "../../components/dashboard/DashboardInteractive";

export default async function DashboardPage() {
  let data: any[] = [];
  let errorMsg = "";

  try {
    const response = await fetchFromSpreadsheet("GET_STUDENTS");
    if (response && response.data) data = response.data;
  } catch (error: any) {
    errorMsg = "Gagal mengambil data dari Spreadsheet.";
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard Pantauan EMIS</h1>
        <p className="text-slate-500 mt-2">Sistem informasi pemantauan terpadu data siswa madrasah.</p>
      </div>

      {errorMsg && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded shadow-sm font-medium">
          {errorMsg}
        </div>
      )}

      {/* Memanggil Komponen Klien yang Berisi Logika Interaktif */}
      {!errorMsg && <DashboardInteractive data={data} />}
    </div>
  );
}
