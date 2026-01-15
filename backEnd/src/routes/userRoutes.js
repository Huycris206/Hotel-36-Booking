import express from 'express';
import { 
    createUser, 
    getAllUsers, 
    getUserById, 
    updateUser, 
    deleteUser 
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', createUser);           // POST http://localhost:5000/api/users
router.get('/', getAllUsers);           // GET http://localhost:5000/api/users
router.get('/:id', getUserById);        // GET http://localhost:5000/api/users/:id
router.put('/:id', updateUser);         // PUT http://localhost:5000/api/users/:id
router.delete('/:id', deleteUser);      // DELETE http://localhost:5000/api/users/:id

export default router;