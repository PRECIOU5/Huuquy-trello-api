import express from 'express'
import { connectDB } from './config/mongodb'
import { env } from '*/config/environment'
import { apiV1} from '*/routes/v1'

connectDB()
  .then(() => console.log('đã kết nối thành công'))
  .then(() => bootServer())
  .catch(error => {
    console.error(error)
    process.exit(1)
  })

const bootServer = () => {
  const app = express()
  //enable req.body data
  app.use(express.json())
  //Use API
  app.use('/v1', apiV1)
  app.listen(env.APP_PORT, env.APP_HOST_NAME, () => {
    console.log(`hello Quy,I am running at ${env.APP_HOSTNAME}:${env.APP_PORT}/`)
  })
}