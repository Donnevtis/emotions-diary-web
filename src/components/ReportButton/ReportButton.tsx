import React from 'react'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { PATHS } from '../../types'

const ReportButton = () => {
  const { t } = useTranslation()

  return (
    <Button
      disableRipple
      component={Link}
      to={PATHS.history}
    >{t`buttons:getReport`}</Button>
  )
}

export default ReportButton
