import React from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import ReportButton from './components/ReportButton/ReportButton';
import Button from '@mui/material/Button';
import Box from '@mui/system/Box';
import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router-dom';
import MoodPicker from './layouts/MoodPicker';
import './App.css';
import { PATHS } from './types';

const App = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Outlet />
      <Stack justifyContent='space-around' gap={1}>
        <MoodPicker />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <ReportButton />
          <Button
            component={Link}
            to={PATHS.settings}
          >{t`buttons:notificationSettings`}</Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default App;
