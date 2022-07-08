interface Response {
  message: any
  status?: boolean
  code?: number
  res: any
  data?: any
}

interface Rider {
  firstName: string
  lastName: string
  surname: string
  location: string
  phoneNumber: string
}

interface Orders {
  order: object
}

interface DynamoConfig {
  region: string
  version: string
  accessKeyId: string
  secretKey: string
}

interface Tables {
  TableNames?: any
}

interface DbParams {
  item: any
}

export { Response, Orders, DynamoConfig, Rider, Tables, DbParams }
