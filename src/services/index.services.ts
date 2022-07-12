import { Request, Response } from 'express'
import { rider } from '../controller/riders.controller'

export default {
  registerRider: (req: Request, res: Response) => {
    rider.register(req, res)
  },
  login: (req: Request, res: Response) => {
    rider.login(req, res)
  },
  getRider: (req: Request, res: Response) => {
    rider.getRider(req, res)
  },
  getAllRiders: (req: Request, res: Response) => {
    rider.getAllRiders(req, res)
  },
}
