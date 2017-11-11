import awsStreams from '../aws-streams'
import {AWSStreamsApplicationOptionsValidationError} from '../aws-streams/model'
import './support/jest-extensions/custom-matchers'

const failWithNoError = () => fail('error expected but was not called')

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
    await awsStreams({streamArn: 'arn:aws:dynamodb:eu-west-1:733578946173:table/no-existant-table/stream/2017-10-05T14:36:01.514', awsServiceConfigurationOptions: {
      region: 'eu-west-1'
    }})
    failWithNoError()
  } catch (e) {
    expect(e instanceof Error)
    expect(e.message).toBe('Requested resource not found: Stream: arn:aws:dynamodb:eu-west-1:733578946173:table/no-existant-table/stream/2017-10-05T14:36:01.514 not found')
    expect(e.code).toBe('ResourceNotFoundException')
  }
})