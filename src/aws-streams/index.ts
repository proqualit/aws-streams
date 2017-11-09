import * as ajvFactory from 'ajv'
import validateApplicationOptions from './validate-application-options'
import {ApplicationOptions} from './model'
import streamProviderFactory from './stream-providers/stream-provider-factory'

const ajv = ajvFactory({allErrors: true})

const run = async (applicationOptions: ApplicationOptions) => {
  async function createStreamProvider() {
    return await streamProviderFactory(applicationOptions)
  }

  async function ensureStream(streamProvider) {
    await streamProvider.describeStream({StreamArn: applicationOptions.streamArn})
  }

  validateApplicationOptions(applicationOptions)
  const streamProvider = await createStreamProvider()
  await ensureStream(streamProvider)
}

export default (applicationOptions: ApplicationOptions) => {
  return run(applicationOptions)  
}
