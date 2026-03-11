import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import destinationData from '../data/destinationData';

export default function HomePage() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const v = visible ? 'visible' : '';

  return (
    <div style={{ background: 'var(--bg-base)', minHeight: '100vh' }}>

      {/* Hero */}
      <div className="relative flex items-center justify-center overflow-hidden" style={{ height: '100vh' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1428 40%, #0d1a2e 100%)' }} />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(210,185,140,0.06) 0%, transparent 60%),
                            radial-gradient(ellipse at 80% 20%, rgba(100,130,200,0.08) 0%, transparent 50%)`,
        }} />

        <div className="relative z-10 text-center px-6" style={{ maxWidth: '800px' }}>
          <p className={`hero-text d1 label-caps ${v}`} style={{ marginBottom: '28px' }}>
            Curated Travel Experiences
          </p>
          <h1 className={`hero-text d2 ${v}`} style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', fontWeight: 300, lineHeight: 1.05, marginBottom: '6px' }}>
            Dream.
          </h1>
          <h1 className={`hero-text d2 ${v}`} style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', fontWeight: 300, lineHeight: 1.05, fontStyle: 'italic', color: 'var(--gold)', marginBottom: '32px' }}>
            Explore. Arrive.
          </h1>
          <p className={`hero-text d3 body-text ${v}`} style={{ fontSize: '1.05rem', marginBottom: '48px', maxWidth: '520px', margin: '0 auto 48px' }}>
            Discover destinations that move you. Handpicked journeys for the discerning traveler.
          </p>
          <div className={`hero-text d4 ${v}`}>
            <button className="btn-ghost" onClick={() => navigate('/explore')}>
              <span>Explore Destinations</span>
            </button>
          </div>
        </div>

        <div className="absolute flex flex-col items-center gap-2" style={{ bottom: '40px', left: '50%', transform: 'translateX(-50%)', opacity: 0.35 }}>
          <span className="label-caps" style={{ fontSize: '0.6rem' }}>Scroll</span>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(180deg, var(--gold), transparent)' }} />
        </div>
      </div>

      {/* Featured Destinations */}
      <section className="page-wrap">
        <div className="text-center mb-16">
          <p className="label-caps" style={{ marginBottom: '16px' }}>Handpicked for You</p>
          <h2 className="page-title" style={{ marginBottom: '20px' }}>
            Featured <em>Destinations</em>
          </h2>
          <div className="gold-divider" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {destinationData.map((destination) => (
            <div key={destination.id} className="dest-card" onClick={() => navigate(`/destination/${destination.id}`)}>
              <div className="card-img" style={{ height: '260px' }}>
                <img src={destination.images[0]} alt={destination.name} />
                <div className="card-img-overlay" />
                <span className="card-badge">{destination.category}</span>
              </div>
              <div className="card-body">
                <h3 className="card-title">{destination.name}</h3>
                <p className="card-desc">{destination.description}</p>
                <span className="card-link">View Details</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="text-center mb-16">
            <p className="label-caps" style={{ marginBottom: '16px' }}>Why Travel Explorer</p>
            <h2 className="section-title">Travel with <em>confidence</em></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '2px' }}>
            {[
              { num: '01', title: 'Curated Destinations', desc: 'Handpicked locations chosen for their beauty, culture, and unique character.' },
              { num: '02', title: 'Seamless Planning', desc: 'Build and manage your perfect itinerary with an intuitive, effortless experience.' },
              { num: '03', title: 'Trusted Guidance', desc: 'Reliable recommendations from travelers who know these destinations deeply.' },
            ].map((item) => (
              <div key={item.num} className="feature-card" style={{ padding: '48px 36px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', transition: 'background 0.3s ease, border-color 0.3s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(210,185,140,0.05)'; e.currentTarget.style.borderColor = 'var(--border-gold)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
              >
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 300, color: 'var(--gold-dim)', marginBottom: '20px' }}>{item.num}</div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 400, marginBottom: '12px' }}>{item.title}</h3>
                <p className="body-text">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}