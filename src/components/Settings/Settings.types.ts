export enum ActionType {
  add = 'add',
  delete = 'delete',
  edit = 'edit',
  update = 'update',
}

type AddAction = {
  type: ActionType.add
  payload: string
}

type DeleteAction = {
  type: ActionType.delete
  payload: number
}

type EditAction = {
  type: ActionType.edit
  payload: {
    index: number
    timer: string
  }
}

type UpdateAction = {
  type: ActionType.update
  payload: Array<string>
}

export type SettingAction = AddAction | DeleteAction | EditAction | UpdateAction

export type TimersToDisabled = Record<number, Array<number> | undefined>

export type TimePickerListItemProps = {
  disTime?: string[]
  index: number
  timer: string
  timersToDisabled: TimersToDisabled
  dispatchTimers: (value: SettingAction) => void
}
