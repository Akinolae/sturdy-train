import router from 'express'
import rider from '../services/index.services'
import deliveryServices from '../services/delivery.services'

const route = router.Router()

route.get('/', rider.registerRider)
route.get('/delivery', deliveryServices.getDelivery)
route.post('/register-rider', rider.registerRider)
route.get('/get-rider/:location', rider.getRider)

export { route }
