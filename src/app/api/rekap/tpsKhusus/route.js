import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export async function GET() {
  try {
    const tpsKhusus = await prisma.tps_khusus.findMany();
    if (!Array.isArray(tpsKhusus) || tpsKhusus.length === 0) {
      return NextResponse.json({ message: 'No data found' }, { status: 404 });
    }

    const result = tpsKhusus.reduce((acc, item) => acc + item.tps, 0);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching TPS Khusus data:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
