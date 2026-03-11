import { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { Link, useNavigate } from 'react-router-dom';

const CATEGORIES = ["Beach", "Mountain", "City", "Adventure", "Cultural", "Other"];
const ORIGINAL_IDS = [1, 2, 3, 4, 5, 6];

const MyTrip = () => {
  const { tripItems, removeDestination, clearTrip, addDestination } = useTrip();
  const navigate = useNavigate();

  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState(CATEGORIES[0]);
  const [formDescription, setFormDescription] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess('');

    if (!formName.trim() || !formDescription.trim()) {
      setFormError('Please fill in all required fields.');
      return;
    }

    const newDestination = {
      id: Date.now(),
      name: formName.trim(),
      category: formCategory,
      description: formDescription.trim(),
      images: formImageUrl.trim() ? [formImageUrl.trim()] : [],
    };

    addDestination(newDestination);
    setFormSuccess(`"${newDestination.name}" has been added to your trip.`);
    setFormName('');
    setFormCategory(CATEGORIES[0]);
    setFormDescription('');
    setFormImageUrl('');
  };

  return (
    <div className="page-wrap" style={{ minHeight: '100vh' }}>

      <section className="mb-20">
        <div className="flex items-center justify-between mb-10" style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '20px' }}>
          <div>
            <p className="label-caps" style={{ marginBottom: '10px' }}>Your Itinerary</p>
            <h1 className="section-title">My <em>Saved Trip</em></h1>
          </div>
          {tripItems.length > 0 && (
            <button className="btn-danger" onClick={clearTrip}>Clear Trip</button>
          )}
        </div>

        {tripItems.length === 0 ? (
          <div className="empty-state">
            <p className="body-text" style={{ marginBottom: '24px' }}>Your trip itinerary is empty. Start adding destinations to plan your adventure.</p>
            <button className="btn-ghost" onClick={() => navigate('/explore')}>
              <span>Explore Destinations</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {tripItems.map((item) => {
              const isOriginal = ORIGINAL_IDS.includes(item.id);

              return (
                <div key={item.id} className="trip-card">
                  <div className="card-img" style={{ height: '200px' }}>
                    <img
                      src={item.images?.[0] || 'https://via.placeholder.com/300x200?text=No+Image'}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'; }}
                    />
                  </div>
                  <div className="card-body">
                    {item.category && (
                      <p className="label-caps" style={{ marginBottom: '6px', fontSize: '0.6rem' }}>{item.category}</p>
                    )}
                    <h3 className="card-title" style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{item.name}</h3>

                    {item.description && (
                      <p className="card-desc" style={{ marginBottom: '16px', WebkitLineClamp: isOriginal ? 2 : 'unset', overflow: isOriginal ? 'hidden' : 'visible' }}>
                        {item.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      {isOriginal ? (
                        <Link to={`/destination/${item.id}`} className="card-link">View Details</Link>
                      ) : (
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', color: 'var(--text-faint)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                          Custom
                        </span>
                      )}
                      <button
                        className="btn-danger"
                        style={{ padding: '6px 14px', fontSize: '0.65rem' }}
                        onClick={() => removeDestination(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <div style={{ height: '1px', background: 'var(--border-subtle)', marginBottom: '72px' }} />

      <section style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div className="text-center mb-10">
          <p className="label-caps" style={{ marginBottom: '12px' }}>Contribute</p>
          <h2 className="section-title">Add a <em>Destination</em></h2>
        </div>

        <form onSubmit={handleFormSubmit} className="form-surface flex flex-col gap-6">
          <div>
            <label className="form-label">Destination Name <span style={{ color: 'rgb(220,80,80)' }}>*</span></label>
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="form-input"
              placeholder="e.g., Santorini"
              required
            />
          </div>

          <div>
            <label className="form-label">Category <span style={{ color: 'rgb(220,80,80)' }}>*</span></label>
            <select value={formCategory} onChange={(e) => setFormCategory(e.target.value)} className="form-select">
              {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div>
            <label className="form-label">Description <span style={{ color: 'rgb(220,80,80)' }}>*</span></label>
            <textarea
              rows="4"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              className="form-input"
              placeholder="Describe the destination..."
              style={{ resize: 'vertical' }}
              required
            />
          </div>

          <div>
            <label className="form-label">Image URL <span style={{ color: 'var(--text-faint)' }}>(optional)</span></label>
            <input
              type="url"
              value={formImageUrl}
              onChange={(e) => setFormImageUrl(e.target.value)}
              className="form-input"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {formError && <div className="banner-error">{formError}</div>}
          {formSuccess && <div className="banner-success">{formSuccess}</div>}

          <button type="submit" className="btn-primary" style={{ width: '100%' }}>
            Add to Trip
          </button>
        </form>
      </section>
    </div>
  );
};

export default MyTrip;