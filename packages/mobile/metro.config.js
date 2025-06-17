const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config')
const exclusionList = require('metro-config/src/defaults/exclusionList')
const {getMetroTools, getMetroAndroidAssetsResolutionFix} = require('react-native-monorepo-tools')
const monorepoMetroTools = getMetroTools()

const androidAssetsResolutionFix = getMetroAndroidAssetsResolutionFix()

const path = require('path')
const packagesSharedWorkspace = path.resolve(path.join(__dirname, '../shared'))

const watchFolders = [
  packagesSharedWorkspace,
  path.resolve(__dirname, './node_modules/@talkly/shared')
]

const nodeModulesPaths = [path.resolve(path.join(__dirname, './node_modules'))]
/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  watchFolders,
  transformer: {
    publicPath: androidAssetsResolutionFix.publicPath,
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: true,
        inlineRequires: true
      }
    }),
    minifierConfig: {
      keep_classnames: false,
      keep_fnames: false,
      mangle: true,
      output: {ascii_only: true},
      toplevel: true,
      compress: {
        arguments: true,
        booleans_as_integers: true,
        drop_console: true // Removes console logs
      }
    }
  },
  resolver: {
    // "Please use our `node_modules` instance of these packages"
    resolveRequest: (context, moduleName, platform) => {
      if (
        // Add to this list whenever a new React-reliant dependency is added
        moduleName.startsWith('react') ||
        moduleName.startsWith('@react-native')
      ) {
        const pathToResolve = path.resolve(__dirname, 'node_modules', moduleName)
        return context.resolveRequest(context, pathToResolve, platform)
      }
      // Optionally, chain to the standard Metro resolver.
      return context.resolveRequest(context, moduleName, platform)
    },
    blockList: exclusionList(monorepoMetroTools.blockList),
    extraNodeModules: monorepoMetroTools.extraNodeModules,
    nodeModulesPaths
  },
  server: {
    // ...and to the server middleware.
    enhanceMiddleware: (middleware) => {
      return androidAssetsResolutionFix.applyMiddleware(middleware)
    }
  }
}

module.exports = mergeConfig(getDefaultConfig(__dirname), config)
