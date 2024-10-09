'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'

export default function Page() {
  const [cardActive, setCardActive] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [kabupaten, setKabupaten] = useState([])
  const [loading, setLoading] = useState(true)

  const theme = useTheme()
  const router = useRouter()

  const handleClick = region => {
    setSelectedRegion(region)
    setCardActive(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/rekap')
        const data = await response.json()

        setKabupaten(data?.data)
      } catch (error) {
        console.error('Fetch Error:', error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-2xl md:text-3xl font-bold mb-6 text-center'>
        DAFTAR PEMILIH TETAP PROVINSI SULAWESI SELATAN
      </h1>

      {loading && <div className='text-center py-10'>Loading...</div>}

      {!loading && cardActive && selectedRegion && (
        <div className='fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center'>
          <div
            className={`bg-white w-[90%] md:w-[700px] p-6 md:p-8 rounded-lg shadow-lg ${theme.palette.mode === 'dark' ? 'dark:bg-gray-800' : 'dark:bg-white'}`}
          >
            <h2 className='text-lg md:text-xl font-bold mb-4'>{selectedRegion.name}</h2>
            <div className='grid grid-cols-2 gap-4 mb-6'>
              <div className='text-gray-700'>
                <p>Jumlah DPT</p>
                <p>Jumlah TPS</p>
                <p>Jumlah Kecamatan</p>
                <p>Jumlah Kelurahan</p>
                <p>Pemilih Laki-Laki</p>
                <p>Pemilih Perempuan</p>
              </div>
              <div className='text-right md:ml-[15rem] text-gray-900 font-semibold'>
                <p className='flex'>: {selectedRegion.jumlahPemilih}</p>
                <p className='flex'>: {selectedRegion.jumlahTPS}</p>
                <p className='flex'>: {selectedRegion.jumlahKecamatan}</p>
                <p className='flex'>: {selectedRegion.jumlahKelurahan}</p>
                <p className='flex'>: {selectedRegion.jumlahLaki}</p>
                <p className='flex'>: {selectedRegion.jumlahPerempuan}</p>
              </div>
            </div>
            <div className='flex justify-end space-x-2 md:space-x-4'>
              <Button onClick={() => setCardActive(false)} variant='outlined' className='rounded-full'>
                Tutup
              </Button>
              <Button
                onClick={() => router.push(`/rincian/dpt/${selectedRegion.link}`)}
                variant='contained'
                className='rounded-full'
              >
                Lihat Rincian
              </Button>
            </div>
          </div>
        </div>
      )}
      {!loading && (
        <div className='flex justify-center'>
          <div className='relative'>
            <Image
              src={'/images/peta-sulsel1.png'}
              alt={'Peta Sulawesi Selatan'}
              width={380}
              height={630}
              className='lg:w-[580px] lg:h-[900px]'
            />
            {kabupaten?.map((kab, index) => (
              <div
                key={index}
                className='absolute flex flex-col items-center cursor-pointer'
                style={{ top: kab.coordsTop, left: kab.coordsLeft }}
              >
                <Link href={`/rincian/dpt/${kab.link}`}>
                  <i className='tabler-map-pin-filled text-[16px] lg:text-[20px]' />
                </Link>
                <div
                  className='ml-1 text-[10px] lg:text-sm font-bold text-[#eaeaea]'
                  onClick={() =>
                    handleClick({
                      name: kab.kabupaten,
                      jumlahPemilih: kab.totalPemilih,
                      jumlahTPS: kab.totalTps,
                      jumlahKecamatan: kab.totalKecamatan,
                      jumlahKelurahan: kab.totalKelurahan,
                      jumlahLaki: kab.totalL,
                      jumlahPerempuan: kab.totalP,
                      link: kab.link
                    })
                  }
                >
                  <div className='text-black'>{kab.kabupaten}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
