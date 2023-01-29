import React, { useState } from 'react';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Switch from '@mui/material/Switch';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useTg } from '../../../hooks/useTg';
import { TIME_FORMAT } from '../../../resource/constants';
import Divider from '@mui/material/Divider';
import { useTranslation } from 'react-i18next';

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
      toolbarTitle={t('timePicker:title')}
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
                <CircleNotificationsIcon
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
