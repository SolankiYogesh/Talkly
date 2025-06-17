import {Toasts} from '@backpackapp-io/react-native-toast'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {AppStorage, StorageKeys} from '@talkly/shared'
import React, {useMemo} from 'react'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {SafeAreaProvider} from 'react-native-safe-area-context'

import {AppLoader, Loader} from '@/Components'
import {Constant} from '@/Helpers'
import {CommonStyle} from '@/Theme'
import type {RootStackParamList} from '@/types'

import AuthNavigation from './AuthNavigation'
import HomeNavigation from './HomeNavigation'
import {navigationRef} from './Rootnavigation'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default () => {
  console.log('AppStorage', AppStorage)
  const token = useMemo(() => AppStorage?.getItem(StorageKeys.TOKEN), [])

  return (
    <SafeAreaProvider style={CommonStyle.flex}>
      <GestureHandlerRootView style={CommonStyle.flex}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            screenOptions={{
              ...Constant.navigationOptions
            }}
            initialRouteName={token ? 'Home' : 'Auth'}
          >
            <Stack.Screen name={'Auth'} component={AuthNavigation} />
            <Stack.Screen name={'Home'} component={HomeNavigation} />
          </Stack.Navigator>
        </NavigationContainer>
        <AppLoader ref={(ref: AppLoaderRefType) => Loader.setLoader(ref)} />
        <Toasts />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}
