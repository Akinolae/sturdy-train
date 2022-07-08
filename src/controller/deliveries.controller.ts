import extractEnv from '../aws.config'
import DynamoInit from '../db/dynamo.db'
import { response } from '../utils/index.utils'
import { StatusCodes } from 'http-status-codes'

const db = new DynamoInit(extractEnv(), 'deliveries')

class Delivery {
  /**
   * getDelivery
   */
  public getDelivery = async (req: any, res: any) => {
    try {
      const resp = await db.getItem({
        key: 'delivery_id',
        value: {
          S: '1',
        },
      })

      response({
        message: resp,
        status: true,
        res,
      })
    } catch (error: any) {
      response({
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || error,
        status: false,
        res,
      })
    }

    // response({})
  }
}

const delivery = new Delivery()
Object.freeze(delivery)

export { delivery }
