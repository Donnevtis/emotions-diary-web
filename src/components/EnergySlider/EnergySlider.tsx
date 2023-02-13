import React, { useState } from 'react'
import Box from '@mui/material/Box'
import { SliderProps, Slider } from '@mui/material/'
import Typography from '@mui/material/Typography'
import { DEFAULT_ENERGY } from '../../resource/constants'
import { useTranslation } from 'react-i18next'
import { Stack, styled } from '@mui/material'
import { Battery0Bar, BatteryFull } from '@mui/icons-material/'

type EnergySliderProps = {
  onChange: (energy: number) => void
}
interface StyledSliderProps extends SliderProps {
  thumbcolor: string
}

const percentToHex = (percent: number) => {
  const percent8bit = +(percent * 2.55).toPrecision(3)

  return `rgba(${255 - percent8bit},${percent8bit},0,1)`
}

const PrettoSlider = styled(Slider)<StyledSliderProps>(({ thumbcolor }) => ({
  height: 8,
  '& .MuiSlider-rail': {
    backgroundImage:
      'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(255,0,0,1) 0%, rgba(0,255,16,1) 100%)',
    opacity: 1,
  },
  '& .MuiSlider-track': {
    border: 'none',
    color: 'transparent',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: thumbcolor,
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
}))

const EnergySlider = ({ onChange }: EnergySliderProps) => {
  const [thumbColor, setThumbColor] = useState(percentToHex(DEFAULT_ENERGY))

  const handleChangeCommitted = (
    _: Event | React.SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => {
    if (typeof value === 'number') {
      onChange(value)
    }
  }

  const handleChange = (
    _: Event | React.SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => {
    if (typeof value === 'number') {
      setThumbColor(percentToHex(value))
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
              color: 'red',
            }}
          />
          <PrettoSlider
            thumbcolor={thumbColor}
            defaultValue={DEFAULT_ENERGY}
            onChangeCommitted={handleChangeCommitted}
            onChange={handleChange}
            valueLabelDisplay='auto'
          />
          <BatteryFull
            sx={{
              color: 'lime',
            }}
          />
        </Stack>
      </Box>
    </Box>
  )
}

export default EnergySlider
