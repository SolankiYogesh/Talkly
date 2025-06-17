import isRN from '../Helpers/isRN'

let BaseUrl: string
if (isRN) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  BaseUrl = require('./BaseUrl.native')?.default
} else {
  BaseUrl = require('./BaseUrl.web')
}

export default BaseUrl
