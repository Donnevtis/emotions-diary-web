import React, { useState } from 'react'

import dayjs, { Dayjs } from 'dayjs'
import { expand } from '../../../telegram'
import { TIME_FORMAT } from '../../../resource/constants'
import { useTranslation } from 'react-i18next'
import {
  Button,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from '@mui/material'
import { MobileTimePicker } from '@mui/x-date-pickers'
import { CircleNotifications, DeleteForever } from '@mui/icons-material'
import { TimePickerListItemProps, ActionType } from '../Settings.types'
import useDisableTime from '../useDisableTime'

const TimePickerListItem = ({
  timer,
  index,
  openPicker,
  setOpenPicker,
  dispatchTimers,
  timersToDisabled,
}: TimePickerListItemProps) => {
  const [dayjsTime, setDayjsTime] = useState<Dayjs | null>(
    dayjs(timer, TIME_FORMAT)
  )
  const shouldDisableTime = useDisableTime(timersToDisabled, dayjsTime)
  const { t } = useTranslation()

  const handleChange = (newValue: Dayjs | null) => {
    setDayjsTime(newValue)
  }

  const handleOpen = () => {
    expand()
  }
  const handleClose = () => {
    expand()
    setOpenPicker(null)
  }

  const handleAccept = () => {
    dispatchTimers({
      type: ActionType.edit,
      payload: { index, timer: dayjs(dayjsTime).format(TIME_FORMAT) },
    })
  }

  const HandleDelete = () =>
    dispatchTimers({ type: ActionType.delete, payload: index })

  return (
    <MobileTimePicker
      open={openPicker === index}
      toolbarTitle={t`timePicker:title`}
      value={dayjsTime}
      onChange={handleChange}
      onOpen={handleOpen}
      onClose={handleClose}
      onAccept={handleAccept}
      minutesStep={5}
      shouldDisableTime={shouldDisableTime}
      renderInput={({ inputProps }) => (
        <>
          <Divider />
          <ListItem>
            <ListItemButton onClick={() => setOpenPicker(index)}>
              <ListItemIcon>
                <CircleNotifications color='primary' />
              </ListItemIcon>
              {inputProps?.value}
            </ListItemButton>
            <Button onClick={HandleDelete}>
              <DeleteForever />
            </Button>
          </ListItem>
        </>
      )}
    />
  )
}

export default TimePickerListItem
