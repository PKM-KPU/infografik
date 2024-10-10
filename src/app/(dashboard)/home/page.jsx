'use client'

import { useEffect, useState } from 'react'
import Skeleton from '@mui/material/Skeleton'
import CardMenu from './(component)/CardMenu'
import ReportsTab from './(component)/ReportsTab'
import ChartUsia from './(component)/ChartUsia'
import { Box } from '@mui/material'

export default function Page() {
  const [dataUsia, setDataUsia] = useState([])
  const [dataDisabilitas, setDataDisabilitas] = useState([])
  const [data, setData] = useState([0, 0])
  const [totalPemilih, setTotalPemilih] = useState(0)
  const [loading, setLoading] = useState(true)
  const [tpsUmum, setTpsUmum] = useState(0)
  const [tpsKhusus, setTpsKhusus] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard')
        const data = await response.json()

        const usiaData = [
          {
            type: 'orders',
            series: [
              {
                data: [
                  data?.totalKlasifikasiUsia.usia_0_20,
                  data?.totalKlasifikasiUsia.usia_21_30,
                  data?.totalKlasifikasiUsia.usia_31_40 + data?.totalKlasifikasiUsia.usia_41_50,
                  data?.totalKlasifikasiUsia.usia_51_60 + data?.totalKlasifikasiUsia.usia_61_70,
                  data?.totalKlasifikasiUsia.usia_71_keatas
                ]
              }
            ]
          }
        ]

        setDataUsia(usiaData)

        const disabilitasData = [
          {
            type: 'orders',
            series: [
              {
                data: [
                  data?.totalDisabilitas.fisik,
                  data?.totalDisabilitas.sensorik_netra,
                  data?.totalDisabilitas.sensorik_rungu,
                  data?.totalDisabilitas.intelektual + data?.totalDisabilitas.mental,
                  data?.totalDisabilitas.sensorik_wicara
                ]
              }
            ]
          }
        ]

        setDataDisabilitas(disabilitasData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    const countData = async () => {
        try {
            const response = await fetch('/api/rekap/dpt');
            const { rekap_kabupaten } = await response.json();
            console.log({ rekap_kabupaten });

            const totalPemilihDpt = rekap_kabupaten
                .reduce((acc, item) => acc + item.l + item.p, 0);

            console.log({ totalPemilihDpt });

            const totalLakiLaki = rekap_kabupaten.reduce((acc, item) => acc + item.l, 0);


            const totalPerempuan = rekap_kabupaten.reduce((acc, item) => acc + item.p, 0);

            const countTPS = rekap_kabupaten.reduce((acc, item) => acc + item.tps, 0);

            setTpsUmum(countTPS);
            setData([totalLakiLaki, totalPerempuan]);
            setTotalPemilih(totalPemilihDpt);
        } catch (error) {
            console.error('Error counting data:', error);
        }
    };

    const jumlahTpsKhusus = async () => {
        try {
            const response = await fetch('/api/rekap/tpsKhusus');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const tpsJumlah = await response.json();
            setTpsKhusus(tpsJumlah);
        } catch (error) {
            console.error('Error counting data:', error);
        }
    }

    jumlahTpsKhusus()
    countData()
    fetchData()
  }, [])

  const usiaCategoriesReport = ['Gen Z', 'Millenial', 'Gen X', 'Baby Boomer', 'Pre Boomer']
  const disabilitasCategoriesReport = ['Tuna Daksa', 'Tuna Netra', 'Tuna Rungu', 'Tuna Grahita', 'Tuna Wicara']

  if (loading) {
    return (
      <Box>
        <Box className='my-3'>
          <Skeleton variant="rectangular" width="100%" height={100} />
        </Box>
        <Box className='flex justify-between flex-wrap my-10'>
          <Box className='w-full md:w-[30%] mb-4 md:mb-0'>
            <Skeleton variant="rectangular" width="100%" height={300} />
          </Box>
          <Box className='w-full md:w-[33%] mb-4 md:mb-0'>
            <Skeleton variant="rectangular" width="100%" height={300} />
          </Box>
          <Box className='w-full md:w-[33%]'>
            <Skeleton variant="rectangular" width="100%" height={300} />
          </Box>
        </Box>
      </Box>
    )
  }

  return (
    <div>
      <div className='my-3'>
        <CardMenu pemilihTetap={totalPemilih} tpsUmum={tpsUmum} tpsKhusus={tpsKhusus} />
      </div>
      <div className='flex justify-between flex-wrap my-10'>
        <div className='w-full md:w-[30%] mb-4 md:mb-0'>
          <ChartUsia data={data} totalPemilih={totalPemilih} />
        </div>
        <div className='w-full md:w-[33%] mb-4 md:mb-0'>
          <ReportsTab
            title={'Klasifikasi Usia Pemilih'}
            multiplier={10000}
            categories={usiaCategoriesReport}
            tabData={dataUsia}
          />
        </div>
        <div className='w-full md:w-[33%]'>
          <ReportsTab
            title={'Pemilih Disabilitas'}
            multiplier={10000}
            categories={disabilitasCategoriesReport}
            tabData={dataDisabilitas}
          />
        </div>
      </div>
    </div>
  )
}
