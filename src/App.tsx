import React from 'react'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import './App.css'
import { Outlet } from 'react-router-dom'

const App = () => (
  <Container>
    <Stack justifyContent='space-around' gap={1}>
      <Outlet />
    </Stack>
  </Container>
)

export default App
