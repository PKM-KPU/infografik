import { NextResponse } from 'next/server'

import prisma from '@/libs/prisma'

export async function GET(request) {
  try {
    const totalDisabilitas = await prisma.disabilitas.aggregate({
      _sum: {
        fisik: true,
        intelektual: true,
        mental: true,
        sensorik_wicara: true,
        sensorik_rungu: true,
        sensorik_netra: true,
        total: true
      }
    })

    const totalKlasifikasiUsia = await prisma.klasifikasi_usia.aggregate({
      _sum: {
        usia_0_20: true,
        usia_21_30: true,
        usia_31_40: true,
        usia_41_50: true,
        usia_51_60: true,
        usia_61_70: true,
        usia_71_keatas: true,
        total: true
      }
    })

    const kabupatenData = await prisma.kabupaten.findMany({
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

    let totalL = 0
    let totalP = 0

    kabupatenData.forEach(kabupaten => {
      kabupaten.kecamatan.forEach(kecamatan => {
        kecamatan.kelurahan.forEach(kelurahan => {
          kelurahan.tps.forEach(tps => {
            totalL += tps.l || 0
            totalP += tps.p || 0
          })
        })
      })
    })

    const result = {
      totalDisabilitas: totalDisabilitas._sum,
      totalKlasifikasiUsia: totalKlasifikasiUsia._sum,
      totalLakiLaki: totalL,
      totalPerempuan: totalP,
      totalPemilih: totalL + totalP
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
