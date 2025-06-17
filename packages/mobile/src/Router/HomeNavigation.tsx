import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'

import {Constant} from '@/Helpers'
import {DashBoardScreen} from '@/Screens'
import type {RootStackParamList} from '@/types'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default () => {
  return (
    <Stack.Navigator screenOptions={Constant.navigationOptions}>
      <Stack.Screen name={'DashBoardScreen'} component={DashBoardScreen} />
    </Stack.Navigator>
  )
}
