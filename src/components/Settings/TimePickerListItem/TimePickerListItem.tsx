import React, { useState } from 'react'

import dayjs, { Dayjs } from 'dayjs'
import tg from '../../../telegram'
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

const { expand } = tg

const TimePickerListItem = ({
  timer = '12:00',
  index,
  dispatchTimers,
}: TimePickerListItemProps) => {
  const [value, setValue] = useState<Dayjs | null>(dayjs(timer, TIME_FORMAT))

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue)
  }

  const handleOpen = () => {
    expand()
  }

  const handleClose = () => {
    dispatchTimers({
      type: ActionType.edit,
      payload: { index, timer: dayjs(value).format(TIME_FORMAT) },
    })
  }

  const HandleDelete = () =>
    dispatchTimers({ type: ActionType.delete, payload: index })

  const { t } = useTranslation()

  return (
    <MobileTimePicker
      toolbarTitle={t`timePicker:title`}
      value={value}
      onChange={handleChange}
      onOpen={handleOpen}
      onClose={handleClose}
      minutesStep={15}
      renderInput={({ onClick, inputProps }) => (
        <>
          <Divider />
          <ListItem>
            <ListItemButton onClick={onClick}>
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
