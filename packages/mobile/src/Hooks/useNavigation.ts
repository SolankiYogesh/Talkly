import {useNavigation as useNative} from '@react-navigation/native'
import type {NativeStackNavigationProp} from '@react-navigation/native-stack'

import type {RootStackParamList} from '../Types'

export default () => useNative<NativeStackNavigationProp<RootStackParamList>>()
