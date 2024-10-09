import luwuUtara from '../../public/images/peta/luwu_utara.png'
import bantaeng from '../../public/images/peta/bantaeng.png'
import barru from '../../public/images/peta/barru.png'
import bone from '../../public/images/peta/bone.png'
import bulukumba from '../../public/images/peta/bulukumba.png'
import enrekang from '../../public/images/peta/enrekang.png'
import luwu from '../../public/images/peta/luwu.png'
import luwuTimur from '../../public/images/peta/luwu_timur.png'
import maros from '../../public/images/peta/maros.png'
import pangkep from '../../public/images/peta/pangkep.png'
import parepare from '../../public/images/peta/parepare.png'
import pinrang from '../../public/images/peta/pinrang.png'
import selayar from '../../public/images/peta/selayar.png'
import sidrap from '../../public/images/peta/sidrap.png'
import soppeng from '../../public/images/peta/soppeng.png'
import takalar from '../../public/images/peta/takalar.png'
import tanaToraja from '../../public/images/peta/tana_toraja.png'
import torajaUtara from '../../public/images/peta/toraja_utara.png'
import wajo from '../../public/images/peta/wajo.png'
import makassar from '../../public/images/peta/makassar.png'
import gowa from '../../public/images/peta/gowa.png'
import sinjai from '../../public/images/peta/sinjai.png'
import jeneponto from '../../public/images/peta/Jeneponto.png'
import palopo from '../../public/images/peta/palopo.png'

const imageMap = {
  luwu_utara: luwuUtara,
  bantaeng: bantaeng,
  barru: barru,
  bone: bone,
  bulukumba: bulukumba,
  enrekang: enrekang,
  jeneponto: jeneponto,
  luwu: luwu,
  luwu_timur: luwuTimur,
  maros: maros,
  pangkep: pangkep,
  parepare: parepare,
  pinrang: pinrang,
  palopo: palopo,
  selayar: selayar,
  sidrap: sidrap,
  soppeng: soppeng,
  takalar: takalar,
  tana_toraja: tanaToraja,
  toraja_utara: torajaUtara,
  wajo: wajo,
  makassar: makassar,
  gowa: gowa,
  sinjai: sinjai
}

export function getImageByPathName(pathName) {
  return imageMap[pathName] || null
}
