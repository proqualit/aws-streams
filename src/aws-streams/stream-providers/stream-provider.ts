export interface StreamProvider {
  describeStream: (params: StreamProviderParams) => Promise<DescribeStreamResult>
}

export interface StreamProviderParams {
  StreamArn: string
}

export interface DescribeStreamResult {
}
