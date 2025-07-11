import { domain } from '../domain';
// Hàm getAll_travels
export const getAll_tours = async () => {
    try {
        const response = await domain.get('api/getAll_tours');
        // Trả về dữ liệu từ API
        return response.data;
    } catch (error) {
        // Xử lý lỗi và trả về thông báo lỗi
        throw error.response?.data?.message || 'Something went wrong. Please try again.';
    }
};

export const getTourById = async (id) => {
    try {
        const response = await domain.get(`api/get_tour_byId/${id}`);
        // Trả về dữ liệu từ API
        return response.data;
    } catch (error) {
        // Xử lý lỗi và trả về thông báo lỗi
        throw error.response?.data?.message || 'Something went wrong. Please try again.';
    }
};

export const get_5_Tours = async () => {
    try {
        const response = await domain.get("api/get_5_tours");
        if (response.data.success) {
            return response.data.data;
        }
        return [];
    } catch (error) {
        console.error("Failed to fetch tours", error);
        return [];
    }
};


export const bookTour = async (bookingData) => {
    try {
        const response = await domain.post("api/create_booking", bookingData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Booking failed. Please try again later.";
    }
};
export const toursLocation = async (userPreferences) => {
    try {
        const { location } = userPreferences;

        if (!location) {
            throw new Error('Location parameter is required');
        }

        const response = await domain.get("/api/tour_ai", {
            params: { location },
            headers: { 'Accept': 'application/json' }
        });

        // Chỉ trả về mảng các ID tour
        return response.data?.data;

    } catch (error) {
        console.error('Error fetching tours:', error);
        throw error.response?.data?.message || error.message || "Failed to fetch tours";
    }
};