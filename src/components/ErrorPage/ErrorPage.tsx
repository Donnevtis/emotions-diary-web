import Container from '@mui/material/Container'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Stack from '@mui/material/Stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

const ErrorPage = () => {
  const { t } = useTranslation()
  return (
    <Container>
      <Stack spacing={2}>
        <Alert severity='error'>
          <AlertTitle>{t`errors:oops`}</AlertTitle>
          {t`errors:sorry`}
        </Alert>
        <Alert severity='info'>{t`errors:notFound`}</Alert>
      </Stack>
    </Container>
  )
}

export default ErrorPage
