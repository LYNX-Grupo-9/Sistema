
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import img1 from '../assets/image 2.svg';
import img2 from '../assets/image 3.svg';
import img3 from '../assets/image 6.svg';

import 'swiper/css';

const Carousel = () => {
  const slideStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  };

  const imageStyle = {
    width: '100%',
    maxWidth: '500px',
    height: 'auto',
  };

  return (
    <Swiper
      modules={[Autoplay]}
      loop={true}
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
      }}
      speed={800}
      spaceBetween={20}
      slidesPerView={1.5}
      centeredSlides={true}
    >
      <SwiperSlide>
        <div style={slideStyle}>
          <img src={img1} alt="Slide 1" style={imageStyle} />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div style={slideStyle}>
          <img src={img2} alt="Slide 2" style={imageStyle} />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div style={slideStyle}>
          <img src={img3} alt="Slide 3" style={imageStyle} />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div style={slideStyle}>
          <img src={img3} alt="Slide 3" style={imageStyle} />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;
