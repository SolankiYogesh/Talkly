import type {RouteProp} from '@react-navigation/native'
import {useRoute} from '@react-navigation/native'

import type {RootStackParamList} from '@/types'

const useParams = <T extends keyof RootStackParamList>(): RouteProp<
  RootStackParamList,
  T
>['params'] => {
  const route = useRoute<RouteProp<RootStackParamList, T>>()
  return route.params
}
export default useParams
