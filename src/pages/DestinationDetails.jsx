import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestination = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3000/destinations/${id}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setDestination(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-blue-500">
        Loading destination details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 p-4 text-center">
        Error loading destination: {error}
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Destination not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors text-sm md:text-base font-medium"
        >
          ← Back
        </button>

        {/* Hero Section */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          {destination.name}
        </h1>
        <p className="text-gray-700 mb-10 text-lg md:text-xl">
          {destination.description}
        </p>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destination.images.map((img, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-2xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={img}
                alt={`${destination.name} ${idx + 1}`}
                className="w-full h-64 object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;
