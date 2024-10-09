import { Card, CardContent, Typography, Divider, Box } from '@mui/material';

export default function Page() {
  return (
    <Card sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h2" gutterBottom>
          Syarat Pindah Memilih
        </Typography>
        <Box component="ul" sx={{ paddingLeft: 2 }}>
          <li>
            <Typography variant="body1">
              Memastikan diri telah terdaftar di dalam DPT Pemilu 2024 dengan melakukan pengecekan di cekdptonline.kpu.go.id dengan menggunakan NIK sesuai dengan KTP-el pada kolom pencarian. P2024
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Memastikan mengetahui alamat tujuan pindah memilih kab/kota, kecamatan dan desa/kelurahan.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Membawa KTP-el atau Kartu Keluarga
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Membawa dokumen bukti dukung alasan pindah memilih
            </Typography>
          </li>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h3" gutterBottom>
          Syarat Pindah Memilih Lainnya
        </Typography>
        <Box component="ul" sx={{ paddingLeft: 2 }}>
          <li>
            <Typography variant="body1">
              Tugas di tempat lain saat tanggal 14 Februari 2024
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Rawat inap difasilitasi layanan kesehatan dan keluarga yang mendampingi
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Penyandang disabilitas yang menjalani perawatan di panti sosial / rehabilitasi
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Menjalani rehabilitasi narkoba
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Menjalani tahanan/menjalani hukuman penjara atau kurungan
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Tugas belajar atau menempuh pendidikan menengah atau tinggi
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Pindah domisili
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Tertimpa bencana alam
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Bekerja di luar domisili
            </Typography>
          </li>
        </Box>
      </CardContent>
    </Card>
  );
}
