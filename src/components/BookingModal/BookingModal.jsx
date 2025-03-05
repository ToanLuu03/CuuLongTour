import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
import { bookTour } from "../../services/Tour/Tour";
import { useParams } from "react-router-dom";

const BookingModal = ({ open, handleClose }) => {
    const { id } = useParams(); // Lấy tourId từ URL

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        numberOfPeople: 1,
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Full Name is required";
        if (!formData.phone.trim()) newErrors.phone = "Phone Number is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format";
        if (formData.numberOfPeople < 1) newErrors.numberOfPeople = "At least 1 person required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleBook = async () => {
        if (!validate()) return;
        setLoading(true);
        try {
            await bookTour({
                tourId: id,
                fullName: formData.name.trim(),
                phone: formData.phone.trim(),
                email: formData.email.trim(),
                numberOfPeople: formData.numberOfPeople,
            });
            setSuccessMessage("Booking successful!");
            setTimeout(() => {
                setSuccessMessage("");
                handleClose();
            }, 2000);
        } catch (error) {
            console.error("Booking failed:", error);
            setErrors({ api: "Booking failed. Please try again later." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Book This Tour</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 2 }}>
                    <TextField
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <TextField
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.phone}
                        helperText={errors.phone}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        label="Number of People"
                        name="numberOfPeople"
                        type="number"
                        value={formData.numberOfPeople}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.numberOfPeople}
                        helperText={errors.numberOfPeople}
                    />
                </Stack>
                {errors.api && <p style={{ color: "red" }}>{errors.api}</p>}
                {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="error">Cancel</Button>
                <Button onClick={handleBook} color="primary" disabled={loading}>
                    {loading ? "Booking..." : "Send Booking"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

BookingModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default BookingModal;
