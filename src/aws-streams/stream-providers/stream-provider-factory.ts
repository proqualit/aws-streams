import dynamodbStreamProvider from './dynamodb-stream-provider'
import {ApplicationOptions} from '../model'

export default (applicationOptions: ApplicationOptions) => {
  return dynamodbStreamProvider(applicationOptions.awsServiceConfigurationOptions)
}