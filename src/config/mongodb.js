import { MongoClient } from "mongodb";
import {env} from '*/config/environment'

export const connectDB = async()=>{

    const client = new MongoClient(env.MONGODB_URI,{
        useUnifiedTopology :true,
        useNewUrlParser :true,
    })

    try {
       
        //kết nối đến server
        await client.connect()
        console.log(`Connect thành công đến server`)
        //danh sach database
        await listDatabases(client)

    }finally{
        //đảm bảo client sẽ đóng khi hoàn thành hoặc lỗi
        await client.close()
    }
}
const listDatabases = async(client)=>{
    const databasesList = await client.db().admin().listDatabases()
    console.log(databasesList)
    console.log(`your database`)
    databasesList.databases.forEach(db => console.log(`- ${db.name}`))
}