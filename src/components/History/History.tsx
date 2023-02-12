import React, { useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import { Container, CardHeader, Card, CardContent } from '@mui/material'
import { getState } from '../../api/api'
import { PATHS, UserState } from '../../types'
import TimeLine from './TimeLine'
import { BackButton, showAlert } from '../../telegram'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import FallbackBackdrop from '../Fallback/FallbackBackdrop'

dayjs.extend(calendar)

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
    <Container
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
              }}
              title={dayjs(day).calendar()}
            />
            <CardContent>
              <TimeLine stack={stack} />
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  )
}

export default HistoryCard
