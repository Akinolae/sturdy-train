import router from 'express'
import rider from '../services/register.services'
import deliveryServices from '../services/delivery.services'

const route = router.Router()

route.get('/', rider.registerRider)
route.get('/delivery', deliveryServices.getDelivery)
route.post('/register-rider', rider.registerRider)

export { route }
