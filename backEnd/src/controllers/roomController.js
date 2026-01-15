import Room from "../models/Room.js";
import TypeRoom from "../models/TypeRoom.js";

export const getAllRooms= async (req,res)=>{
    try{
        const rooms=await Room.find();
        res.status(200).json(rooms);
    }catch(error){
        console.error("lỗi khi gọi getAllRooms",error);
        res.status(500).json({message:"lỗi hệ thống"});
    }
}
export const getRoomById = async (req, res) => {
    try {
        const Room = await TypeRoom.findById(req.params.id);
        if (!Room) {
            return res.status(404).json({ message: "Không tìm thấy phòng này" });
        }
        res.status(200).json(Room);
    } catch (error) {
        console.error("Lỗi khi gọi getRoomById:", error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
};
export const createRoom=async (req,res)=>{
    try{
        const { type, name } = req.body;
        const room = new Room({
            type,
            name
        });
        // BƯỚC KIỂM TRA: Tìm xem loại phòng này có tồn tại không
        const existingType = await TypeRoom.findById(type);
        
        if (!existingType) {
            return res.status(404).json({ 
                message: "Không thể tạo phòng vì mã loại phòng (type ID) không hợp lệ hoặc không tồn tại." 
            });
        }
        const newRoom = await room.save();
        res.status(201).json(newRoom);
    }catch(error){
        console.error("lỗi khi gọi createRoom",error);
        res.status(500).json({message:"lỗi hệ thống"});
    }
}
export const updateRoom=async(req,res)=>{
    try {
        const updateRoom = await Room.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true } // Trả về object sau khi đã cập nhật
        );
        if(!updateRoom){
            return res.status(404).json({message:"không tìm thấy phòng"});
        }
        res.status(200).json(updateRoom);
    } catch (error) {
        console.error("lỗi khi gọi updateRoom",error);
        res.status(500).json({message:"lỗi hệ thống"});
    }
}
export const deleteRoom=async(req,res)=>{
    try {
        const deleteRoom =await Room.findByIdAndDelete(req.params.id);
         if(!deleteRoom){
            return res.status(404).json({message:"không tìm thấy phòng để xóa"});
        }
        res.status(200).json(deleteRoom);
    } catch (error) {
        console.error("lỗi khi gọi deleteRoom",error);
        res.status(500).json({message:"lỗi hệ thống"});
    }
}