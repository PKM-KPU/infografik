import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export async function GET() {
  try {
    const kabupatenData = await prisma.kabupaten.findMany({
      select: {
        id: true,
        nama: true,
      },
    });
    const rekapData = await prisma.tes_rekap.findMany({
      select: {
        kode_wilayah: true,
        tps: true,
        l: true,
        p: true,
      },
    });

    rekapData.forEach(item => {
      const kabupaten = kabupatenData.find(kab => kab.id === item.kode_wilayah);
      item.nama_kabupaten = kabupaten?.nama || '';
    });


    const result = rekapData
      .filter(item => item.kode_wilayah && item.kode_wilayah.length === 4)
      .map(item => ({
        ...item,
        lp: item.l + item.p,
      }));

    console.log(result);

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
