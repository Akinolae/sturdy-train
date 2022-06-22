import { response } from '../utils/index.utils'

class Riders {
  /**
   * register rider
   */
  public register = async (req: any, res: any) => {
    try {
      response({
        code: 200,
        message: req.body,
        status: true,
        res,
      })
    } catch (error: any) {
      response({
        code: 200,
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
