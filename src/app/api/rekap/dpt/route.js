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

    const kecamatanData = await prisma.kecamatan.findMany({
      select: {
        id: true,
        nama: true,
        kab_id: true,
      },
    });

    const kelurahanData = await prisma.kelurahan.findMany({
        select: {
            id: true,
            nama: true,
            kecamatan_id: true,
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
      const kabupaten = kabupatenData.find(kab => kab.id === item.kode_wilayah.substring(0, 4));
      item.nama_kabupaten = kabupaten?.nama || '';

      const kecamatan = kecamatanData.find(kec => kec.id === item.kode_wilayah.substring(0, 6));
      item.nama_kecamatan = kecamatan?.nama || '';

      const kelurahan = kelurahanData.find(kel => kel.id === item.kode_wilayah.substring(0, 10));
      item.nama_kelurahan = kelurahan?.nama || '';
    });


    const rekap_kabupaten = rekapData
      .filter(item => item.kode_wilayah && item.kode_wilayah.length === 4)
      .map(item => ({
        ...item,
        lp: item.l + item.p,
      }));


    const rekap_kecamatan = rekapData
      .filter(item => item.kode_wilayah && item.kode_wilayah.length === 6)
      .map(item => ({
        ...item,
        lp: item.l + item.p,
      }));


    const rekap_kelurahan = rekapData
      .filter(item => item.kode_wilayah && item.kode_wilayah.length === 10)
      .map(item => ({
        ...item,
        lp: item.l + item.p,
      }));


    const kabupatenSummaries = kabupatenData.map(kabupaten => {
      const filteredRekap = rekapData.filter(item => item.kode_wilayah.startsWith(kabupaten.id));

      const jumlahKecamatan = new Set(
        filteredRekap.map(item => item.kode_wilayah.substring(0, 6))
      ).size;

      const jumlahKelurahan = new Set(
        filteredRekap.map(item => item.kode_wilayah.substring(0, 10))
      ).size;

      const totalTPS = filteredRekap.reduce((acc, item) => acc + item.tps, 0);
      const totalL = filteredRekap.reduce((acc, item) => acc + item.l, 0);
      const totalP = filteredRekap.reduce((acc, item) => acc + item.p, 0);
      const totalLP = totalL + totalP;

      return {
        name: kabupaten.nama,
        jumlah_kecamatan: jumlahKecamatan,
        jumlah_kelurahan: jumlahKelurahan,
        tps: totalTPS,
        l: totalL,
        p: totalP,
        lp: totalLP,
      };
    });


    const kecamatanSummaries = kecamatanData.map(kecamatan => {
      const filteredRekap = rekapData.filter(item => item.kode_wilayah.startsWith(kecamatan.id));

      const jumlahKelurahan = new Set(
        filteredRekap.map(item => item.kode_wilayah.substring(0, 10))
      ).size;

      const totalTPS = filteredRekap.reduce((acc, item) => acc + item.tps, 0);
      const totalL = filteredRekap.reduce((acc, item) => acc + item.l, 0);
      const totalP = filteredRekap.reduce((acc, item) => acc + item.p, 0);
      const totalLP = totalL + totalP;

      return {
        name: kecamatan.nama,
        jumlah_kelurahan: jumlahKelurahan,
        tps: totalTPS,
        l: totalL,
        p: totalP,
        lp: totalLP,
      };
    });


    const kelurahan_summaries = kelurahanData.map(kelurahan => {

        const filteredRekap = rekapData.filter(item =>
        item.kode_wilayah.startsWith(kelurahan.id) && item.kode_wilayah.length === 10
        );


        const totalTPS = filteredRekap.reduce((acc, item) => acc + item.tps, 0);
        const totalL = filteredRekap.reduce((acc, item) => acc + item.l, 0);
        const totalP = filteredRekap.reduce((acc, item) => acc + item.p, 0);
        const totalLP = totalL + totalP;

        return {
        name: kelurahan.nama,
        tps: totalTPS,
        l: totalL,
        p: totalP,
        lp: totalLP,
        };
    });

    const result = {
      rekap_kabupaten: rekap_kabupaten,
      rekap_kecamatan: rekap_kecamatan,
      rekap_kelurahan: rekap_kelurahan,
      kabupaten_summires: kabupatenSummaries,
      kecamatan_summaries: kecamatanSummaries,
      kelurahan_summaries: kelurahan_summaries,
    };

    // console.log(result);

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
