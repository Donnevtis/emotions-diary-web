import React from 'react';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import Grid from '@mui/material/Grid';

type Columns = {
  label: string;
  value: string;
}[];

type EmotionListProps = {
  emotions: Columns;
  value: number;
  index: number;
  selected: string;
  onClick: (label: string) => void;
};

const Emotionlist = ({
  emotions,
  index,
  value,
  selected,
  onClick,
}: EmotionListProps) => (
  <Box hidden={value !== index}>
    <Grid container spacing={0.5}>
      {emotions.map(({ label }) => (
        <Grid
          key={label}
          display='flex'
          justifyContent='space-evenly'
          alignItems='center'
          xs
          item
        >
          <ToggleButton
            disableRipple
            value={label}
            selected={selected === label}
            onClick={() => onClick(label)}
          >
            {label}
          </ToggleButton>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default Emotionlist;
