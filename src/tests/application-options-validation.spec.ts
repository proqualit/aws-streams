import awsStreams from '../aws-streams'
import {AWSStreamsApplicationOptionsValidationError} from '../aws-streams/model'
import './support/jest-extensions/custom-matchers'

test('must fail when the stream endpoint is not passed', () => {
  expect(() => awsStreams({} as any)).toThrowWithCallback(err => {
    expect(err instanceof AWSStreamsApplicationOptionsValidationError).toBe(true)
    expect(err.errors.length).toBe(1)
    expect(err.errors[0].message).toBe('should have required property \'streamEndpoint\'')
  })
})