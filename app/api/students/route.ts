import { NextResponse } from "next/server";
import { fetchFromSpreadsheet } from "../../../lib/spreadsheet";
export async function GET(request: Request) {
  try {
    // Validasi session token disini (Pastikan user sudah login via lib/auth.ts)
    const data = await fetchFromSpreadsheet("GET_STUDENTS");
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
