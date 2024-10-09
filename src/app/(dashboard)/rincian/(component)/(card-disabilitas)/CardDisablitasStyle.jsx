// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const CardDisablitasStyle = props => {
  // Props
  const { title, jumlah } = props

  return (
    <Card className='bs-full shadow-md bg-gradient-to-r from-[#9a421f] to-[#623422] hover:from-orange-700 hover:to-orange-700 transition-all duration-300'>
      <CardContent className='p-5'>
        <div className='flex gap-x-2 justify-between items-center'>
          <Typography variant='h6' color='white'>{title}</Typography>
          <Typography variant='caption' color='white'>
            {jumlah}
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardDisablitasStyle
