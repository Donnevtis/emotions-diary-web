import { UserTimerSettings } from '../types';
import { user_id } from '../telegram';
const { VITE_BOT_URL, VITE_DB_URL } = import.meta.env;

export const sendData = async (data: object) =>
  fetch(VITE_BOT_URL, {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const getSettings = async (): Promise<UserTimerSettings> => {
  if (!user_id) {
    throw new Error('User id not found');
  }

  return fetch(VITE_DB_URL + `settings/${user_id}`, {
    method: 'GET',
  }).then((resp) => resp.json());
};

export const updateSettings = async (
  settings: Omit<UserTimerSettings, 'time_offset'>
) => {
  if (!user_id) {
    throw new Error('User id not found');
  }

  return fetch(VITE_DB_URL + `settings/${user_id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...settings,
      time_offset: new Date(Date.now()).getTimezoneOffset(),
    }),
  }).then((resp) => resp.json());
};
