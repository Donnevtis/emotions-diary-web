import React, { ChangeEvent, useState } from 'react'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import { getReport } from '../../api/api'
import i18n from '../../i18n'
import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import dayjs from 'dayjs'
import { showAlert, close } from '../../telegram'

const ranges = {
  week: {
    start: dayjs()
      .day(dayjs().day() - 7)
      .valueOf(),
  },
  month: {
    start: dayjs()
      .month(dayjs().month() - 1)
      .valueOf(),
  },
}

const ReportButton = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [format, setFormat] = useState('xlsx')
  const [range, setRange] = useState(ranges.week)
  const { t } = useTranslation()

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChangeFormat = (
    _: ChangeEvent<HTMLInputElement>,
    format: string
  ) => setFormat(format)
  const handleChangeRange = (_: ChangeEvent<HTMLInputElement>, range: string) =>
    range === 'week' ? setRange(ranges.week) : setRange(ranges.month)

  const handleDownload = () => {
    setLoading(true)
    getReport(format, i18n.resolvedLanguage, range)
      .then(() => {
        close()
      })
      .catch(() => showAlert(String(t('errors:sorry'))))
      .finally(() => {
        setLoading(false)
      })
  }

  return loading ? (
    <CircularProgress size='2rem' />
  ) : (
    <>
      <Button disableRipple onClick={handleOpen}>{t`buttons:getReport`}</Button>
      <Dialog open={open} onClose={handleClose} maxWidth='xl' fullWidth>
        <DialogTitle>{t('report:generate')}</DialogTitle>

        <DialogContent
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Box>
            <FormLabel id='demo-radio-buttons-group-label'>
              {t('report:fileFormat')}
            </FormLabel>
            <RadioGroup
              defaultValue='xlsx'
              name='radio-buttons-group'
              onChange={handleChangeFormat}
            >
              <FormControlLabel
                value='xlsx'
                control={<Radio />}
                label='Excel'
              />
              <FormControlLabel
                disabled
                value='pdf'
                control={<Radio />}
                label='PDF'
              />
            </RadioGroup>
          </Box>
          <Box>
            <FormLabel id='demo-radio-buttons-group-label'>
              {t('report:range')}
            </FormLabel>
            <RadioGroup
              defaultValue='week'
              name='radio-buttons-group'
              onChange={handleChangeRange}
            >
              <FormControlLabel
                value='week'
                control={<Radio />}
                label={t('report:week')}
              />
              <FormControlLabel
                value='month'
                control={<Radio />}
                label={t('report:month')}
              />
            </RadioGroup>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('common:cancel')}</Button>
          <Button onClick={handleDownload}>{t('report:download')}</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ReportButton
