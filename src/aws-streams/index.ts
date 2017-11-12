import validateApplicationOptions from './validate-application-options'
import { ApplicationOptions } from './model'
import streamProviderFactory from './stream-providers/stream-provider-factory'
import { StreamProvider } from './stream-providers/stream-provider'

const run = async (applicationOptions: ApplicationOptions) => {
  async function createStreamProvider () {
    return streamProviderFactory(applicationOptions)
  }

  async function ensureStream (streamProvider: StreamProvider) {
    await streamProvider.describeStream({ StreamArn: applicationOptions.streamArn })
  }

  validateApplicationOptions(applicationOptions)
  const streamProvider = await createStreamProvider()
  await ensureStream(streamProvider)
}

export default (applicationOptions: ApplicationOptions) => {
  return run(applicationOptions)
}
