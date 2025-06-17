import type {StateStorage} from 'zustand/middleware'

import isRN from '../Helpers/isRN'

let ZustandStorage: StateStorage
if (isRN) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  ZustandStorage = require('./storage.native')?.default?.nativeStorage
} else {
  ZustandStorage = localStorage
}

export default ZustandStorage
export {default as StorageKeys} from './StorageKeys'
