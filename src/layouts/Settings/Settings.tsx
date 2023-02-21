import React, { useEffect, useMemo, useReducer, useState } from 'react'
import TimePickerListItem from './TimePickerListItem/TimePickerListItem'
import {
  Stack,
  List,
  ListItem,
  ListItemText,
  Switch,
  Collapse,
  Divider,
  Button,
  Alert,
  AlertTitle,
  Container,
} from '@mui/material'
import { Add } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { defaultSettings } from '../../resource/defaults'
import { PATHS, UserTimerSettings } from '../../types'
import { updateSettings } from '../../api/api'
import { printError } from '../../utils/utils'
import { expand } from '../../telegram'
import timersReducer from './Settings.reducer'
import { ActionType } from './Settings.types'
import { divTimers, toLocal, toUTC } from './utils'

const Settings = () => {
  const { notify, reminder_timers } =
    (useLoaderData() as UserTimerSettings | null) || defaultSettings
  const [switchOn, setSwitchOn] = useState<boolean>(notify)
  const [timers, dispatchTimers] = useReducer(
    timersReducer,
    reminder_timers.map(toLocal)
  )

  const [openPicker, setOpenPicker] = useState<number | null>(null)
  const [hasError, setError] = useState<boolean>(false)
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    if (!timers.length) {
      setSwitchOn(false)
    }
  }, [timers])

  useEffect(() => {
    updateSettings({
      notify: switchOn,
      reminder_timers: Array.from(new Set(timers.map(toUTC))),
      time_offset: new Date().getTimezoneOffset(),
    }).catch((error) => {
      setError(true)
      printError(error)
    })
  }, [switchOn, timers])

  const handleSwitch = () => {
    if (!timers.length && !switchOn) {
      handleOpenPicker()
    }
    setSwitchOn(!switchOn)
  }

  const handleOpenPicker = () => {
    expand()
    dispatchTimers({
      type: ActionType.add,
      payload: '12:00',
    })
    setOpenPicker(timers.length)
  }

  const handleExit = () => navigate(PATHS.root)

  const timersToDisabled = useMemo(() => divTimers(timers), [timers])

  return (
    <Container>
      <Stack spacing={1} paddingBottom={3}>
        <List>
          <ListItem>
            <ListItemText primary={t`settings:question`} />
            <Switch edge='end' checked={switchOn} onChange={handleSwitch} />
          </ListItem>
          <Collapse in={switchOn}>
            {timers.map((time, index) => (
              <TimePickerListItem
                timersToDisabled={timersToDisabled}
                key={time + index}
                index={index}
                timer={time}
                openPicker={openPicker}
                setOpenPicker={setOpenPicker}
                dispatchTimers={dispatchTimers}
              />
            ))}
            <Divider />
            <ListItem>
              <Button onClick={handleOpenPicker} startIcon={<Add />}>
                {t('settings:addTime')}
              </Button>
            </ListItem>
          </Collapse>
        </List>
        {hasError && (
          <Alert
            severity='error'
            action={<Button onClick={handleExit}>{t('common:close')}</Button>}
          >
            <AlertTitle> {t('errors:errorOccurred')}</AlertTitle>
            {t('errors:tryLater')}
          </Alert>
        )}
      </Stack>
    </Container>
  )
}

export default Settings
