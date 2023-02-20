import React from 'react'
import Box from '@mui/material/Box'
import ToggleButton from '@mui/material/ToggleButton'
import { language_code } from '../../../telegram'

type Columns = {
  label: string
  value: string
}[]

type EmotionListProps = {
  emotions: Columns
  value: number
  index: number
  selected: string
  onClick: (label: string) => void
}

const Emotionlist = ({
  emotions,
  index,
  value,
  selected,
  onClick,
}: EmotionListProps) => (
  <Box hidden={value !== index}>
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${language_code === 'ru' ? 2 : 3}, 1fr)`,
        gap: '.5rem',
      }}
    >
      {emotions.map(({ label }) => (
        <ToggleButton
          key={label}
          fullWidth
          disableRipple
          value={label}
          selected={selected === label}
          onClick={() => onClick(label)}
        >
          {label}
        </ToggleButton>
      ))}
    </Box>
  </Box>
)

export default Emotionlist
