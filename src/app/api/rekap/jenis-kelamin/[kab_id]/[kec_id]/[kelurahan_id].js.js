import { NextResponse } from 'next/server'

import prisma from '@/libs/prisma' // Prisma client instance

export async function GET(req, { params }) {
  const { kab_id, kec_id, kelurahan_id } = params

  if (!kab_id && !kec_id && !kelurahan_id) {
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

    return NextResponse.json({ data: result })
  }

  const kabupatenWhere = kab_id ? { id: kab_id } : {}
  const kecamatanWhere = kec_id ? { id: kec_id } : {}
  const kelurahanWhere = kelurahan_id ? { id: kelurahan_id } : {}

  const result = await prisma.kabupaten.findMany({
    where: kabupatenWhere,
    include: {
      kecamatan: {
        where: kecamatanWhere,
        include: {
          kelurahan: {
            where: kelurahanWhere,
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
    const kecamatanData = kabupaten.kecamatan.map(kecamatan => {
      const kelurahanData = kecamatan.kelurahan.map(kelurahan => {
        const totalL = kelurahan.tps.reduce((sum, tps) => sum + (tps.l || 0), 0)
        const totalP = kelurahan.tps.reduce((sum, tps) => sum + (tps.p || 0), 0)
        const totalPemilih = totalL + totalP

        return {
          kelurahan: kelurahan.nama,
          totalL,
          totalP,
          totalPemilih
        }
      })

      const totalL = kelurahanData.reduce((sum, k) => sum + k.totalL, 0)
      const totalP = kelurahanData.reduce((sum, k) => sum + k.totalP, 0)
      const totalPemilih = totalL + totalP

      return {
        kecamatan: kecamatan.nama,
        totalL,
        totalP,
        totalPemilih,
        kelurahanData
      }
    })

    const totalL = kecamatanData.reduce((sum, k) => sum + k.totalL, 0)
    const totalP = kecamatanData.reduce((sum, k) => sum + k.totalP, 0)
    const totalPemilih = totalL + totalP

    return {
      kabupaten: kabupaten.nama,
      totalL,
      totalP,
      totalPemilih,
      kecamatanData
    }
  })

  return NextResponse.json({ data })
}
