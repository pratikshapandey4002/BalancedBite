import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.port || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('mongoDB connected successfully');

        app.listen(PORT, ()=>{
            console.log('server is running on port 5000');
        });
})
.catch(err=>{
    console.error('MongoBd connection error:',err);
    process.exit(1);

    app.get('/', (req,res)=>{
        res.send('API is running!');
    })
});