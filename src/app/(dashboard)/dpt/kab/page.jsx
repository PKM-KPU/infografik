'use client'

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
  Paper,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Skeleton,
} from '@mui/material';

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedKabupaten, setSelectedKabupaten] = useState(null);
  const [selectedKecamatan, setSelectedKecamatan] = useState(null);
  const [kecamatanSummaries, setKecamatanSummaries] = useState([]);
  const [kelurahanSummaries, setKelurahanSummaries] = useState([]);
  const [step, setStep] = useState(0);
  const [dialogLoading, setDialogLoading] = useState(false);

  // Fetch initial data (Kabupaten data)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/rekap/dpt');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const { kabupaten_summires } = await response.json();
        setData(kabupaten_summires);
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

  const handleRowClick = async (kabupaten) => {
    setSelectedKabupaten(kabupaten);
    setDialogOpen(true);
    setStep(1);
    setDialogLoading(true);

    try {
      const response = await fetch(`/api/rekap/dpt`);
      const { kecamatan_summaries } = await response.json();
      setKecamatanSummaries(kecamatan_summaries);
    } catch (error) {
      console.error('Failed to fetch kecamatan data:', error);
    } finally {
      setDialogLoading(false);
    }
  };

  const handleKecamatanClick = async (kecamatan) => {
    setSelectedKecamatan(kecamatan);
    setStep(2);
    setDialogLoading(true);

    try {
      const response = await fetch(`/api/rekap/dpt`);
      const { kelurahan_summaries } = await response.json();
      setKelurahanSummaries(kelurahan_summaries);
    } catch (error) {
      console.error('Failed to fetch kelurahan data:', error);
    } finally {
      setDialogLoading(false);
    }
  };

  const handleBackToKecamatan = () => {
    setStep(1);
    setKelurahanSummaries([]);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setStep(0);
    setKecamatanSummaries([]);
    setKelurahanSummaries([]);
    setSelectedKecamatan(null);
  };

  const renderSkeletonRows = (count) => {
    return Array.from(new Array(count)).map((_, index) => (
      <TableRow key={index}>
        <TableCell><Skeleton /></TableCell>
        <TableCell><Skeleton /></TableCell>
        <TableCell><Skeleton /></TableCell>
        <TableCell><Skeleton /></TableCell>
        <TableCell><Skeleton /></TableCell>
        <TableCell><Skeleton /></TableCell>
      </TableRow>
    ));
  };

  return (
    <Container>
      {loading ? (
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell><strong>Nama Kabupaten</strong></TableCell>
                <TableCell><strong>Jumlah Kecamatan</strong></TableCell>
                <TableCell><strong>TPS</strong></TableCell>
                <TableCell><strong>L</strong></TableCell>
                <TableCell><strong>P</strong></TableCell>
                <TableCell><strong>L + P</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderSkeletonRows(5)} {/* Show 5 rows of skeletons */}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell><strong>Nama Kabupaten</strong></TableCell>
                <TableCell><strong>Jumlah Kecamatan</strong></TableCell>
                <TableCell><strong>TPS</strong></TableCell>
                <TableCell><strong>L</strong></TableCell>
                <TableCell><strong>P</strong></TableCell>
                <TableCell><strong>L + P</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Tidak ada data yang ditemukan
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}
                    onClick={() => handleRowClick(item)}
                    style={{ cursor: 'pointer' }}
                  >
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.jumlah_kecamatan}</TableCell>
                    <TableCell>{item.tps.toLocaleString()}</TableCell>
                    <TableCell>{item.l.toLocaleString()}</TableCell>
                    <TableCell>{item.p.toLocaleString()}</TableCell>
                    <TableCell>{(item.l + item.p).toLocaleString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>
          {step === 1 && `${selectedKabupaten?.name}`}
          {step === 2 && (
            <div className='flex gap-2'>
              <span>{selectedKabupaten?.name}</span>
              <div className='text-[12px]'>
                <i className="tabler-arrow-narrow-right" />
              </div>
              <span>{selectedKecamatan?.name}</span>
            </div>
          )}
        </DialogTitle>

        <DialogContent>
          {dialogLoading ? (
            <TableContainer component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Nama Kecamatan</strong></TableCell>
                    <TableCell><strong>Jumlah Kelurahan</strong></TableCell>
                    <TableCell><strong>TPS</strong></TableCell>
                    <TableCell><strong>L</strong></TableCell>
                    <TableCell><strong>P</strong></TableCell>
                    <TableCell><strong>L + P</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {renderSkeletonRows(3)} {/* Show 3 skeleton rows */}
                </TableBody>
              </Table>
            </TableContainer>
          ) : step === 1 ? (
            <TableContainer component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Nama Kecamatan</strong></TableCell>
                    <TableCell><strong>Jumlah Kelurahan</strong></TableCell>
                    <TableCell><strong>TPS</strong></TableCell>
                    <TableCell><strong>L</strong></TableCell>
                    <TableCell><strong>P</strong></TableCell>
                    <TableCell><strong>L + P</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {kecamatanSummaries.map((item, index) => (
                    <TableRow
                      key={index}
                      onClick={() => handleKecamatanClick(item)}
                      style={{ cursor: 'pointer' }}
                    >
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.jumlah_kelurahan}</TableCell>
                      <TableCell>{item.tps.toLocaleString()}</TableCell>
                      <TableCell>{item.l.toLocaleString()}</TableCell>
                      <TableCell>{item.p.toLocaleString()}</TableCell>
                      <TableCell>{(item.l + item.p).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : step === 2 && (
            <TableContainer component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Nama Kelurahan</strong></TableCell>
                    <TableCell><strong>TPS</strong></TableCell>
                    <TableCell><strong>L</strong></TableCell>
                    <TableCell><strong>P</strong></TableCell>
                    <TableCell><strong>L + P</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {kelurahanSummaries.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.tps.toLocaleString()}</TableCell>
                      <TableCell>{item.l.toLocaleString()}</TableCell>
                      <TableCell>{item.p.toLocaleString()}</TableCell>
                      <TableCell>{(item.l + item.p).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>

        <DialogActions>
          {step === 2 && (
            <Button onClick={handleBackToKecamatan} color="primary">Kembali</Button>
          )}
          <Button onClick={handleCloseDialog} color="secondary">Keluar</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}
