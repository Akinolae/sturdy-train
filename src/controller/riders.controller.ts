import { response } from '../utils/index.utils'
import { StatusCodes } from 'http-status-codes'
import { delivery } from './index.controller'
import pg from '../utils/knexConfig'

class Rider {
  /**
   * register rider
   */
  public register = async (req: any, res: any) => {
    const { email, name } = req.body
    try {
      if (!email || !name) {
        response({
          code: StatusCodes.UNPROCESSABLE_ENTITY,
          message: 'email and name is required',
          status: false,
          res,
        })
      } else {
        response({
          message: req.body,
          status: true,
          res,
        })
      }
    } catch (error: any) {
      response({
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message,
        status: true,
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
