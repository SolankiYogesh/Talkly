import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'

import {Constant} from '@/Helpers'
import {LoginScreen} from '@/Screens'
import type {RootStackParamList} from '@/types'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default () => {
  return (
    <Stack.Navigator screenOptions={Constant.navigationOptions} initialRouteName={'LoginScreen'}>
      <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
    </Stack.Navigator>
  )
}
