import { DynamoDBStreams } from 'aws-sdk'
import { StreamProvider, StreamProviderParams } from './stream-provider'

export default (config?: DynamoDBStreams.ClientConfiguration): StreamProvider => {
  const client = new DynamoDBStreams(config)
  return {
    describeStream: (params: StreamProviderParams) => new Promise((resolve, reject) => client.describeStream(params, (err, data) => {
      if (err) { reject(err) } else { resolve(data) }
    }))
  }
}
