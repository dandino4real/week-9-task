import express from 'express'
import logger from 'morgan'
import router from './routes/products'
import mongoose  from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

const app = express();

mongoose.connect(process.env.DATABASE_URL!, ()=>{
    console.log('database connected successfully');
    
})

app.use(express.json())
app.use(logger('dev'))


app.use('/products', router)


const port = process.env.PORT || 3000
app.listen(port, ()=>console.log(`sever running on http://localhost:${port}`)
)