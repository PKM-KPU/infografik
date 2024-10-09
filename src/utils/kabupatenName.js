const kabupaten = {
  luwu_utara: 'Luwu Utara',
  bantaeng: 'Bantaeng',
  barru: 'Barru',
  bone: 'Bone',
  bulukumba: 'Bulukumba',
  enrekang: 'Enrekang',
  jeneponto: 'Jeneponto',
  luwu: 'Luwu',
  luwu_timur: 'Luwu Timur',
  maros: 'Maros',
  pangkep: 'Pangkajene Kepulauan',
  parepare: 'Pare Pare',
  pinrang: 'Pinrang',
  palopo: 'Palopo',
  selayar: 'Selayar',
  sidrap: 'Sidrap',
  soppeng: 'Soppeng',
  takalar: 'Takalar',
  tana_toraja: 'Tana Toraja',
  toraja_utara: 'Toraja Utara',
  wajo: 'Wajo',
  makassar: 'Makassar',
  gowa: 'Gowa',
  sinjai: 'Sinjai'
}

export default function getKabupatenName(pathName) {
  return kabupaten[pathName] || null
}
