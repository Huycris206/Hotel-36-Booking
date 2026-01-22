import "dotenv/config";
import express from 'express';
import roomRoute from './routes/roomRoutes.js';
import TypeRoomRoute from "./routes/typeRoomRoutes.js";
import User from "./routes/userRoutes.js";
import Booking from "./routes/bookingRouters.js";
import Payment from "./routes/paymentRouters.js";
import Verfication from "./routes/verficationRoutes.js";
import Auth from "./routes/authRoutes.js";
import { connectDB } from './config/db.js';
import cors from 'cors';

const app=express();
connectDB();
app.use(cors());
app.use(express.json());


app.use('/api/auth',Auth);
app.use('/api/verfications',Verfication);
app.use('/api/bookings',Booking);
app.use('/api/users',User);
app.use('/api/rooms',roomRoute);
app.use('/api/typeRooms',TypeRoomRoute);
app.use('/api/payments',Payment);
app.listen(5001,()=>{
    console.log('server nghe tren 5001');
});