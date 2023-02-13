import React from 'react'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'

import Box from '@mui/system/Box'
import MoodPicker from './layouts/MoodPicker'
import './App.css'

const App = () => (
  <Container>
    <Stack justifyContent='space-around' gap={1}>
      <MoodPicker />
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      ></Box>
    </Stack>
  </Container>
)

export default App
