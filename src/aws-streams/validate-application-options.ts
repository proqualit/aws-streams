import * as ajvFactory from 'ajv'
import {ApplicationOptions, AWSStreamsApplicationOptionsValidationError} from './model'

const ajv = ajvFactory({allErrors: true})

export default (applicationOptions: ApplicationOptions) => {
  const applicationOptionsSchema = {
    type: 'object',
    properties: {
      streamEndpoint: {
        type: 'string'
      }
    },
    required: ['streamEndpoint']
  }
  if (!ajv.validate(applicationOptionsSchema, applicationOptions)) {
    console.log('validation failed')
    throw new AWSStreamsApplicationOptionsValidationError(ajv.errors)
  }
}
