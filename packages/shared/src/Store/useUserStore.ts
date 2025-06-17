import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'

import AppStorage from '../Storage'
import type {UserType} from '../Types'

export type UserStore = {
  userData: UserType | null
  setUserData: (data: UserType) => void
  logOut: () => void
}

export default create(
  persist<UserStore>(
    (set) => ({
      token: '',

      userData: null,
      setUserData: (data) =>
        set((state) => {
          return {
            userData: {...(state.userData ?? {}), ...data}
          }
        }),

      logOut: () => set({userData: null})
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AppStorage)
    }
  )
)
