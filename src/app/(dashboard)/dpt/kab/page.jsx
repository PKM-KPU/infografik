'use client';
import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/rekap/dpt');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <Container style={{ textAlign: 'center', padding: '20px' }}>
        <CircularProgress />
        <Typography variant="h6" style={{ marginTop: '20px' }}>Loading data...</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Typography variant="h4" gutterBottom align="center">
        Data Rekap
      </Typography>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell><strong>Nama Kabupaten</strong></TableCell>
              <TableCell><strong>TPS</strong></TableCell>
              <TableCell><strong>L</strong></TableCell>
              <TableCell><strong>P</strong></TableCell>
              <TableCell><strong>L+P</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                <TableCell>{item.nama_kabupaten}</TableCell>
                <TableCell>{item.tps}</TableCell>
                <TableCell>{item.l.toLocaleString()}</TableCell>
                <TableCell>{item.p.toLocaleString()}</TableCell>
                <TableCell>{item.lp.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
