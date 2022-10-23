import express  from "express";
import {mapOder} from '*/ultilities/Sắp xếp.js'
const app = express()
const hostname = 'localhost'
const port = 8017

app.get('/', (req, res)=>{
    res.end('<h1> hello word <h1><hr/>')
})

app.listen(port, hostname, ()=>{
    console.log(`hello Quy,I am running at ${hostname}:${port}/`)
})