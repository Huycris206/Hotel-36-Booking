import express from 'express';
import { 
    createUser, 
    getAllUsers, 
    getUserById, 
    updateUser, 
    deleteUser ,
    getProfile,
    updateProfile
} from '../controllers/userController.js';
import { getRoomById } from '../controllers/roomController.js';

const router = express.Router();
router.get('/profile', getProfile);     // GET http://localhost:5000/api/users/profile
router.post('/profile', updateProfile); // POST http://localhost:5000/api/users/profile

router.post('/', createUser);           // POST http://localhost:5000/api/users
router.get('/', getAllUsers);           // GET http://localhost:5000/api/users
router.get('/:id', getUserById);        // GET http://localhost:5000/api/users/:id
router.put('/:id', updateUser);         // PUT http://localhost:5000/api/users/:id
router.delete('/:id', deleteUser);      

export default router;