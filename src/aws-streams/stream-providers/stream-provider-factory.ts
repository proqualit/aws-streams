import {ApplicationOptions} from '../model'
import dynamodbStreamProvider from './dynamodb-stream-provider'

export default (applicationOptions) => {
  return dynamodbStreamProvider({})
}