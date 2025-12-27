import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const slides = [
  {
    image: "/assets/images/university-main.jpg",
  
  },
  {
    image: "/assets/images/society-event.jpg",
   
  },
  {
    image: "/assets/images/pg-block.jpg",
    
  },
];

/**
 * @description Refined Hero carousel with Gold/Blue branding and Glassmorphism.
 */
export default function HeroSlider() {
  return (
    <div className="w-full h-[400px] md:h-[600px] relative overflow-hidden rounded-[2.5rem] border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-slate-900">
      <Swiper
        effect={"fade"}
        speed={1000}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true 
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div 
              className="relative w-full h-full bg-cover bg-center transition-transform duration-[6000ms] ease-linear transform scale-100"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay: Blue to Black Gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#020617] via-transparent to-black/20" />
              
              {/* Content Box */}
              <div className="absolute bottom-12 left-10 md:bottom-20 md:left-16 z-10 max-w-lg">
                <div className="bg-slate-900/40 backdrop-blur-md border-l-4 border-[#FFD700] p-6 rounded-r-2xl shadow-2xl">
                  <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                    {slide.title}
                  </h2>
                  <p className="text-[#FFD700] text-sm md:text-lg font-medium opacity-90 uppercase tracking-widest">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Global CSS override for Swiper Buttons to match Theme */}
      <style jsx global>{`
        .swiper-button-next, .swiper-button-prev {
          color: #FFD700 !important;
          background: rgba(15, 23, 42, 0.5);
          width: 50px !important;
          height: 50px !important;
          border-radius: 50%;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 215, 0, 0.2);
          transform: scale(0.7);
        }
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 20px !important;
          font-weight: bold;
        }
        .swiper-pagination-bullet-active {
          background: #FFD700 !important;
        }
      `}</style>
    </div>
  );
}