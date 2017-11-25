import awsStreams from '../aws-streams'
import { AWSStreamsApplicationOptionsValidationError } from '../aws-streams/model'
import dynamodbClientFactory from '../aws-streams/data-access/dynamodb/dynamodb-client-facade'
import * as bunyan from 'bunyan'

const logger = bunyan.createLogger({
  name: 'application-options-validation-spec'
})

const dynamoClient = dynamodbClientFactory({
  config: {
    endpoint: 'http://localhost:8000',
    region: 'eu-west-1'
  },
  logger
})

const failWithNoError = () => fail('error expected but was not called')

test('must not error when valid options are passed', async () => {
  const createTableResult = await createSampleTable('sample-table')

  const streamArn = createTableResult.LatestStreamArn!

  await awsStreams({
    streamArn,
    awsServiceConfigurationOptions: {
      endpoint: 'http://localhost:8000',
      region: 'eu-west-1'
    }
  })
  expect(true).toBe(true)
})

test('must fail when the stream ARN is not passed', async () => {
  try {
    await awsStreams({
      awsServiceConfigurationOptions: {
        region: 'eu-west-1'
      }} as any)
    failWithNoError()
  } catch (e) {
    expect(e instanceof AWSStreamsApplicationOptionsValidationError).toBe(true)
    expect(e.errors.length).toBe(1)
    expect(e.errors[0].message).toBe('should have required property \'streamArn\'')
  }
})

test('must fail when the stream ARN does not point to a valid stream', async () => {
  try {
    await awsStreams({
      streamArn: 'arn:aws:dynamodb:eu-west-1:733578946173:table/no-existant-table/stream/2017-10-05T14:36:01.514',
      awsServiceConfigurationOptions: {
        region: 'eu-west-1'
      }
    })
    failWithNoError()
  } catch (e) {
    expect(e instanceof Error)
    expect(e.message).toBe('Requested resource not found: Stream: arn:aws:dynamodb:eu-west-1:733578946173:table/no-existant-table/stream/2017-10-05T14:36:01.514 not found')
    expect(e.code).toBe('ResourceNotFoundException')
  }
})

async function createSampleTable (tableName: string) {
  return dynamoClient.createTableIfNotExists({
    TableName: tableName,
    AttributeDefinitions: [
      {
        AttributeName: 'sample-key',
        AttributeType: 'S'
      }
    ],
    KeySchema: [{
      AttributeName: 'sample-key',
      KeyType: 'HASH'
    }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    },
    StreamSpecification: {
      StreamEnabled: true,
      StreamViewType: 'NEW_IMAGE'
    }
  })
}
