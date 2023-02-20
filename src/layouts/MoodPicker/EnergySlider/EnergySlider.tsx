import React from 'react'
import Box from '@mui/material/Box'
import { Slider } from '@mui/material/'
import Typography from '@mui/material/Typography'
import { defaultEnergy } from '../../../resource/defaults'
import { useTranslation } from 'react-i18next'
import { Stack, styled } from '@mui/material'
import { Battery0Bar, BatteryFull } from '@mui/icons-material/'

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
    <Box className='energy'>
      <Typography variant='h6' className='energy__hint'>
        {t`energy:title`}
      </Typography>
      <Box>
        <Stack spacing={2} direction='row' sx={{ mb: 1 }} alignItems='center'>
          <Battery0Bar
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
            sx={{
              color: '#287233',
            }}
          />
        </Stack>
      </Box>
    </Box>
  )
}

export default EnergySlider
