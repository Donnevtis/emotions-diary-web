import { Container, Alert, AlertTitle, Stack } from '@mui/material'
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
