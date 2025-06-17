import AppStorage, {StorageKeys} from '../Storage'
import {useChatReducer, useUserReducer} from '../Store'
import SessionListener from './SessionListener'

const LogOut = (reason?: string, isClearStorage = true) => {
  if (isClearStorage) {
    useUserReducer.getState()?.logOut()
    useChatReducer.getState().logOut()
    AppStorage.removeItem(StorageKeys.TOKEN)
    AppStorage.removeItem(StorageKeys.FIREBASE_TOKEN)
  }
  SessionListener.emit('onLogOut', reason)
}
export default LogOut
