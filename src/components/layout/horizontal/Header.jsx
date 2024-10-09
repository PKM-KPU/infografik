'use client'

// Component Imports
import { useEffect, useState } from 'react'

import Navigation from './Navigation'
import NavbarContent from './NavbarContent'
import Navbar from '@layouts/components/horizontal/Navbar'
import LayoutHeader from '@layouts/components/horizontal/Header'

// Hook Imports
import useHorizontalNav from '@menu/hooks/useHorizontalNav'

const Header = () => {
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
    <>
      <LayoutHeader>
        <Navbar>
          <NavbarContent />
        </Navbar>
        {!isBreakpointReached && <Navigation />}
      </LayoutHeader>
      {isBreakpointReached && <Navigation />}
    </>
  )
}

export default Header
