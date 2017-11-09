import * as ajvFactory from 'ajv'
import validateApplicationOptions from './validate-application-options'
import {ApplicationOptions} from './model'

const ajv = ajvFactory({allErrors: true})

export default (applicationOptions: ApplicationOptions) => {
  validateApplicationOptions(applicationOptions)
  console.log('awsStreamOptions', applicationOptions)
}
