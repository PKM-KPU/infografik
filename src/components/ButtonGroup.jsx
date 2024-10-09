import Button from '@mui/material/Button';

export default function ButtonGroup({ title }) {
  return (
    <div className="flex flex-col space-y-2">
      <Button
        variant="contained"
        disableElevation
        sx={{
          backgroundColor: '#D84315',
          color: '#FFF',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#BF360C',
          },
          borderRadius: '8px',
          padding: '10px 20px',
          textAlign: 'left',
          width: '230px',
          height: '40px',
        }}
      >
        {title}
      </Button>
    </div>
  );
}
