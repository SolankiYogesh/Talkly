import type {StateStorage} from 'zustand/middleware'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const M = require('react-native-mmkv')

let nativeStorage = null
if (M.MMKV) {
  const storage = new M.MMKV({id: 'reeva'})

  nativeStorage = {
    setItem: (name: string, value: string) => {
      storage.set(name, value)
    },
    getItem: (name: string) => {
      return storage.getString(name) ?? null
    },
    removeItem: (name: string) => {
      storage.delete(name)
    }
  }
}

export default nativeStorage as StateStorage
