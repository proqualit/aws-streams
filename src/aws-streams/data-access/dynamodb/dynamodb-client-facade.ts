import { DynamoDB } from 'aws-sdk'
import * as Logger from 'bunyan'

export default ({ config, logger }: DynamoDBClientFacadeParams): PromisifiedDynamoDBClient => {
  const client = new DynamoDB(config)

  const describeTable = (params: DynamoDB.DescribeTableInput): Promise<DynamoDB.DescribeTableOutput> => new Promise((resolve, reject) => client.describeTable(params, (err, data) => {
    if (err) { reject(err) } else { resolve(data) }
  }))

  const createTable = (params: DynamoDB.CreateTableInput): Promise<DynamoDB.TableDescription> => new Promise((resolve, reject) => client.createTable(params, (err, data) => {
    logger.info('Creating table \'%s\'', params.TableName)
    if (err) { reject(err) } else { resolve(data.TableDescription) }
  }))

  const tableExists = async (tableName: string): Promise<TableExistsResult> => {
    try {
      const result = await describeTable({ TableName: tableName })
      logger.info('Table \'%s\' exists', tableName)
      return { tableExists: true, table: result.Table }
    } catch (err) {
      if (err.code === 'ResourceNotFoundException') {
        logger.info('Table \'%s\' does not exist.', tableName)
        return { tableExists: false }
      }
      throw err
    }
  }

  const waitUntilActive = async (tableName: string) => {
    const data = await describeTable({ TableName: tableName })
    if (data.Table && !(data.Table.TableStatus === 'ACTIVE')) {
      logger.info('Waiting for table \'%s\' to become active', tableName)
      setTimeout(waitUntilActive, 100)
    } else {
      logger.info('Table \'%s\' is active', tableName)
    }
  }

  const createTableIfNotExists = async (params: DynamoDB.CreateTableInput): Promise<DynamoDB.TableDescription> => {
    const tableExistsResult = await tableExists(params.TableName)
    const table = await (tableExistsResult.tableExists
      ? tableExistsResult.table!
      : createTable(params))

    await waitUntilActive(params.TableName)

    return table
  }

  return {
    describeTable,
    createTable,
    createTableIfNotExists
  }
}

interface TableExistsResult {
  tableExists: boolean,
  table?: DynamoDB.TableDescription
}

export interface DynamoDBClientFacadeParams {
  config: DynamoDB.ClientConfiguration,
  logger: Logger
}

export interface PromisifiedDynamoDBClient {
  describeTable: (params: DynamoDB.DescribeTableInput) => Promise<DynamoDB.DescribeTableOutput>,
  createTable: (params: DynamoDB.CreateTableInput) => Promise<DynamoDB.TableDescription>
  createTableIfNotExists: (params: DynamoDB.CreateTableInput) => Promise<DynamoDB.TableDescription>
}
