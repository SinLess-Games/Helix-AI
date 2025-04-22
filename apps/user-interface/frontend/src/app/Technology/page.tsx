'use client'

import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { Helix_Card, CardProps } from '@helix/ui'
import * as Constants from './constants'
import { Header, HeaderProps } from '@helix/ui'
import { pages } from '../constants'
import { useState } from 'react'

export default function Technology() {
  // Flatten all of your card arrays into one list
  const allCards: CardProps[] = Object.values(Constants).flat()
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const headerProps: HeaderProps = {
    logo: 'https://cdn.sinlessgamesllc.com/Helix-AI/images/Favicon-01.png',
    title: 'Helix AI',
    version: '1.0.0',
    style: {
      backgroundColor: 'rgba(246, 6, 111, .45)',
    },
    pages: pages,
    menuOpen: menuOpen,
    toggleMenu: toggleMenu,
  }

  return (
    <Box>
      <Header {...headerProps} />
      {/* Title */}
      <Typography
        variant="h3"
        component="h1"
        sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}
      >
        Technology
      </Typography>

      {/* Add a Description for the page */}
      <Typography></Typography>

      {/* Technology Cards */}
      <Box>
        <Grid container spacing={4}>
          {allCards.map((card, idx) => (
            <Grid key={idx} sx={{ display: 'flex' }}>
              <Helix_Card {...card} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
