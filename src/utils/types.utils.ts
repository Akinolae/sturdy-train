interface Response {
  message: any
  status: boolean
  code?: number
  res: any
  data?: any
}

interface Orders {
  order: object
}

export { Response, Orders }
