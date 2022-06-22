import { StatusCodes } from 'http-status-codes'
interface Response {
  message: any
  status: boolean
  code?: number
  res: any
  data?: any
}

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
