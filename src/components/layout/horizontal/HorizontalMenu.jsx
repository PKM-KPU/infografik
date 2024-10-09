// MUI Imports
import { useTheme } from '@mui/material/styles'

// Component Imports
import HorizontalNav, { Menu, MenuItem, SubMenu } from '@menu/horizontal-menu'
import VerticalNavContent from './VerticalNavContent'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'
import { useSettings } from '@core/hooks/useSettings'

// Styled Component Imports
import StyledHorizontalNavExpandIcon from '@menu/styles/horizontal/StyledHorizontalNavExpandIcon'
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/horizontal/menuItemStyles'
import menuRootStyles from '@core/styles/horizontal/menuRootStyles'
import verticalNavigationCustomStyles from '@core/styles/vertical/navigationCustomStyles'
import verticalMenuItemStyles from '@core/styles/vertical/menuItemStyles'
import verticalMenuSectionStyles from '@core/styles/vertical/menuSectionStyles'

const RenderExpandIcon = ({ level }) => (
  <StyledHorizontalNavExpandIcon level={level}>
    <i className='tabler-chevron-right' />
  </StyledHorizontalNavExpandIcon>
)

const RenderVerticalExpandIcon = ({ open, transitionDuration }) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const HorizontalMenu = () => {
  // Hooks
  const verticalNavOptions = useVerticalNav()
  const theme = useTheme()
  const { settings } = useSettings()

  // Vars
  const { skin } = settings
  const { transitionDuration } = verticalNavOptions

  return (
    <HorizontalNav
      switchToVertical
      verticalNavContent={VerticalNavContent}
      verticalNavProps={{
        customStyles: verticalNavigationCustomStyles(verticalNavOptions, theme),
        backgroundColor:
          skin === 'bordered' ? 'var(--mui-palette-background-paper)' : 'var(--mui-palette-background-default)'
      }}
    >
      <Menu
        rootStyles={menuRootStyles(theme)}
        renderExpandIcon={({ level }) => <RenderExpandIcon level={level} />}
        menuItemStyles={menuItemStyles(theme, 'tabler-circle')}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        popoutMenuOffset={{
          mainAxis: ({ level }) => (level && level > 0 ? 14 : 12),
          alignmentAxis: 0
        }}
        verticalMenuProps={{
          menuItemStyles: verticalMenuItemStyles(verticalNavOptions, theme),
          renderExpandIcon: ({ open }) => (
            <RenderVerticalExpandIcon open={open} transitionDuration={transitionDuration} />
          ),
          renderExpandedMenuItemIcon: { icon: <i className='tabler-circle text-xs' /> },
          menuSectionStyles: verticalMenuSectionStyles(verticalNavOptions, theme)
        }}
      >
        <MenuItem href='/home' icon={<i className='tabler-smart-home' />}>
          Dashboard
        </MenuItem>
        <SubMenu label={`Daftar Pemilih Tetap`} icon={<i className='tabler-list' />}>
          <MenuItem href='/dpt'>DPT</MenuItem>
          <MenuItem>DPT Sulawesi Selatan</MenuItem>
          <MenuItem href='/dpt/kab'>DPT Kab/Kota</MenuItem>
          <MenuItem href='/rincian/dpt/disabilitas'>Disabilitas</MenuItem>
          <MenuItem href='/rincian/dpt/klasifikasi-usia'>Klasifikasi Usia</MenuItem>
          <MenuItem href='https://cekdptonline.kpu.go.id/' target='_blank'>
            Cek DPT Online
          </MenuItem>
        </SubMenu>
        <SubMenu label={"Daftar Pemilih Tambahan"} icon={<i className='tabler-checklist' />}>
          <MenuItem href='/dptb'>DPTb</MenuItem>
          <MenuItem href={'/dptb/syarat-pindah'}>Syarat Pindah Memilih</MenuItem>
          <MenuItem>Rekap DPTb Sulsel</MenuItem>
          <MenuItem>Rekap DPTb Kab/Kota</MenuItem>
          <MenuItem>Posko Layanan DPTb</MenuItem>
          <MenuItem>Titik Kordinat TPS Sulsel</MenuItem>
        </SubMenu>
        <MenuItem href='/' icon={<i className='tabler-users' />}>
          TPS Lokasi Khusus
        </MenuItem>
        <MenuItem href='/' icon={<i className='tabler-building' />}>
          SATKER
        </MenuItem>
        <MenuItem href='/' icon={<i className='tabler-building-community' />}>
          DAPIL
        </MenuItem>
        <MenuItem href='/' icon={<i className='tabler-chart-pie' />}>
          Partisipasi Pemilu/Pilkada
        </MenuItem>
      </Menu>
    </HorizontalNav>
  )
}

export default HorizontalMenu
