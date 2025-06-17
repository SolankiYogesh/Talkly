import React, {useCallback} from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'

import {AppButton, AppContainer, AppHeader} from '@/Components'
import {moderateScale, scale, verticalScale} from '@/Helpers'
import {NavigateToAuth} from '@/Router'

import {Colors, Fonts} from '@/Theme'
import {useUserStore} from '@talkly/shared'

export default () => {
  const {userData} = useUserStore('userData')

  const fullName = `${userData?.first_name} ${userData?.last_name}`

  const handleLogout = useCallback(() => {
    NavigateToAuth()
  }, [])
  return (
    <AppContainer>
      <AppHeader title="Welcome" isBack={false} />
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          {userData?.picture ? (
            <Image source={{uri: userData?.picture}} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitials}>{userData?.first_name[0]}</Text>
            </View>
          )}
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.email}>{userData?.email}</Text>
        </View>

        <AppButton title="Log Out" onPress={handleLogout} />
      </View>
    </AppContainer>
  )
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: moderateScale(50),
    height: verticalScale(100),
    width: verticalScale(100)
  },
  avatarInitials: {
    color: Colors.white,
    fontFamily: Fonts.ThemeBold,
    fontSize: moderateScale(40)
  },
  avatarPlaceholder: {
    alignItems: 'center',
    backgroundColor: Colors.grayD1D1,
    borderRadius: moderateScale(50),
    height: verticalScale(100),
    justifyContent: 'center',
    width: verticalScale(100)
  },
  container: {
    alignItems: 'center',
    backgroundColor: Colors.whiteShadeFAFB,
    flex: 1,
    justifyContent: 'center',
    padding: scale(20)
  },
  email: {
    color: Colors.grayD1D1,
    fontFamily: Fonts.ThemeRegular,
    fontSize: moderateScale(16),
    marginTop: verticalScale(4)
  },

  name: {
    color: Colors.black,
    fontFamily: Fonts.ThemeBold,
    fontSize: moderateScale(24),
    marginTop: verticalScale(16)
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(40)
  }
})
