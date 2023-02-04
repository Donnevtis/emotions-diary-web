import React, { useEffect, useReducer, useRef, useState } from 'react';
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
  Alert,
  Fab,
  CircularProgress,
  AlertTitle,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_REMINDERS, TIME_FORMAT } from '../../resource/constants';
import { PATHS } from '../../types';
import { getSettings, updateSettings } from '../../api/api';
import { printError } from '../../utils/utils';
import dayjs, { Dayjs } from 'dayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import tg from '../../telegram';
import timersReducer from './Settings.reducer';
import { ActionType } from './Settings.types';

const { expand } = tg;

const Settings = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [switchOn, setSwitchOn] = useState<boolean>(false);
  const [hasError, setError] = useState<boolean>(false);
  const [timers, dispatchTimers] = useReducer(timersReducer, DEFAULT_REMINDERS);
  const [timeValue, setTimeValue] = useState<Dayjs | null>(
    dayjs('12:00', TIME_FORMAT)
  );
  const fabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getSettings()
      .then(({ notify, reminder_timers }) => {
        dispatchTimers({ type: ActionType.update, payload: reminder_timers });
        setSwitchOn(notify);
      })
      .catch((error) => {
        printError(error);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!timers.length) {
      setSwitchOn(false);
    }
  }, [timers]);
  const navigate = useNavigate();

  const handleSwitch = () => {
    setSwitchOn(!switchOn);
    if (!timers.length && fabRef.current) {
      fabRef.current.dispatchEvent(new Event('click', { bubbles: true }));
    }
  };

  const handleOpenPicker = () => expand();

  const handleChange = (newValue: Dayjs | null) => {
    setTimeValue(newValue);
  };

  const handleClosePicker = () => {
    dispatchTimers({
      type: ActionType.add,
      payload: dayjs(timeValue).format(TIME_FORMAT),
    });
  };

  const handleClose = () => {
    updateSettings({
      reminder_timers: timers,
      notify: switchOn,
      time_offset: new Date(Date.now()).getTimezoneOffset(),
    })
      .then(() => {
        setOpen(false);
      })
      .catch((error) => {
        setError(true);
        printError(error);
      });
  };

  const handleExit = () => navigate(PATHS.root);

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
            {loading ? (
              <CircularProgress size={25} />
            ) : (
              <Switch edge='end' checked={switchOn} onChange={handleSwitch} />
            )}
          </ListItem>
          <Collapse in={switchOn}>
            {timers.map((time, index) => (
              <TimePickerListItem
                key={time + index}
                index={index}
                timer={time}
                dispatchTimers={dispatchTimers}
              />
            ))}
            <Divider />
            <ListItem sx={{ flexDirection: 'row-reverse' }}>
              <MobileTimePicker
                toolbarTitle={t`timePicker:title`}
                value={timeValue}
                onChange={handleChange}
                onOpen={handleOpenPicker}
                onClose={handleClosePicker}
                minutesStep={15}
                renderInput={({ onClick }) => (
                  <div onClick={onClick} ref={fabRef}>
                    <Fab
                      size='small'
                      aria-label='add'
                      color='primary'
                      sx={{ marginTop: '0.5rem' }}
                    >
                      <Add />
                    </Fab>
                  </div>
                )}
              />
            </ListItem>
          </Collapse>
        </List>

        <Typography
          variant='body2'
          sx={{ fontSize: '.7em', display: 'flex', justifyContent: 'end' }}
        >
          {t`settings:hint`}
        </Typography>
        {hasError ? (
          <Alert
            severity='error'
            action={<Button onClick={handleExit}>{t('common:close')}</Button>}
          >
            <AlertTitle> {t('errors:errorOccurred')}</AlertTitle>
            {t('errors:tryLater')}
          </Alert>
        ) : (
          <Button
            sx={{ width: '100%' }}
            variant='contained'
            onClick={handleClose}
          >
            OK
          </Button>
        )}
      </Stack>
    </Collapse>
  );
};

export default Settings;
