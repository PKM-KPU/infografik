// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import CardDisablitasStyle from './CardDisablitasStyle'

const CardDisablitas = ({ data }) => {
  if (data) {
    return (
      <Grid container spacing={6}>
        {data.map((item, index) => (
          <Grid item xs={12} key={index}>
            <CardDisablitasStyle {...item} />
          </Grid>
        ))}
      </Grid>
    )
  }
}

export default CardDisablitas
