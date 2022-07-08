import { config } from 'dotenv'
import { DynamoConfig } from './interfaces/index.interfaces'

config()

const extractEnv = (): DynamoConfig => {
  return {
    accessKeyId: String(process.env.ACCESSKEY),
    region: String(process.env.REGION),
    secretKey: String(process.env.SECRETEKEY),
    version: 'latest',
  }
}

export default extractEnv
