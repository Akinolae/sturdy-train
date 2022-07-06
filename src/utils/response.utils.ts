import { StatusCodes } from 'http-status-codes'
import { Response } from '../interfaces/index.interfaces'

const response = ({
  code = StatusCodes.OK,
  message,
  res,
  status,
  data,
}: Response) => {
  return res.status(code).json({
    message,
    status,
    data,
  })
}

export default response
