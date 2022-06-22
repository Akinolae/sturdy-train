import { Request, Response } from 'express'
import { rider } from '../controller/riders.controller'

export default {
  registerRider: (req: Request, res: Response) => {
    console.log(req)
    rider.register(req, res)
  },
}
