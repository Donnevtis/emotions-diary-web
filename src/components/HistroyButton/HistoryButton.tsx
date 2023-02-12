import { Button } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { PATHS } from '../../types'

const HistoryButton = () => {
  const { t } = useTranslation()

  return (
    <Button component={Link} to={PATHS.history}>
      {t('history:open')}
    </Button>
  )
}

export default HistoryButton
