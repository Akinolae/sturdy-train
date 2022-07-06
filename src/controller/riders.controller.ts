import { config } from 'dotenv'
import { delivery } from './index.controller'
import { response } from '../utils/index.utils'
import { StatusCodes } from 'http-status-codes'
import DynamoInit from '../db/dynamo.db'

config()

const db = new DynamoInit(
  {
    accessKeyId: String(process.env.ACCESSKEY),
    region: String(process.env.REGION),
    secretKey: String(process.env.SECRETEKEY),
    version: 'latest',
  },
  'riders'
)

class Rider {
  /**
   * register rider
   */

  public register = async (req: any, res: any): Promise<void> => {
    const { email, firstName, lastName, surName, password, location } = req.body
    try {
      if (!email || !firstName) {
        response({
          code: StatusCodes.UNPROCESSABLE_ENTITY,
          message: 'email and name is required',
          status: false,
          res,
        })
      } else {
        const resp = await db.getItem({
          key: 'rider_email',
          value: {
            S: email,
          },
        })
        const data = !resp ? {} : resp
        const hasValues =
          typeof resp !== undefined && Object.keys(data).length >= 1
        if (!hasValues) {
          await db.createNewItem({
            item: {
              rider_email: { S: email },
              lastName: { S: lastName },
              firstName: { S: firstName },
              surName: { S: surName },
              location: { S: location },
              password: { S: password },
            },
          })

          response({
            message: 'Registration was successful',
            status: true,
            res,
          })
        } else {
          response({
            message: `user with ${email} already exists`,
            status: true,
            code: StatusCodes.UNPROCESSABLE_ENTITY,
            res,
          })
        }
      }
    } catch (error: any) {
      response({
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || error,
        status: false,
        res,
      })
    }
  }

  /**
   * Get current order
   */
  public currentOrder() {
    try {
      const allDeliveries = delivery.allOrders()
    } catch (error) {}
  }

  /**
   * cancelOrder
   */
  public cancelOrder() {}
}

const rider = new Rider()
Object.freeze(rider)

export { rider }
