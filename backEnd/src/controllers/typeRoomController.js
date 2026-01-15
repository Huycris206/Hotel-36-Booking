import TypeRoom from "../models/TypeRoom.js";

// Lấy danh sách tất cả loại phòng
export const getAllTypeRooms = async (req, res) => {
    try {
        const typeRooms = await TypeRoom.find();
        res.status(200).json(typeRooms);
    } catch (error) {
        console.error("Lỗi khi gọi getAllTypeRooms:", error);
        res.status(500).json({ message: "Lỗi hệ thống khi lấy danh sách loại phòng" });
    }
};

// Lấy chi tiết một loại phòng theo ID
export const getTypeRoomById = async (req, res) => {
    try {
        const typeRoom = await TypeRoom.findById(req.params.id);
        if (!typeRoom) {
            return res.status(404).json({ message: "Không tìm thấy loại phòng này" });
        }
        res.status(200).json(typeRoom);
    } catch (error) {
        console.error("Lỗi khi gọi getTypeRoomById:", error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
};

// Tạo loại phòng mới
export const createTypeRoom = async (req, res) => {
    try {
        const { name, amenities, price_hourly, price_additional_hour, price_daily, price_overnight, image_url } = req.body;
        
        const typeRoom = new TypeRoom({
            name,
            amenities,
            price_hourly,
            price_additional_hour,
            price_daily,
            price_overnight,
            image_url
        });
        const newTypeRoom=await typeRoom.save();
        // Trả về code 201 cho hành động tạo mới thành công
        res.status(201).json(newTypeRoom);
    } catch (error) {
        console.error("Lỗi khi gọi createTypeRoom:", error);
        res.status(500).json({ message: "Lỗi hệ thống khi tạo loại phòng" });
    }
};

// Cập nhật loại phòng
export const updateTypeRoom = async (req, res) => {
    try {
        const updatedTypeRoom = await TypeRoom.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true } 
        );
        if (!updatedTypeRoom) {
            return res.status(404).json({ message: "Không tìm thấy loại phòng để cập nhật" });
        }
        res.status(200).json(updatedTypeRoom);
    } catch (error) {
        console.error("Lỗi khi gọi updateTypeRoom:", error);
        res.status(500).json({ message: "Lỗi hệ thống khi cập nhật loại phòng" });
    }
};

// Xóa loại phòng
export const deleteTypeRoom = async (req, res) => {
    try {
        const deletedTypeRoom = await TypeRoom.findByIdAndDelete(req.params.id);
        if (!deletedTypeRoom) {
            return res.status(404).json({ message: "Không tìm thấy loại phòng để xóa" });
        }
        res.status(200).json({ message: "Xóa loại phòng thành công", data: deletedTypeRoom });
    } catch (error) {
        console.error("Lỗi khi gọi deleteTypeRoom:", error);
        res.status(500).json({ message: "Lỗi hệ thống khi xóa loại phòng" });
    }
};