import useMulti from './useMulti'
import type {UserStore} from './useUserStore'
import useUserReducer from './useUserStore'

const useUserStore = (...items: Array<keyof UserStore>) => useMulti(useUserReducer, ...items)

export {useUserReducer, useUserStore}
