import PropTypes from "prop-types"; // Import PropTypes
import { Carousel } from "react-responsive-carousel";

const ImageCarousel = ({ images, altText, widthImg, heightImg }) => {
    const imageWidth = widthImg ? widthImg : "100%";
    const imageHeight = heightImg ? heightImg : "300px"; // Default height is 300px if not provided

    return (
        <Carousel
            showThumbs={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={3000}
            showStatus={false}
            showIndicators={true}
            dynamicHeight={true}
        >
            {images.map((image, index) => (
                <div key={index}>
                    <img
                        src={image}
                        alt={`${altText} - Image ${index + 1}`}
                        style={{
                            objectFit: "cover",
                            width: imageWidth,
                            height: imageHeight,
                        }}
                    />
                </div>
            ))}
        </Carousel>
    );
};

// Define prop types for the component
ImageCarousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired, // Array of image URLs
    altText: PropTypes.string.isRequired, // Alt text for images
    widthImg: PropTypes.string, // Optional width prop
    heightImg: PropTypes.string, // Optional height prop
};

export default ImageCarousel;
