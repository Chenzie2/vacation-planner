import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const DestinationCard = ({ destination }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    if (destination?.id) {
      navigate(`/destination/${destination.id}`);
    } else {
      console.error("Destination ID is missing, cannot navigate.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100 h-full">
      <div className="h-48 relative">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          navigation={true}
          modules={[Navigation]}
          className="w-full h-full"
        >
          {destination.images?.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`${destination.name} ${index + 1}`}
                className="w-full h-48 object-cover rounded-t-2xl"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">{destination.name}</h3>
        <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-3 flex-grow">
          {destination.description}
        </p>

        <div className="mt-auto flex justify-between items-center pt-3">
          {destination.price !== undefined ? (
            <span className="text-indigo-600 font-bold text-sm md:text-base">
              Ksh {destination.price.toLocaleString()}
            </span>
          ) : (
            <span className="text-gray-400 text-sm">Price N/A</span>
          )}

          <button
            onClick={handleDetailsClick}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm md:text-base font-medium transition-colors"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
