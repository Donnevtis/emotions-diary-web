import React, { useEffect, useState } from 'react';
import TimePickerListItem from './TimePickerListItem/TimePickerListItem';
import {
  Stack,
  List,
  ListItem,
  ListItemText,
  Switch,
  Collapse,
  Divider,
  Typography,
  Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_REMINDERS } from '../../resource/constants';

const Settings = () => {
  const [switchOn, setSwitchOn] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSwitch = () => setSwitchOn(!switchOn);
  const handleClose = () => {
    setOpen(false);
  };
  const handleExit = () => navigate('/');

  useEffect(() => {
    setOpen(true);
  }, [setOpen]);

  const { t } = useTranslation();

  return (
    <Collapse in={open} onExited={handleExit}>
      <Stack spacing={1} paddingBottom={3}>
        <List>
          <ListItem>
            <ListItemText primary={t`settings:question`} />
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
          {t`settings:hint`}
        </Typography>

        <Button
          sx={{ width: '100%' }}
          variant='contained'
          onClick={handleClose}
        >
          OK
        </Button>
      </Stack>
    </Collapse>
  );
};

export default Settings;
