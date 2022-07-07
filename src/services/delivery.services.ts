import { Request, Response } from 'express'
import { delivery } from '../controller/deliveries.controller'

export default {
  getDelivery: (req: Request, res: Response) => {
    delivery.getDelivery(req, res)
  },
}
