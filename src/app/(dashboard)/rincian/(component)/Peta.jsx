import Image from 'next/image'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const Peta = ({ src, nameKabupaten }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Card className='h-[100%] bg-orange-800'>
      <CardContent className='p-5'>
        <Typography variant='h5' className='text-white items-center mb-2'>
          {nameKabupaten}
        </Typography>
        <div className='flex h-[21rem] pli-2.5 pbs-4 rounded bg-orange-600'>
          <Image
            src={src}
            alt='Peta'
            className='items-center'
            width={isMobile ? 250 : 300}
            height={isMobile ? 310 : 300}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default Peta
