import express from 'express';
import { 
    getAllTypeRooms, 
    getTypeRoomById, 
    createTypeRoom, 
    updateTypeRoom, 
    deleteTypeRoom 
} from '../controllers/typeRoomController.js';

const router = express.Router();

// Lấy danh sách tất cả loại phòng
router.get('/', getAllTypeRooms);

// Lấy chi tiết một loại phòng theo ID
router.get('/:id', getTypeRoomById);

// Tạo loại phòng mới
router.post('/', createTypeRoom);

// Cập nhật thông tin loại phòng
router.put('/:id', updateTypeRoom);

// Xóa loại phòng
router.delete('/:id', deleteTypeRoom);

export default router;