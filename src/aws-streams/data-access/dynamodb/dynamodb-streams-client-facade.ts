import { DynamoDBStreams } from 'aws-sdk'

export default (config?: DynamoDBStreams.ClientConfiguration) => {
  const client = new DynamoDBStreams(config)
  return {
    describeStream: (params: DynamoDBStreams.DescribeStreamInput) => new Promise((resolve, reject) => client.describeStream(params, (err, data) => {
      if (err) { reject(err) } else { resolve(data) }
    }))
  }
}

export interface PromisifiedDynamoDBStreamsClient {
  describeStream: (params: DynamoDBStreams.DescribeStreamInput) => Promise<DynamoDBStreams.DescribeStreamOutput>
}
