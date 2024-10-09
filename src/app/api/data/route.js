import { NextResponse } from 'next/server';

import db from '@/libs/db';

export async function GET(request) {
  try {
    // Query data dari database
    const [rows] = await db.query('SELECT * FROM dpt');

    // Log hasil query untuk debugging
    console.log('Query Result:', rows);

    // Kirim data sebagai respons JSON
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Database Error:', error.message);

    return NextResponse.json({ error: 'Terjadi kesalahan saat mengambil data' }, { status: 500 });
  }
}
