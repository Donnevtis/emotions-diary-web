import { ClockPickerView } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { useCallback } from 'react'
import { TimersToDisabled } from '../Settings.types'

const useDisableTime = (
  timersToDisabled: TimersToDisabled,
  timer: Dayjs | null
) =>
  useCallback(
    (value: number, view: ClockPickerView) =>
      view === 'minutes' &&
      !!timersToDisabled[dayjs(timer).hour()]?.includes(value),
    [timersToDisabled, timer]
  )

export default useDisableTime
