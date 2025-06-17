const uuid = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const idLength = 10
  let uniqueID = ''
  for (let i = 0; i < idLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    uniqueID += characters[randomIndex]
  }
  return uniqueID
}

const isValid = (value: string): boolean => {
  const localEmail = value.toLowerCase()
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return !localEmail?.trim() || !regex.test(localEmail?.trim())
}

const wait = (seconds = 1000): Promise<void> => {
  return new Promise((resolve: () => void) => {
    const timeout = setTimeout(() => {
      resolve()
      clearTimeout(timeout)
    }, seconds)
  })
}

const secondsToMMSS = (seconds: number): string => {
  return new Date(seconds * 1000).toISOString().substring(14, 19)
}

const getTimeString = (): string => {
  const currentDate = new Date()
  const currentHour = currentDate.getHours()
  let timeOfDay = 'Morning'
  if (currentHour >= 0 && currentHour < 12) {
    timeOfDay = 'Morning'
  } else if (currentHour >= 12 && currentHour < 18) {
    timeOfDay = 'Afternoon'
  } else if (currentHour >= 18 && currentHour < 24) {
    timeOfDay = 'Evening'
  }
  return timeOfDay
}

/**
 * @param {string} value
 *
 * @returns {boolean} return `true` if string is not empty
 */
const isEmpty = (value?: string): boolean => {
  return Boolean(value?.trim() && value !== 'null' && value !== 'undefined')
}
const formateNumber = (number: string) => {
  if (typeof number === 'string' && isEmpty(number)) {
    return number
      .replace(/\D/g, '')
      .replace(/(\d*)(\d{3})(\d{3})(\d{4})$/, (_s, a, b, c, d) => `+${a} (${b}) ${c}-${d}`)
      .replace(/\+(1\b|\s)\s*/, '')
  }
  return ''
}

const hideEmail = (email: string) => {
  return email.replace(/(.{1})(.*)(?=@)/, function (_: string, gp2: string, gp3: string) {
    for (let i = 0; i < gp3.length; i++) {
      gp2 += '*'
    }
    return gp2
  })
}

const cloneDeep = <T>(clone: T): T => {
  return JSON.parse(JSON.stringify(clone)) as T
}

const hexadecimal = (color: string) => {
  return (percentage: number): string => {
    const decimal = `0${Math.round(255 * (percentage / 100)).toString(16)}`.slice(-2).toUpperCase()
    return color + decimal
  }
}

export {
  cloneDeep,
  formateNumber,
  getTimeString,
  hexadecimal,
  hideEmail,
  isEmpty,
  isValid,
  secondsToMMSS,
  uuid,
  wait
}
