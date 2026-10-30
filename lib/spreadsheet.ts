export async function fetchFromSpreadsheet(action: string, payload: any = {}) {
  const url = process.env.GOOGLE_APPS_SCRIPT_URL!;
  const secret = process.env.GAS_SECRET_KEY!;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, action, payload }),
    cache: "no-store" // Memastikan data selalu baru
  });

  if (!response.ok) throw new Error("Gagal terhubung ke database");
  return response.json();
}
