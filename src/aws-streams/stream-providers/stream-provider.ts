export interface StreamProvider {
  describeStream: (params: DescribeStreamParams) => Promise<DescribeStreamResult>
}

export interface DescribeStreamParams {
  StreamArn: string
}

export interface DescribeStreamResult {
}
