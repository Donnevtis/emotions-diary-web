import React, { useEffect, useState } from 'react';
import EnergySlider from './components/EnergySlider/EnergySlider';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import ReportButton from './components/ReportButton/ReportButton';
import Button from '@mui/material/Button';
import Box from '@mui/system/Box';
import { DEFAULT_ENERGY } from './resource/constants';

import './App.css';
import Emotions from './components/Emotions/Emotions';
import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router-dom';

const {
  MainButton: { show, hide, isVisible, setParams, onClick, offClick },
  sendData,
} = Telegram.WebApp;

const App = () => {
  const [energy, setEnergy] = useState<number>(DEFAULT_ENERGY);
  const [emotion, setEmotion] = useState<string>('');

  useEffect(() => {
    if (emotion && !isVisible) {
      show();
    } else {
      hide();
    }
  }, [emotion]);

  useEffect(() => {
    const data = {
      emotion,
      energy,
      timestamp: Date.now(),
      time_zone_offset: new Date().getTimezoneOffset(),
    };
    const sendDataCallback = () => sendData(JSON.stringify(data));

    onClick(sendDataCallback);

    return () => {
      offClick(sendDataCallback);
    };
  }, [emotion, energy]);

  const { t } = useTranslation();

  useEffect(() => {
    setParams({ text: t`webView:sendButton` || 'OK' });
  }, [t]);

  return (
    <Container fixed>
      <Outlet />
      <Stack justifyContent='space-around' sx={{ gap: '1.3rem' }}>
        <EnergySlider onChange={setEnergy} />
        <Emotions onSelect={setEmotion} selectedEmotion={emotion} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <ReportButton />
          <Button
            component={Link}
            to='settings'
          >{t`buttons:notificationSettings`}</Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default App;
