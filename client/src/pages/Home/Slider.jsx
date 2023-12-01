import React from 'react'
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import imagePath1 from '../../assets/image1.jpg';
import imagePath2 from '../../assets/image2.jpg';
import imagePath3 from '../../assets/image3.jpg';

const Slider = () => {
    return (
        <div className='w-full h-72'>
            <Carousel autoPlay interval={3000} infiniteLoop showStatus={false} showThumbs={false}>
                <div>
                    <img src={imagePath1} alt="Image 1" height='288px' />
                </div>
                <div>
                    <img src={imagePath2} alt="Image 2" height='288px' />
                </div>
                <div>
                    <img src={imagePath3} alt="Image 3" height='288px' />
                </div>
            </Carousel>
        </div>
    )
}

export default Slider