// eslint-disable-next-line @typescript-eslint/no-var-requires
const C = require('react-native-config')

let nativeStorage = ''

if (C?.Config?.getConstants) {
  const Config = C?.Config?.getConstants()

  nativeStorage = Config['VITE_API_URL']
}

export default nativeStorage
