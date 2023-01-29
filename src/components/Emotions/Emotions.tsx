import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import EmotionList from './EmotionList';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';
import { NestedEmotions } from '../../types';
import { recordToNested } from '../../utlis/utils';
import i18n from '../../i18n';
import './Emotions.css';

const emotionsModule = import(
  `../../resource/emotions.${i18n.resolvedLanguage}.ts`
);

const a11yProps = (index: number) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

type EmotionProps = {
  onSelect: (emotion: string) => void;
  selectedEmotion: string;
};

const Emotions = ({ onSelect, selectedEmotion }: EmotionProps) => {
  const [selectedColumn, setSelectedColumn] = useState<number>(0);
  const [emotions, setEmotions] = useState<null | NestedEmotions>(null);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    emotionsModule
      .then(({ EMOTIONS }) => setEmotions(recordToNested(EMOTIONS)))
      .catch(() => setHasError(true));
  }, [emotionsModule, setHasError]);

  const handleChange = (_: React.SyntheticEvent, newValue: number) =>
    setSelectedColumn(newValue);

  const handleClick = (label: string) => {
    onSelect(label === selectedEmotion ? '' : label);
  };

  const { t } = useTranslation();

  return hasError ? (
    <Alert severity='error'>{t('emotions:error')}</Alert>
  ) : (
    <>
      <Box>
        <Typography variant='h6'>{t('emotions:title')}</Typography>
        {emotions ? (
          <Tabs
            centered
            variant='fullWidth'
            value={selectedColumn}
            onChange={handleChange}
          >
            {emotions.map(({ label }, index) => (
              <Tab
                key={label}
                label={label}
                {...a11yProps(index)}
                wrapped
                sx={{ minWidth: '3rem', flexBasis: 'content' }}
              />
            ))}
          </Tabs>
        ) : (
          <Skeleton variant='rectangular' height={48} />
        )}
      </Box>

      {emotions ? (
        emotions.map(({ label, children }, index) => (
          <EmotionList
            key={label}
            value={selectedColumn}
            index={index}
            emotions={children}
            onClick={handleClick}
            selected={selectedEmotion}
          />
        ))
      ) : (
        <Skeleton variant='rounded' height={210} />
      )}
    </>
  );
};

export default Emotions;
