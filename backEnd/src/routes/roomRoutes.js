import express from 'express';
import { getAllRooms,createRoom, deleteRoom, updateRoom,getRoomById } from '../controllers/roomController.js';
const router=express.Router();

router.get('/:id',getRoomById);

router.get('/',getAllRooms);

router.post('/',createRoom);

router.put('/:id',updateRoom);

router.delete('/:id',deleteRoom);
export default router;
