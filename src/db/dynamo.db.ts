import Aws from 'aws-sdk'
import { DynamoConfig, Tables, DbParams } from '../interfaces/index.interfaces'

class DynamoInit {
  private config: DynamoConfig
  private table: string

  constructor(dynamoConfig: DynamoConfig, table: string) {
    this.config = dynamoConfig
    this.table = table
  }

  private dynamoConfig = (): any => {
    const { region, accessKeyId, secretKey } = this.config
    const config = Aws.config.update({
      region: region,
      apiVersion: 'latest',
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretKey,
        sessionToken: '',
      },
    })

    return config
  }

  private hasTable = async (): Promise<any> => {
    this.dynamoConfig()

    /*
        checks is the table specified in the config exists 
        before carrying out any request

    */
    const tables: Tables = await this.getTables()
    const tableExists: boolean = tables.TableNames.includes(this.table)
    if (tableExists) return tableExists
    else throw new Error(`table "${this.table.toUpperCase()}" doesn't exist`)
  }

  /*
    gets all the tables associated with the user

    */

  private getTables = async (): Promise<object> => {
    this.dynamoConfig()
    const db = new Aws.DynamoDB()
    try {
      const tables = await db.listTables().promise()
      return tables
    } catch (error: any) {
      throw new Error(error)
    }
  }

  public getAllTableItems = async (): Promise<void> => {
    this.dynamoConfig()
    const tableExists = await this.hasTable()
    if (!tableExists) return
    else {
      console.log('Table exists')
    }
  }

  public createNewItem = async (params: DbParams): Promise<any> => {
    this.dynamoConfig()
    const db = new Aws.DynamoDB()
    const data = {
      TableName: this.table,
      Item: params.item,
    }
    let res

    try {
      if (await this.hasTable()) {
        res = await db.putItem(data).promise()
      }
      return res
    } catch (error) {
      throw error
    }
  }

  public queryDb = async (params: any): Promise<any> => {
    this.dynamoConfig()
    const db = new Aws.DynamoDB()
    const data = {
      TableName: this.table,
      KeyConditionExpression: params.value,
    }

    try {
      let res = await db.query(data).promise()
      return res
    } catch (error) {
      throw error
    }
  }

  public getItem = async (params: any): Promise<any> => {
    this.dynamoConfig()
    let res

    const db = new Aws.DynamoDB()
    const data = {
      TableName: this.table,

      Key: {
        [params.key]: String(params.value),
      },
    }

    try {
      if (await this.hasTable()) {
        res = await db.query(data).promise()
      }
      return res
    } catch (error) {
      throw error
    }
  }
}

export default DynamoInit
