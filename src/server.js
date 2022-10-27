import express from 'express'
import { connectDB } from './config/mongodb'
import { env } from '*/config/environment'

connectDB()
  .then(() => console.log('đã kết nối thành công'))
  .then(() => bootServer())
  .catch(error => {
    console.error(error)
    process.exit(1)
  })

const bootServer = () => {
  const app = express()

  app.get('/test', async (req, res) => {
    res.end('<h1> hello word <h1><hr/>')
  })

  app.listen(env.APP_PORT, env.APP_HOST_NAME, () => {
    console.log(`hello Quy,I am running at ${env.APP_HOSTNAME}:${env.APP_PORT}/`)
  })
}