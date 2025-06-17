import React from 'react'
import {KeyboardProvider} from 'react-native-keyboard-controller'

import {AppNavigation} from './src/Router'

export default () => {
  return (
    <KeyboardProvider>
      <AppNavigation />
    </KeyboardProvider>
  )
}
