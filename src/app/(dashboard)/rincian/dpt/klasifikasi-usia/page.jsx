import React from 'react'

import ReportsTab from '@/app/(dashboard)/home/(component)/ReportsTab'

const usiaCategoriesReport = ['Gen Z', 'Millenial', 'Gen X', 'Baby Boomer', 'Pre Boomer']

const dataUsia = [
  {
    type: 'orders',
    series: [{ data: [28, 10, 36, 38, 15] }]
  }
]

export default function Page() {
  return (
    <div className='flex justify-center items-center'>
      <div className='w-full md:w-3/4 lg:w-1/2 p-4'>
        <ReportsTab
          title={'Pemilih Disabilitas'}
          multiplier={4000}
          categories={usiaCategoriesReport}
          tabData={dataUsia}
        />
      </div>
    </div>
  )
}
