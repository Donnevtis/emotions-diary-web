import React, { useState } from 'react';

import dayjs, { Dayjs } from 'dayjs';
import { useTg } from '../../../hooks/useTg';
import { TIME_FORMAT } from '../../../resource/constants';
import { useTranslation } from 'react-i18next';
import {
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Switch,
} from '@mui/material';
import { MobileTimePicker } from '@mui/x-date-pickers';
import { CircleNotifications } from '@mui/icons-material';

type TimePickerListItemProps = {
  defTime: string;
  disTime?: string[];
};

const TimePickerListItem = ({ defTime = '12:00' }: TimePickerListItemProps) => {
  const { expand } = useTg();
  const [value, setValue] = useState<Dayjs | null>(dayjs(defTime, TIME_FORMAT));
  const [isChecked, setIsChecked] = useState<boolean>(true);

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  const handleOpen = () => {
    expand();
    setIsChecked(true);
  };

  const handleSwitch = () => setIsChecked(!isChecked);

  const { t } = useTranslation();

  return (
    <MobileTimePicker
      toolbarTitle={t`timePicker:title`}
      value={value}
      onChange={handleChange}
      onOpen={handleOpen}
      minutesStep={15}
      renderInput={({ onClick, inputProps }) => (
        <>
          <Divider />
          <ListItem>
            <ListItemButton onClick={onClick}>
              <ListItemIcon>
                <CircleNotifications
                  color={isChecked ? 'primary' : 'disabled'}
                />
              </ListItemIcon>
              {inputProps?.value}
            </ListItemButton>
            <Switch edge='end' checked={isChecked} onClick={handleSwitch} />
          </ListItem>
        </>
      )}
    />
  );
};

export default TimePickerListItem;
