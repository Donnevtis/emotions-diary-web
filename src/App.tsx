import React from 'react'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import ReportButton from './components/ReportButton/ReportButton'
import Box from '@mui/system/Box'

import { Outlet } from 'react-router-dom'
import MoodPicker from './layouts/MoodPicker'
import './App.css'
import SettingsButton from './components/SettingsButton/SettingsButton'
import HistoryButton from './components/HistroyButton/HistoryButton'

const App = () => (
  <Container>
    <Outlet />
    <Stack justifyContent='space-around' gap={1}>
      <MoodPicker />
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <ReportButton />
        <SettingsButton />
        <HistoryButton />
      </Box>
    </Stack>
  </Container>
)

export default App
