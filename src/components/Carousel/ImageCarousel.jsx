import PropTypes from "prop-types"; // Import PropTypes
import { Carousel } from "react-responsive-carousel";

const ImageCarousel = ({ images, altText }) => {
    return (
        <Carousel
            showThumbs={false}    // Tắt hình thu nhỏ (thumbnail)
            infiniteLoop={true}   // Lặp vô hạn
            autoPlay={true}       // Tự động phát
            interval={3000}       // Khoảng thời gian chuyển đổi giữa các ảnh (3 giây)
            showStatus={false}    // Tắt hiển thị trạng thái hiện tại
            showIndicators={true} // Hiển thị các chỉ báo (dots)
            dynamicHeight={true}  // Cân chỉnh chiều cao carousel tùy theo nội dung ảnh
        >
            {images.map((image, index) => (
                <div key={index}>
                    <img
                        src={image}
                        alt={`${altText} - Image ${index + 1}`}
                        style={{ objectFit: "cover", width: "100%", height: "300px" }}
                    />
                </div>
            ))}
        </Carousel>
    );
};

// Định nghĩa kiểu dữ liệu cho props
ImageCarousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired, // Mảng các URL hình ảnh
    altText: PropTypes.string.isRequired, // Văn bản mô tả cho hình ảnh
};

export default ImageCarousel;
