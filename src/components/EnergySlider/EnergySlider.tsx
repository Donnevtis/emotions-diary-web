import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { DEFAULT_ENERGY } from '../../resource/constants';
import { useTranslation } from 'react-i18next';

type EnergySliderProps = {
  onChange: (energy: number) => void;
};

const EnergySlider = ({ onChange }: EnergySliderProps) => {
  const handleChange = (
    _: Event | React.SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => {
    if (typeof value === 'number') {
      onChange(value);
    }
  };

  const { t } = useTranslation();

  return (
    <Box className='energy'>
      <Typography variant='h6' className='energy__hint'>
        {t`energy:title`}
      </Typography>
      <Slider defaultValue={DEFAULT_ENERGY} onChangeCommitted={handleChange} />
    </Box>
  );
};

export default EnergySlider;
