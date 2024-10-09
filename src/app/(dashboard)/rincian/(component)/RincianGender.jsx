'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'

// Components Imports
import OptionMenu from '@core/components/option-menu'
import primaryColorConfig from '@configs/primaryColorConfig'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// const deliveryExceptionsChartSeries = [60, 40]

const ChartUsia = ({ data, totalPemilihGender }) => {
  // Hooks
  const theme = useTheme()

  const options = {
    labels: ['Laki-Laki', 'Perempuan'],
    stroke: {
      width: 0
    },
    colors: [primaryColorConfig[0].dark, primaryColorConfig[0].light],
    dataLabels: {
      enabled: false,
      formatter(val) {
        return `${Number(val).toLocaleString('id-ID')}`
      }
    },
    legend: {
      show: true,
      position: 'bottom',
      offsetY: 10,
      markers: {
        width: 8,
        height: 8,
        offsetY: -1,
        offsetX: theme.direction === 'rtl' ? 8 : -4
      },
      itemMargin: {
        horizontal: 15,
        vertical: 5
      },
      fontSize: '13px',
      fontWeight: 400,
      labels: {
        colors: 'white',
        useSeriesColors: false
      }
    },
    grid: {
      padding: {
        top: 15
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
          labels: {
            show: true,
            value: {
              fontSize: '24px',
              color: 'white',
              fontWeight: 500,
              offsetY: -20,
              formatter: val => Number(val).toLocaleString('id-ID')
            },
            name: { offsetY: 20, color: 'white' },
            total: {
              show: true,
              fontSize: '0.9375rem',
              fontWeight: 400,
              label: 'Rata-Rata Pemilih',
              color: 'white',
              formatter: () => totalPemilihGender.toLocaleString('id-ID')
            }
          }
        }
      }
    }
  }

  return (
    <Card className='bs-full bg-orange-800'>
      <CardHeader
        title='Jenis Kelamin'
        sx={{
          '& .MuiCardHeader-title': {
            color: 'white'
          }
        }}
      />
      <CardContent>
        <AppReactApexCharts type='donut' height={452} width='100%' series={data} options={options} />
      </CardContent>
    </Card>
  )
}

export default ChartUsia
