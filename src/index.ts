import { config } from 'dotenv'
import express, { Application } from 'express'
import { route } from './routes/index.routes'
import bodyParser from 'body-parser'

config()
const app: Application = express()

app.use(bodyParser.json())
app.use('/Api/', route)
// app.use(bodyParser..urlencoded({ extended: false })

// console.log(mapper([], '1'))

// dbconfig("","localhost", "", "thegreatest22", 5432)
app.listen(4000, () => {
  console.log(`=== server started === ${4000}`)
})
