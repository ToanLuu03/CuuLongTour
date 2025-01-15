import { domain } from '../domain';
// Hàm getAll_travels
export const getAll_travels = async () => {
    try {
        const response = await domain.get('api/getAll_travels');
        // Trả về dữ liệu từ API
        return response.data;
    } catch (error) {
        // Xử lý lỗi và trả về thông báo lỗi
        throw error.response?.data?.message || 'Something went wrong. Please try again.';
    }
};

export const getTravelById = async (id) => {
    try {
        const response = await domain.get(`api/get_travels_byId/${id}`);
        // Trả về dữ liệu từ API
        return response.data;
    } catch (error) {
        // Xử lý lỗi và trả về thông báo lỗi
        throw error.response?.data?.message || 'Something went wrong. Please try again.';
    }
};