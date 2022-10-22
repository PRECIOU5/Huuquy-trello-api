import  express  from 'express'
import {mapOrder} from './ultilities/Sắp xếp.js'
const app = express()
const hostname = 'localhost'
const port = 8017

app.get('/', (reg, res) => {
    res.end('<h1> hello word  <h1/>')
})
app.listen(port, hostname, () => {
    console.log(`hello quy i am running at ${hostname}:${port}/`)
})