import {
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  Timeline,
  timelineItemClasses,
} from '@mui/lab'
import {
  Typography,
  capitalize,
  Box,
  CircularProgress,
  circularProgressClasses,
} from '@mui/material'
import { Bolt } from '@mui/icons-material'
import dayjs from 'dayjs'
import React from 'react'
import { UserState } from '../../types'

type TimeLineProps = {
  stack: UserState[]
}

const TimeLine = ({ stack }: TimeLineProps) => (
  <Timeline
    sx={{
      margin: 0,
      paddingRight: 0,
      [`& .${timelineItemClasses.root}:before`]: {
        flex: 0,
        padding: 0,
      },
    }}
  >
    {stack.map(({ timestamp, emotion, energy }, index) => (
      <TimelineItem key={timestamp}>
        <TimelineSeparator sx={{ position: 'relative', top: '.9rem' }}>
          <TimelineDot />
          {stack.length !== index + 1 && <TimelineConnector />}
        </TimelineSeparator>
        <TimelineContent
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '.5rem',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'baseline',
              gap: '.5rem',
              width: '100%',
              top: '-0.25rem',
            }}
          >
            <Typography lineHeight={0} variant='caption'>
              {dayjs(timestamp).format('LT')}
            </Typography>

            <Typography
              flexGrow={1}
              color='primary'
              variant='h6'
              sx={{ fontSize: '1.1em' }}
            >
              {capitalize(emotion)}
            </Typography>
          </Box>

          <Box>
            <Bolt />
          </Box>

          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              alignSelf: 'center',
              top: '-0.4rem',
            }}
          >
            <CircularProgress
              variant='determinate'
              sx={{
                animationDuration: '550ms',
                position: 'absolute',
                left: 0,
                [`& .${circularProgressClasses.circle}`]: {
                  strokeLinecap: 'round',
                },
                color: ({
                  palette: {
                    mode,
                    secondary: { main, dark },
                  },
                }) => (mode === 'dark' ? main : dark),
              }}
              value={100}
              size={40}
              thickness={4}
            />
            <CircularProgress variant='determinate' value={energy} />

            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant='caption'
                component='div'
                color='text.secondary'
              >{`${Math.round(energy)}%`}</Typography>
            </Box>
          </Box>
        </TimelineContent>
      </TimelineItem>
    ))}
  </Timeline>
)

export default TimeLine
