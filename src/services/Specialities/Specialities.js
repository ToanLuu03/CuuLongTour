import { domain } from '../domain';
// Hàm getAll_travels
export const getAll_Specialty= async () => {
    try {
        const response = await domain.get('api/getAll_specialty');
        // Trả về dữ liệu từ API
        return response.data;
    } catch (error) {
        // Xử lý lỗi và trả về thông báo lỗi
        throw error.response?.data?.message || 'Something went wrong. Please try again.';
    }
};

export const getSpecialtyById = async (id) => {
    try {
        const response = await domain.get(`api/getAll_specialty_byId/${id}`);
        // Trả về dữ liệu từ API
        return response.data;
    } catch (error) {
        // Xử lý lỗi và trả về thông báo lỗi
        throw error.response?.data?.message || 'Something went wrong. Please try again.';
    }
};