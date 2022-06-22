import router from 'express'
import rider from '../services/register.services'

const route = router.Router()

route.get('/', rider.registerRider)
route.post('/register-rider', rider.registerRider)

export { route }
