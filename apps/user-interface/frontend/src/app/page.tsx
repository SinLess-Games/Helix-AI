'use client'
import styles from './page.module.scss'
import { Header, HeaderProps } from '@helix/ui'
import { useState } from 'react'
import { pages } from './constants'

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const headerProps: HeaderProps = {
    logo: 'https://cdn.sinlessgamesllc.com/Helix-AI/images/Favicon-01.png',
    title: 'Helix AI',
    version: '1.0.0',
    style: {
      backgroundColor: 'rgba(246, 6, 111, .5)',
    },
    pages: pages,
    menuOpen: menuOpen,
    toggleMenu: toggleMenu,
  }

  return (
    <div className={styles.page}>
      <Header {...headerProps} />
    </div>
  )
}
