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
          key: 'rider_id',
          value: {
            S: 1,
          },
        })

        response({
          message: resp,
          status: true,
          res,
        })
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
