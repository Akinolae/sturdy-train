import { response } from '../utils/index.utils'
import { StatusCodes } from 'http-status-codes'

class Riders {
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
}

const rider = new Riders()
Object.freeze(rider)

export { rider }
