import { API_PATHS, Ranges, UserState, UserTimerSettings } from '../types'
import { initDataUnsafe, user_id } from '../telegram'
import { queryParam } from '../utils/utils'
import i18n from '../i18n'

const language_code = i18n.resolvedLanguage

const { VITE_GATEWAY_URL, VITE_TOKEN } = import.meta.env

const token = queryParam.get('token') || VITE_TOKEN

if (!token) throw new Error('Not authorized')

const bearer = `Bearer ${token} ${user_id}`

const responseHandler = async (resp: Response) => {
  if (resp.status !== 200) throw await resp.text()
  return resp.json()
}

const urlWithUserId = (path = '/', baseUrl = VITE_GATEWAY_URL) => {
  const userId = String(user_id)
  const url = new URL(path, baseUrl)
  url.searchParams.append('user_id', userId)

  return url
}

export const sendDataToBot = (data: object) =>
  fetch(urlWithUserId(API_PATHS.bot), {
    headers: {
      Authorization: bearer,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      ...data,
      query_id: initDataUnsafe.query_id,
      language_code,
    }),
  })

export const getSettings = (): Promise<UserTimerSettings | null> => {
  if (!user_id) {
    throw new Error('User id not found')
  }

  return fetch(urlWithUserId(API_PATHS.settings), {
    headers: {
      Authorization: bearer,
    },
    method: 'GET',
  }).then(responseHandler)
}

export const putSettings = (settings: UserTimerSettings) => {
  if (!user_id) {
    throw new Error('User id not found')
  }

  return fetch(urlWithUserId(API_PATHS.settings), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer,
    },
    body: JSON.stringify({ user_id, ...settings }),
  }).then(responseHandler)
}

export const updateSettings = (settings: UserTimerSettings) => {
  if (!user_id) {
    throw new Error('User id not found')
  }

  return fetch(urlWithUserId(API_PATHS.settings), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer,
    },
    body: JSON.stringify({ user_id, ...settings }),
  }).then(responseHandler)
}

export const getState = (): Promise<UserState[]> => {
  if (!user_id) {
    throw new Error('User id not found')
  }

  return fetch(urlWithUserId(API_PATHS.state), {
    method: 'GET',
    headers: {
      Authorization: bearer,
    },
  }).then(responseHandler)
}

export const addState = (state: UserState) => {
  if (!user_id) {
    throw new Error('User id not found')
  }

  return fetch(urlWithUserId(API_PATHS.state), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer,
    },
    body: JSON.stringify({ language_code, state }),
  }).then(responseHandler)
}

export const getReport = (
  type: string,
  lang: string,
  { start, end }: Ranges
) => {
  if (!user_id) {
    throw new Error('User id not found')
  }

  const url = urlWithUserId(API_PATHS.report)
  url.searchParams.append('type', type)
  url.searchParams.append('lang', lang)
  start !== void 0 && url.searchParams.append('start', String(start))
  end !== void 0 && url.searchParams.append('end', String(end))

  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: bearer,
    },
  }).then((res) => {
    if (res.status !== 200) throw new Error()
    return res.blob()
  })
}
