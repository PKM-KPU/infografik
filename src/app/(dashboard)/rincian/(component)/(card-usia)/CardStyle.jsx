import Image from 'next/image'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const CardStyle = props => {
  // Props
  const { umur, title, data, image } = props

  return (
    <Card className='bs-full shadow-md bg-gradient-to-r from-[#9e3209] to-[#623422] hover:from-orange-700 hover:to-orange-700 transition-all duration-300'>
      <CardContent className='p-3'>
        <div className='flex items-center flex-wrap gap-1 justify-around'>
          <Image src={image} className='items-center' width={35} height={70} />
          <div className='flex flex-col text-right'>
            <Typography variant='caption' color='white'>
              {title}
            </Typography>
            <Typography variant='caption' color='white'>
              {data}
            </Typography>
            <Typography variant='caption' color='white'>
              {umur}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardStyle
