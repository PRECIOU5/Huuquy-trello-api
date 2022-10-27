import { MongoClient } from 'mongodb'
import { env } from '*/config/environment'

let dbInstance = null

export const connectDB = async() => {
  const client = new MongoClient(env.MONGODB_URI, {
    useUnifiedTopology :true,
    useNewUrlParser :true
  })
  //kết nối đến server
  await client.connect()
  //gán client vàodbInstance
  dbInstance= client.db(env.DATABASE_NAME)
}
// lấy database instance
export const getDB = () => {
  if (!dbInstance) throw new Error('Phải kết nối với database trước')
  return dbInstance
}