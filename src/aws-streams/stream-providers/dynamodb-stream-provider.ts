import { DynamoDBStreams } from 'aws-sdk'
import client from '../data-access/dynamodb/dynamodb-streams-client-facade'

export default async (config?: DynamoDBStreams.ClientConfiguration) => {
  return client(config)
}
