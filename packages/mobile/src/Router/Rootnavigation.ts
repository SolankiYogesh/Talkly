import {CommonActions, createNavigationContainerRef} from '@react-navigation/native'

import type {RootStackParamList} from '@/types'

export const navigationRef = createNavigationContainerRef<RootStackParamList>()

export function navigate(...arg: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(arg as never)
  }
}

export const NavigateToAuth = () => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: 'Auth'
          }
        ]
      })
    )
  }
}
export const NavigateToMain = () => {
  navigationRef.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [
        {
          name: 'Home'
        }
      ]
    })
  )
}
