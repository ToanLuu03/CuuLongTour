import { domain } from '../domain';
// Hàm getAll_travels
export const getAll_Hotels = async () => {
    try {
        const response = await domain.get('api/getAll_hotels');
        // Trả về dữ liệu từ API
        return response.data;
    } catch (error) {
        // Xử lý lỗi và trả về thông báo lỗi
        throw error.response?.data?.message || 'Something went wrong. Please try again.';
    }
};

export const getHotelById = async (id) => {
    try {
        const response = await domain.get(`api/get_hotel_byId/${id}`);
        // Trả về dữ liệu từ API
        return response.data;
    } catch (error) {
        // Xử lý lỗi và trả về thông báo lỗi
        throw error.response?.data?.message || 'Something went wrong. Please try again.';
    }
};

export const get_5_Hotels = async () => {
    try {
        const response = await domain.get("api/get_5_hotels");
        if (response.data.success) {
            return response.data.data;
        }
        return [];
    } catch (error) {
        console.error("Failed to fetch tours", error);
        return [];
    }
};