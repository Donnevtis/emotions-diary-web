import React, { useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import { CardHeader, Card, CardContent, Box, styled } from '@mui/material'
import { getState } from '../../api/api'
import { PATHS, UserState } from '../../types'
import TimeLine from './TimeLine'
import { BackButton, showAlert } from '../../telegram'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import FallbackBackdrop from '../../components/Fallback/FallbackBackdrop'

dayjs.extend(calendar)

const StyledCardContent = styled(CardContent)({
  padding: '.5rem 1rem',
  ':last-child': { paddingBottom: 0 },
})

const divideByDays = (stack: UserState[]) =>
  stack.reduce((prev: Record<string, UserState[]>, cur) => {
    const day = dayjs(cur.timestamp).format('YYYY-MM-DD')
    prev[day] ??= []
    prev[day].push(cur)

    return prev
  }, {})

const { show, hide, onClick, offClick } = BackButton

const HistoryCard = () => {
  const [loading, isLoading] = useState<boolean>(true)
  const [stack, setStack] = useState<UserState[]>([])
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    getState()
      .then((stack) => {
        if (!stack.length) {
          showAlert(String(t('history:empty')), () => navigate(PATHS.root))
        }

        setStack(stack)
      })
      .catch(() =>
        showAlert(String(t('errors:sorry')), () => navigate(PATHS.root))
      )
      .finally(() => isLoading(false))
  }, [t, navigate])

  useEffect(() => {
    show()
    const backButtonCallback = () => navigate(-1)
    onClick(backButtonCallback)

    return () => {
      hide()
      offClick(backButtonCallback)
    }
  }, [navigate])

  const timeline = useMemo(() => divideByDays(stack), [stack])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
        marginBottom: '1rem',
      }}
    >
      {loading ? (
        <FallbackBackdrop />
      ) : (
        Object.entries(timeline).map(([day, stack]) => (
          <Card key={day}>
            <CardHeader
              sx={{
                backgroundColor: ({
                  palette: {
                    mode,
                    secondary: { light, dark },
                  },
                }) => (mode === 'dark' ? light : dark),
                height: '3rem',
              }}
              disableTypography
              title={dayjs(day).calendar()}
            />
            <StyledCardContent>
              <TimeLine stack={stack} />
            </StyledCardContent>
          </Card>
        ))
      )}
    </Box>
  )
}

export default HistoryCard
