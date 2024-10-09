'use client'

import { usePathname } from 'next/navigation'

import { Card, Typography } from '@mui/material'

import { getImageByPathName } from '@/utils/imageMapper'
import Peta from '@/app/(dashboard)/rincian/(component)/Peta'
import LaporanTab from '@/app/(dashboard)/rincian/(component)/LaporanTab'
import RincianGender from '@/app/(dashboard)/rincian/(component)/RincianGender'
import CardUsia from '@/app/(dashboard)/rincian/(component)/(card-usia)/CardUsia'
import CardDisablitas from '@/app/(dashboard)/rincian/(component)/(card-disabilitas)/CardDisablitas'
import getKabupatenName from '@/utils/kabupatenName'

const usiaCategoriesReport = ['Gen Z', 'Millenial', 'Gen X', 'Baby Boomer', 'Pre Boomer']
const disabilitasCategoriesReport = ['Tuna Daksa', 'Tuna Netra', 'Tuna Rungu', 'Tuna Grahita', 'Lainnya']

const dataUsia = [
  {
    type: 'orders',
    series: [{ data: [28, 10, 36, 38, 15] }]
  }
]

const dataDisabilitas = [
  {
    type: 'orders',
    series: [{ data: [20, 21, 36, 40, 42] }]
  }
]

const dataJenisKelamin = [60, 30]

const dataUsiaRincian = [
  {
    title: 'Gen Z',
    image: '/images/genz.png',
    data: 90000,
    umur: 'Usia 17-25 tahun'
  },
  {
    title: 'Gen Millenial',
    image: '/images/genmilenial.png',
    data: 120000,
    umur: 'Usia 26-35 tahun'
  },
  {
    title: 'Gen X',
    image: '/images/genx.png',
    data: 80000,
    umur: 'Usia 36-50 tahun'
  },
  {
    title: 'Baby Boomer',
    image: '/images/babyboomer.png',
    data: 50000,
    umur: 'Usia 51-70 tahun'
  },
  {
    title: 'Pre Boomer',
    image: '/images/preboomer.png',
    data: 20000,
    umur: 'Usia 71+ tahun'
  }
]

const dataDisabilitasRincian = [
  {
    title: 'Tuna Daksa',
    jumlah: 10000
  },
  {
    title: 'Tuna Netra',
    jumlah: 20000
  },
  {
    title: 'Tuna Rungu',
    jumlah: 30000
  },
  {
    title: 'Tuna Grahita',
    jumlah: 50000
  },
  {
    title: 'Disabilitas Lainnya',
    jumlah: 1000
  }
]

export default function Page() {
  const path = usePathname().split('/').pop()
  const image = getImageByPathName(path)
  const nameKabupaten = getKabupatenName(path)

  return (
    <div>
      {/* First Row */}
      <div className='flex flex-wrap justify-between gap-4 my-3'>
        <div className='w-full md:w-[48%] lg:w-[30%]'>
          <Peta src={image} nameKabupaten={nameKabupaten} />
        </div>
        <div className='w-full md:w-[48%] lg:w-[33%]'>
          <LaporanTab
            title={'Klasifikasi Usia Pemilih'}
            multiplier={10000}
            categories={usiaCategoriesReport}
            tabData={dataUsia}
          />
        </div>
        <div className='w-full md:w-[48%] lg:w-[33%]'>
          <LaporanTab
            title={'Pemilih Disabilitas'}
            multiplier={4000}
            categories={disabilitasCategoriesReport}
            tabData={dataDisabilitas}
          />
        </div>
      </div>

      {/* Second Row */}
      <div className='flex flex-wrap justify-between gap-4 my-5'>
        <div className='w-full md:w-[48%] lg:w-[30%]'>
          <RincianGender data={dataJenisKelamin} />
        </div>
        <Card className='w-full md:w-[48%] lg:w-[33%] p-2 bg-orange-800'>
          <Typography variant='h6' className='my-4 text-lg text-white'>
            Rincian Usia
          </Typography>
          <CardUsia data={dataUsiaRincian} />
        </Card>
        <Card className='w-full md:w-[48%] lg:w-[33%] p-2 bg-orange-800'>
          <Typography variant='h6' className='mt-4 mb-3 text-lg text-white'>
            Rincian Disabilitas
          </Typography>
          <CardDisablitas data={dataDisabilitasRincian} />
        </Card>
      </div>
    </div>
  )
}
