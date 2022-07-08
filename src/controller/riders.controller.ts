import DynamoInit from '../db/dynamo.db'
import extractEnv from '../aws.config'
import { delivery } from './index.controller'
import { StatusCodes } from 'http-status-codes'
import { response, validatorUtils } from '../utils/index.utils'

const db = new DynamoInit(extractEnv(), 'riders')

class Rider {
  /**
   * register rider
   */

  public register = async (req: any, res: any): Promise<void> => {
    const {
      email,
      firstName,
      lastName,
      surName,
      password,
      location,
      phoneNumber,
    } = req.body

    const dt = validatorUtils.regSchema.validate({
      ...req.body,
    })

    const hasError = dt.error?.message

    try {
      if (!!hasError) {
        response({
          code: StatusCodes.UNPROCESSABLE_ENTITY,
          message: hasError,
          res,
        })
      } else {
        const resp = await db.getItem({
          key: 'rider_email',
          value: email,
        })

        const data = !resp ? {} : resp
        const hasValues = Object.keys(data).length >= 1
        if (!hasValues) {
          await db.createNewItem({
            item: {
              rider_email: email,
              lastName,
              firstName,
              surName,
              phoneNumber,
              location,
              password: password,
            },
          })

          response({
            message: 'Registration was successful',
            res,
          })
        } else {
          response({
            message: `user with ${email} already exists`,
            code: StatusCodes.UNPROCESSABLE_ENTITY,
            res,
          })
        }
      }
    } catch (error: any) {
      response({
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || error,
        res,
      })
    }
  }

  public getRider = async (req: any, res: any) => {
    const location = req.params.location

    try {
      const riders = await db.getAllTableItems()
      const availableRiders = riders
        .filter(
          (rider: any) =>
            rider.location?.split(' ')[0].toLowerCase() ===
            location.toLowerCase()
        )
        .map((data: any) => ({
          location: data.location,
          username: `${data.firstName} ${data.lastName} ${data.surName}`,
        }))

      response({
        message: !availableRiders.length
          ? `There are no available riders in ${location} at the moment`
          : availableRiders,
        code: !availableRiders.length ? StatusCodes.NOT_FOUND : StatusCodes.OK,
        res,
      })
    } catch (error: any) {
      response({
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || error,
        res,
      })
    }
  }

  public currentOrder() {
    try {
      const allDeliveries = delivery.allOrders()
    } catch (error) {}
  }

  public cancelOrder() {}
}

const rider = new Rider()
Object.freeze(rider)

export { rider }
