import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { Helix_Card, CardProps } from '@helix/ui'
import * as Constants from './constants'

export default function Technology() {
  // Flatten all of your card arrays into one list
  const allCards: CardProps[] = Object.values(Constants).flat()

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h3"
        component="h1"
        sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}
      >
        Technology
      </Typography>

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
