import { CircularProgress, Backdrop, Button } from '@mui/material'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { addState, sendDataToBot, putSettings } from '../../api/api'
import Emotions from './Emotions/Emotions'
import EnergySlider from './EnergySlider/EnergySlider'
import { defaultEnergy, defaultSettings } from '../../resource/defaults'
import { MainButton, showAlert, close } from '../../telegram'
import { PATHS, UserState } from '../../types'
import { queryParam } from '../../utils/utils'

dayjs.extend(timezone)

const { show, hide, isVisible, setParams, onClick, offClick } = MainButton

const MoodPicker = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [energy, setEnergy] = useState<number>(defaultEnergy)
  const [emotion, setEmotion] = useState<string>('')
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    if (queryParam.has('start')) {
      putSettings(defaultSettings)
    }
  }, [])

  useEffect(() => {
    if (emotion && !isVisible) {
      show()
    } else {
      hide()
    }
  }, [emotion])

  useEffect(() => {
    const data: UserState = {
      emotion,
      energy,
      timestamp: Date.now(),
      timezone: dayjs.tz.guess(),
    }

    const sendDataCallback = async () => {
      setLoading(true)
      addState(data)
        .then(() => sendDataToBot(data))
        .then(() => close())
        .catch(() => showAlert(String(t('errors:sorry'))))
        .finally(() => {
          setLoading(false)
        })
    }

    onClick(sendDataCallback)

    return () => {
      offClick(sendDataCallback)
    }
  }, [emotion, energy, navigate, t])

  useEffect(() => {
    setParams({ text: t`webView:sendButton` || 'OK' })
  }, [t])

  const data: UserState = {
    emotion,
    energy,
    timestamp: Date.now(),
    timezone: dayjs.tz.guess(),
  }

  return (
    <>
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>

      <EnergySlider onChange={setEnergy} />
      <Emotions onSelect={setEmotion} selectedEmotion={emotion} />
      {import.meta.env.DEV && (
        <Button
          onClick={async () => {
            setLoading(true)
            addState(data)
              .then(() => navigate(PATHS.history))
              .catch(() => showAlert(String(t('errors:sorry'))))
              .finally(() => setLoading(false))
          }}
        >
          SEND
        </Button>
      )}
    </>
  )
}

export default MoodPicker
