'use client'

// Third-party Imports
import { useEffect, useState } from 'react'

import classnames from 'classnames'

// Component Imports
import NavToggle from './NavToggle'
import Logo from '@components/layout/shared/Logo'
import LogoMobile from '@components/layout/shared/LogoMobile'
import ModeDropdown from '@components/layout/shared/ModeDropdown'

// Hook Imports
import useHorizontalNav from '@menu/hooks/useHorizontalNav'

// Util Imports
import { horizontalLayoutClasses } from '@layouts/utils/layoutClasses'

const NavbarContent = () => {
  // Hooks
  const { isBreakpointReached } = useHorizontalNav()

  // State to ensure component only renders after client-side mount
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Set to true after mount on client
    setIsMounted(true)
  }, [])

  if (!isMounted) return null // Don't render anything on the server

  return (
    <div
      className={classnames(horizontalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full')}
    >
      <div className='flex items-center gap-4'>
        <NavToggle />
        {/* Hide Logo on Smaller screens */}
        {!isBreakpointReached && <Logo />}
      </div>
      {isBreakpointReached && <LogoMobile />}
      <div className='flex items-center'>
        <ModeDropdown />
      </div>
    </div>
  )
}

export default NavbarContent
