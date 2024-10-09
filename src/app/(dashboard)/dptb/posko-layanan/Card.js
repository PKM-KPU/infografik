import { Button, Card as MuiCard, CardContent, Typography } from '@mui/material';

const Card = ({ region, city, phone, address }) => {
  return (
    <MuiCard className="max-w-xs p-4 shadow-lg">
      <CardContent>
        <Typography variant="h6" className="text-red-600 uppercase">
          {region}
        </Typography>
        <Typography variant="body1">
          <strong>Kab/Kota:</strong> {city}
        </Typography>
        <Typography variant="body1">
          <strong>No Hp:</strong> {phone}
        </Typography>
        <Typography variant="body1">
          <strong>Alamat:</strong> {address}
        </Typography>
        <Button variant="contained" color="primary" className="mt-4">
          Lokasi Posko →
        </Button>
      </CardContent>
    </MuiCard>
  );
};

export default Card;
