import DynamoInit from '../db/dynamo.db'
import extractEnv from '../aws.config'
import { StatusCodes } from 'http-status-codes'
import { response, validatorUtils, user } from '../utils/index.utils'
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
          const hash = await user.hashPassword(password)
          await db.createNewItem({
            item: {
              rider_email: email,
              lastName,
              firstName,
              surName,
              phoneNumber,
              location,
              password: hash,
              created: new Date().toISOString(),
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

  public login = async (req: any, res: any): Promise<void> => {
    try {
      const dt = validatorUtils.login.validate({
        ...req.body,
      })
      const hasError = dt.error?.message
      if (!!hasError) {
        response({
          code: StatusCodes.UNPROCESSABLE_ENTITY,
          message: hasError,
          res,
        })
      } else {
        const { email, userPassword } = req.body
        const resp = await db.getItem({
          key: 'rider_email',
          value: email,
        })
        const data = !resp ? {} : resp
        const hasValues = Object.keys(data).length >= 1
        if (hasValues) {
          const { password } = data

          if (await user.decryptPassword(userPassword.trim(), password)) {
            response({
              message: {
                firstName: data.firstName,
                lastName: data.lastName,
                surnaame: data.surName,
              },
              res,
            })
          } else
            response({
              code: StatusCodes.UNAUTHORIZED,
              message: 'Invalid login parameters',
              res,
            })
        } else
          response({
            code: StatusCodes.UNAUTHORIZED,
            message: 'Invalid login parameters',
            res,
          })
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

  public getAllRiders = async (req: any, res: any): Promise<void> => {
    try {
      const allRiders = await db.getAllTableItems()
      response({
        message: allRiders.map((rider: any) => ({
          location: rider.location,
          username: `${rider.firstName} ${rider.lastName} ${rider.surName}`,
          created: rider.created,
          number: rider.phoneNumber,
        })),
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

  public cancelOrder() {}
}

const rider = new Rider()
Object.freeze(rider)

export { rider }
