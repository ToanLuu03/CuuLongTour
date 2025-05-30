
import { h4, h5, h6 } from "../../assets/imgs/image"
import { Carousel } from "react-responsive-carousel";

function CarouselComponent() {
    return (
        <div className="pt-10" >
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
                    <p className="legend">Discover the Mekong Delta</p>
                </div>
                <div>
                    <img
                        src={h5}
                        height={'500px'}
                        alt="Floating Market"
                    />
                    <p className="legend">Western Floating Market</p>
                </div>
                <div>
                    <img
                        src={h6}
                        height={'500px'}
                        alt="Travel"
                    />
                    <p className="legend">Wonderful Journey</p>
                </div>
            </Carousel>
        </div>
    )
}

export default CarouselComponent