import { useParams, useNavigate } from "react-router-dom";
import destinationData from "../data/destinationData";

const DestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const destination = destinationData.find((dest) => dest.id === Number(id));

  if (!destination) {
    return (
      <div className="page-wrap flex items-center justify-center" style={{ minHeight: '100vh' }}>
        <div className="empty-state">
          <p className="body-text">Destination not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrap" style={{ minHeight: '100vh' }}>
      <button className="btn-back mb-10" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <p className="label-caps" style={{ marginBottom: '12px' }}>{destination.category}</p>
      <h1 className="page-title" style={{ marginBottom: '16px' }}>{destination.name}</h1>
      <p className="body-text" style={{ maxWidth: '680px', marginBottom: '56px', fontSize: '1rem' }}>
        {destination.description}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {destination.images.map((img, idx) => (
          <div key={idx} className="dest-card" style={{ cursor: 'default' }}>
            <div className="card-img" style={{ height: '260px' }}>
              <img
                src={img}
                alt={`${destination.name} ${idx + 1}`}
                loading="lazy"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/400x300?text=No+Image"; }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationDetails;