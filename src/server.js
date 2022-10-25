import express  from "express";
import { connectDB } from "*/config/mongodb";
import {env} from '*/config/environment'

const app = express()


connectDB().catch(console.log)

app.get('/', (req, res)=>{
    res.end('<h1> hello word <h1><hr/>')
})

app.listen(env.PORT, env.HOST_NAME, ()=>{
    console.log(`hello Quy,I am running at ${env.HOST_NAME}:${env.PORT}/`)
})