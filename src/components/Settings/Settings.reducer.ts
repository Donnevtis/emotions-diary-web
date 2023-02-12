import { deleteItemFromArray, updateArrayItem } from '../../utils/utils'
import { SettingAction, ActionType } from './Settings.types'

const reducer = (state: Array<string>, action: SettingAction) => {
  switch (action.type) {
    case ActionType.add:
      if (state.includes(action.payload)) {
        return state
      } else {
        return [...state, action.payload]
      }
    case ActionType.delete:
      return deleteItemFromArray(state, action.payload)
    case ActionType.edit: {
      const {
        payload: { index, timer },
      } = action
      return updateArrayItem(state, index, timer)
    }
    case ActionType.update: {
      return action.payload
    }
    default:
      return state
  }
}

export default reducer
