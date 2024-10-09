import { NextResponse } from 'next/server'

import prisma from '@/libs/prisma'

export async function GET(request) {
  const result = await prisma.kabupaten.findMany({
    include: {
      kecamatan: {
        include: {
          kelurahan: {
            include: {
              tps: {
                select: {
                  l: true,
                  p: true
                }
              }
            }
          }
        }
      }
    }
  })

  const data = result.map(kabupaten => {
    const totalKecamatan = kabupaten.kecamatan.length

    const totalKelurahan = kabupaten.kecamatan.reduce((sum, kecamatan) => sum + kecamatan.kelurahan.length, 0)

    const { totalL, totalP, totalTps } = kabupaten.kecamatan.reduce(
      (acc, kecamatan) => {
        kecamatan.kelurahan.forEach(kelurahan => {
          acc.totalTps += kelurahan.tps.length
          kelurahan.tps.forEach(tps => {
            acc.totalL += tps.l || 0
            acc.totalP += tps.p || 0
          })
        })

        return acc
      },
      { totalL: 0, totalP: 0, totalTps: 0 }
    )

    const totalPemilih = totalL + totalP

    return {
      kabupaten: kabupaten.nama,
      coordsTop: kabupaten.coordsTop,
      coordsLeft: kabupaten.coordsLeft,
      link: kabupaten.link,
      totalL,
      totalP,
      totalPemilih,
      totalKecamatan,
      totalKelurahan,
      totalTps
    }
  })

  return NextResponse.json({ data })
}
