import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const DestinationCard = ({ destination }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    if (destination?.id) navigate(`/destination/${destination.id}`);
  };

  return (
    <div className="dest-card h-full flex flex-col">
      <div style={{ height: '220px', position: 'relative' }}>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          navigation={true}
          modules={[Navigation]}
          style={{ width: '100%', height: '100%' }}
        >
          {destination.images?.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`${destination.name} ${index + 1}`}
                style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
                loading="lazy"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/400x300?text=No+Image"; }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <span className="card-badge">{destination.category}</span>
      </div>

      <div className="card-body flex flex-col flex-grow">
        <h3 className="card-title">{destination.name}</h3>
        <p className="card-desc flex-grow">{destination.description}</p>

        <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          {destination.price !== undefined ? (
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--gold)', fontWeight: 400 }}>
              Ksh {destination.price.toLocaleString()}
            </span>
          ) : (
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--text-faint)' }}>Price N/A</span>
          )}
          <button className="btn-ghost" onClick={handleDetailsClick} style={{ padding: '8px 20px', fontSize: '0.65rem' }}>
            <span>Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;