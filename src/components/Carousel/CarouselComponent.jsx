
import { h4, h5, h6 } from "../../assets/imgs/image"
import { Carousel } from "react-responsive-carousel";

function CarouselComponent() {
    return (
        <div>
            {/* Carousel */}
            <Carousel
                showThumbs={false}
                autoPlay
                infiniteLoop
                dynamicHeight={false}
                showStatus={false}
            >
                <div>
                    <img
                        src={h4}
                        height={'500px'}
                        alt="Mekong Delta"
                    />
                    <p className="legend">Khám Phá Đồng Bằng Sông Cửu Long</p>
                </div>
                <div>
                    <img
                        src={h5}
                        height={'500px'}
                        alt="Floating Market"
                    />
                    <p className="legend">Chợ Nổi Miền Tây</p>
                </div>
                <div>
                    <img
                        src={h6}
                        height={'500px'}
                        alt="Travel"
                    />
                    <p className="legend">Hành Trình Tuyệt Vời</p>
                </div>
            </Carousel>
        </div>
    )
}

export default CarouselComponent