import React, { useState } from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TimePickerListItem from './TimePickerListItem/TimePickerListItem';
import { DEFAULT_REMINDERS } from '../../resource/constants';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Switch from '@mui/material/Switch';
import Collapse from '@mui/material/Collapse';
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const [switchOn, setSwitchOn] = useState<boolean>(true);

  const handleSwitch = () => setSwitchOn(!switchOn);

  const { t } = useTranslation();

  return (
    <Box>
      <List>
        <ListItem>
          <ListItemText primary={t('settings:question')} />
          <Switch edge='end' defaultChecked={true} onClick={handleSwitch} />
        </ListItem>
        <Collapse in={switchOn}>
          {DEFAULT_REMINDERS.map((time) => (
            <TimePickerListItem key={time} defTime={time} />
          ))}
        </Collapse>
        <Divider />
      </List>

      <Typography
        variant='body2'
        sx={{ fontSize: '.7em', display: 'flex', justifyContent: 'end' }}
      >
        {t('settings:hint')}
      </Typography>
    </Box>
  );
};

export default Settings;
