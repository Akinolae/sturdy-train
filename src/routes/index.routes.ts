import router from 'express'
import rider from '../services/index.services'
import deliveryServices from '../services/delivery.services'

const route = router.Router()

/*
rider routes
*/
route.get('/allRiders', rider.getAllRiders)
route.get('/get-rider/:location', rider.getRider)
route.post('/register-rider', rider.registerRider)
route.post('/rider-login', rider.login)

/* 
delivery routes
*/
route.get('/delivery', deliveryServices.getDelivery)
export { route }
