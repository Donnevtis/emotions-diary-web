import React from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/'
import { defaultEnergy } from '../../../resource/defaults'
import { useTranslation } from 'react-i18next'
import Battery0Bar from '@mui/icons-material/Battery0Bar'
import BatteryFull from '@mui/icons-material/BatteryFull'

type EnergySliderProps = {
  onChange: (energy: number) => void
}

const PrettoSlider = styled(Slider)({
  height: 8,
  '& .MuiSlider-rail': {
    backgroundColor: '#287233',
  },
  '& .MuiSlider-track': {
    border: 'none',
    color: '#287233',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#287233',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
})

const EnergySlider = ({ onChange }: EnergySliderProps) => {
  const handleChangeCommitted = (
    _: Event | React.SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => {
    if (typeof value === 'number') {
      onChange(value)
    }
  }

  const { t } = useTranslation()

  return (
    <Stack className='energy' gap='.8rem'>
      <Typography variant='h6' className='energy__hint'>
        {t`energy:title`}
      </Typography>
      <Box>
        <Stack spacing={1} direction='row' sx={{ mb: 1 }} alignItems='center'>
          <Battery0Bar
            fontSize='large'
            sx={{
              color: '#9c392b',
            }}
          />
          <PrettoSlider
            defaultValue={defaultEnergy}
            onChangeCommitted={handleChangeCommitted}
            valueLabelDisplay='auto'
          />
          <BatteryFull
            fontSize='large'
            sx={{
              color: '#287233',
            }}
          />
        </Stack>
      </Box>
    </Stack>
  )
}

export default EnergySlider
