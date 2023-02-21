import React from 'react'
import Box from '@mui/material/Box'
import ToggleButton from '@mui/material/ToggleButton'
import i18n from '../../../i18n'

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
        gridTemplateColumns: `repeat(${
          i18n.resolvedLanguage === 'ru' ? 2 : 3
        }, 1fr)`,
        gap: '.5rem',
      }}
    >
      {emotions.map(({ label }) => (
        <ToggleButton
          key={label}
          disableRipple
          value={label}
          selected={selected === label}
          onClick={() => onClick(label)}
          size='small'
        >
          {label}
        </ToggleButton>
      ))}
    </Box>
  </Box>
)

export default Emotionlist
