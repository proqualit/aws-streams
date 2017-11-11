import { DynamoDBStreams } from 'aws-sdk'

export default async (config?: DynamoDBStreams.ClientConfiguration) => {
  const client = new DynamoDBStreams(config)
  return {
    // todo supply type information
    describeStream: (params: any) => new Promise((resolve, reject) => client.describeStream(params, (err, data) => {
      if (err) { reject(err) } else { resolve(data) }
    }))
  }
}
