import {spawn} from 'child_process'
import prompts from 'prompts'

function runCommand(command) {
  console.log(`💻 Running command: ${command}`)

  const process = spawn(command, {
    shell: true,
    stdio: ['inherit', 'inherit', 'inherit']
  })

  process.on('close', (code) => {
    console.log(`🎬 Process exited with code: ${code}`)
  })
}

async function selectEnvironment() {
  const platformResponse = await prompts([
    {
      type: 'select',
      name: 'value',
      message: '📱 Select Platform:',
      choices: [
        {
          title: 'Web 🌐',
          description: 'Run the command for the Web platform.',
          value: 'web'
        },
        {
          title: 'Android 📱',
          description: 'Run the command for the Android platform.',
          value: 'android'
        },
        {
          title: 'iOS 🍏',
          description: 'Run the command for the iOS platform.',
          value: 'ios'
        }
      ],
      initial: 0
    }
  ])

  if (!platformResponse.value) {
    console.log('❌ No platform selected. Exiting...')
    return
  }

  const command = buildCommand(platformResponse.value)

  if (command) {
    console.log(`🌍 Starting command: ${command}`)
    runCommand(command)
  } else {
    console.log('❌ No valid command found. Exiting...')
  }
}

function buildCommand(platform) {
  const platforms = {
    android: 'yarn workspace @talkly/mobile android',
    ios: 'yarn workspace @talkly/mobile ios',
    web: 'yarn workspace @talkly/web dev'
  }
  return platform ? platforms[platform] : null
}

selectEnvironment()
