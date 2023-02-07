import { UserState, UserTimerSettings } from '../types'
import { user_id } from '../telegram'
import { queryParam } from '../utils/utils'

const { VITE_BOT_URL, VITE_SETTINGS_URL, VITE_STATE_URL, VITE_TOKEN } =
  import.meta.env

const token = queryParam('token') || VITE_TOKEN

if (!token) throw new Error('Not authorized')

const bearer = `Bearer ${token} ${user_id}`

const responseHandler = async (resp: Response) => {
  if (resp.status !== 200) throw await resp.text()
  return resp.json()
}

const urlWithUserId = (baseUrl: string) => {
  const userId = String(user_id)
  const url = new URL(baseUrl)
  url.searchParams.append('user_id', userId)

  return url
}

export const sendData = async (data: object) =>
  fetch(VITE_BOT_URL, {
    headers: {
      Authorization: bearer,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  })

export const getSettings = async (): Promise<UserTimerSettings | null> => {
  if (!user_id) {
    throw new Error('User id not found')
  }

  return fetch(urlWithUserId(VITE_SETTINGS_URL), {
    headers: {
      Authorization: bearer,
    },
    method: 'GET',
  }).then(responseHandler)
}

export const updateSettings = async (settings: UserTimerSettings) => {
  if (!user_id) {
    throw new Error('User id not found')
  }

  return fetch(urlWithUserId(VITE_SETTINGS_URL), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer,
    },
    body: JSON.stringify(settings),
  }).then(responseHandler)
}

export const getState = async (): Promise<UserState[]> => {
  if (!user_id) {
    throw new Error('User id not found')
  }

  return fetch(urlWithUserId(VITE_STATE_URL), {
    method: 'GET',
    headers: {
      Authorization: bearer,
    },
  }).then(responseHandler)
}

export const addState = async (state: UserState) => {
  if (!user_id) {
    throw new Error('User id not found')
  }

  const url = urlWithUserId(VITE_STATE_URL)
  url.searchParams.append('time', Date.now().toString())

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer,
    },
    body: JSON.stringify(state),
  }).then(responseHandler)
}
