import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Emotions from '../components/Emotions/Emotions'
import EnergySlider from '../components/EnergySlider/EnergySlider'
import { DEFAULT_ENERGY } from '../resource/constants'

const {
  MainButton: { show, hide, isVisible, setParams, onClick, offClick },
  sendData,
} = Telegram.WebApp

const MoodPicker = () => {
  const [energy, setEnergy] = useState<number>(DEFAULT_ENERGY)
  const [emotion, setEmotion] = useState<string>('')

  useEffect(() => {
    if (emotion && !isVisible) {
      show()
    } else {
      hide()
    }
  }, [emotion])

  useEffect(() => {
    const data = {
      emotion,
      energy,
      timestamp: Date.now(),
      time_zone_offset: new Date().getTimezoneOffset(),
    }
    const sendDataCallback = () => sendData(JSON.stringify(data))

    onClick(sendDataCallback)

    return () => {
      offClick(sendDataCallback)
    }
  }, [emotion, energy])

  const { t } = useTranslation()

  useEffect(() => {
    setParams({ text: t`webView:sendButton` || 'OK' })
  }, [t])

  return (
    <>
      <EnergySlider onChange={setEnergy} />
      <Emotions onSelect={setEmotion} selectedEmotion={emotion} />
    </>
  )
}

export default MoodPicker
