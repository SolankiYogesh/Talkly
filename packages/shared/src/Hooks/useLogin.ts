import {yupResolver} from '@hookform/resolvers/yup'
import {useCallback, useMemo} from 'react'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'

import {AppStorage} from '../..'
import {StorageKeys} from '../Storage'
import {useUserStore} from '../Store'

const schema = yup.object().shape({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
})

type FormData = yup.InferType<typeof schema>

type UseLoginProps = {
  onLoad: (state: boolean) => void
  onLoginSuccess: () => void
}
export const useLogin = ({onLoad, onLoginSuccess}: UseLoginProps) => {
  const formStates = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const {setUserData} = useUserStore('setUserData')

  const onSubmit = useCallback(
    (data: FormData) => {
      onLoad(true)
      setTimeout(() => {
        onLoad(false)
        AppStorage.setItem(StorageKeys.TOKEN, Math.random().toString())
        setUserData({
          ...data,
          picture: 'https://i.pravatar.cc/150?img=12'
        })
        onLoginSuccess()
      }, 2000)
    },
    [onLoad, onLoginSuccess, setUserData]
  )

  return useMemo(() => ({onSubmit, ...formStates}), [formStates, onSubmit])
}
