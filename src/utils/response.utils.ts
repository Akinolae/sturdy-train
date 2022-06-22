interface Response {
  message: any
  status: boolean
  code: number
  res: any
  data?: any
}

const response = (payLoad: Response) => {
  const { res, code, data, message, status } = payLoad

  return res.status(code).json({
    message,
    status,
    data,
  })
}

export default response
