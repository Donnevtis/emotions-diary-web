import { CircularProgress, Backdrop } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { addState } from '../api/api'
import Emotions from '../components/Emotions/Emotions'
import EnergySlider from '../components/EnergySlider/EnergySlider'
import { DEFAULT_ENERGY } from '../resource/constants'
import tg from '../telegram'
import { PATHS, UserState } from '../types'

const {
  MainButton: { show, hide, isVisible, setParams, onClick, offClick },
  showAlert,
} = tg

const MoodPicker = () => {
  const [isFetch, setIsFetch] = useState<boolean>(false)
  const [energy, setEnergy] = useState<number>(DEFAULT_ENERGY)
  const [emotion, setEmotion] = useState<string>('')
  const navigate = useNavigate()
  const { t } = useTranslation()

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
      timestamp: Date.now().toString(),
    }

    const sendDataCallback = async () => {
      setIsFetch(true)
      addState(data)
        .then(() => navigate(PATHS.history))
        .catch(() => showAlert(String(t('errors:sorry'))))
        .finally(() => setIsFetch(false))
      hide()
    }

    onClick(sendDataCallback)

    return () => {
      offClick(sendDataCallback)
    }
  }, [emotion, energy, navigate, t])

  useEffect(() => {
    setParams({ text: t`webView:sendButton` || 'OK' })
  }, [t])

  return (
    <>
      <Backdrop open={isFetch}>
        <CircularProgress />
      </Backdrop>

      <EnergySlider onChange={setEnergy} />
      <Emotions onSelect={setEmotion} selectedEmotion={emotion} />
    </>
  )
}

export default MoodPicker
