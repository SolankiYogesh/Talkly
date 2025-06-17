import {useLogin} from '@talkly/shared'
import {memo, useRef} from 'react'
import type {TextInput} from 'react-native'
import {Pressable, StyleSheet, Text, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller'

import {AppButton, AppContainer, AppHeader, AppInput, Loader} from '@/Components'
import {moderateScale, scale, verticalScale} from '@/Helpers'
import {NavigateToMain} from '@/Router'
import {Colors, Fonts} from '@/Theme'
import {Controller} from 'react-hook-form'

export default memo(() => {
  const lastNameRef = useRef<TextInput>(null)
  const emailRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)
  const {
    control,
    formState: {errors},
    handleSubmit,
    onSubmit
  } = useLogin({
    onLoad: Loader.isLoading,
    onLoginSuccess: NavigateToMain
  })

  return (
    <AppContainer>
      <AppHeader title="Login" isBack={false} />
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Controller
          control={control}
          name="first_name"
          render={({field: {onChange, onBlur, value}}) => (
            <AppInput
              placeholder="First Name"
              label="First Name"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              returnKeyType="next"
              onSubmitEditing={() => lastNameRef.current?.focus()}
              error={errors.first_name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="last_name"
          render={({field: {onChange, onBlur, value}}) => (
            <AppInput
              ref={lastNameRef}
              placeholder="Last Name"
              label="Last Name"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current?.focus()}
              error={errors.last_name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({field: {onChange, onBlur, value}}) => (
            <AppInput
              placeholder="Enter your Email"
              value={value}
              label="Email Address"
              onChangeText={onChange}
              onBlur={onBlur}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
              error={errors.email?.message}
            />
          )}
        />
        <View>
          <Controller
            control={control}
            name="password"
            render={({field: {onChange, onBlur, value}}) => (
              <AppInput
                ref={passwordRef}
                placeholder="Enter your password"
                secureTextEntry
                label="Password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType="done"
                onSubmitEditing={handleSubmit(onSubmit)}
                error={errors.password?.message}
              />
            )}
          />
          <Pressable onPress={() => {}} style={styles.forgotPasswordStyle}>
            <Text style={styles.forgotStyle}>Forgot password?</Text>
          </Pressable>
        </View>
        <AppButton title="Log in" onPress={handleSubmit(onSubmit)} />
      </KeyboardAwareScrollView>
    </AppContainer>
  )
})
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(20),
    rowGap: verticalScale(15)
  },
  forgotPasswordStyle: {
    alignSelf: 'flex-end'
  },
  forgotStyle: {
    color: Colors.black,
    fontFamily: Fonts.ThemeRegular,
    fontSize: moderateScale(12),
    marginTop: verticalScale(10)
  }
})
