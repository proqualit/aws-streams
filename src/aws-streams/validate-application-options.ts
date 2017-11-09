import * as ajvFactory from 'ajv'
import {ApplicationOptions, AWSStreamsApplicationOptionsValidationError} from './model'

const ajv = ajvFactory({allErrors: true})

export default (applicationOptions: ApplicationOptions) => {
  const applicationOptionsSchema = {
    type: 'object',
    properties: {
      streamArn: {
        type: 'string'
      }
    },
    required: ['streamArn']
  }
  if (!ajv.validate(applicationOptionsSchema, applicationOptions)) {
    console.log('validation failed')
    throw new AWSStreamsApplicationOptionsValidationError(ajv.errors)
  }
}
