import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [allDestinations, setAllDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllDestinations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:3000/destinations");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllDestinations(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllDestinations();
  }, []);

  const featuredDestinations = allDestinations;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center relative z-10">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 drop-shadow-lg animate-fade-in">
            Welcome to Travel Explorer
          </h1>
          <p className="text-xl sm:text-2xl text-gray-100 mb-8 drop-shadow-md animate-fade-in delay-200">
            Discover your next adventure.
          </p>
          <button
            onClick={() => navigate("/explore")}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-lg shadow-xl transform hover:scale-105 transition duration-300 animate-fade-in delay-400"
          >
            Explore Destinations
          </button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 via-transparent to-indigo-900 opacity-30 pointer-events-none"></div>
      </div>

      {/* Featured Destinations */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              Featured Destinations
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore some of our most popular and breathtaking locations around the globe.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-600 bg-red-100 p-6 rounded-xl shadow-md">
              Error loading destinations: {error} <br />
              Please ensure the JSON server is running.
            </div>
          ) : featuredDestinations.length === 0 ? (
            <p className="text-center text-gray-500">No featured destinations available at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {featuredDestinations.map(destination => (
                <div
                  key={destination.id}
                  className="relative bg-white rounded-2xl shadow-2xl overflow-hidden cursor-pointer transform transition duration-500 hover:scale-105 hover:shadow-2xl"
                  onClick={() => navigate(`/destination/${destination.id}`)}
                >
                  <div className="relative h-64">
                    <img
                      src={destination.images[0]}
                      alt={destination.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{destination.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{destination.description}</p>
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                      {destination.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-50 to-blue-50 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Why Choose Travel Explorer?</h2>
        <p className="text-gray-700 max-w-3xl mx-auto mb-8">
          Curated destinations, real-time availability, and a seamless booking experience for your dream vacations.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg w-64 transform hover:-translate-y-2 transition duration-300">
            <h3 className="font-semibold text-lg mb-2">Curated Destinations</h3>
            <p className="text-gray-600 text-sm">Handpicked locations to ensure your experience is unforgettable.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg w-64 transform hover:-translate-y-2 transition duration-300">
            <h3 className="font-semibold text-lg mb-2">Seamless Booking</h3>
            <p className="text-gray-600 text-sm">Easy booking system with real-time availability checks.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg w-64 transform hover:-translate-y-2 transition duration-300">
            <h3 className="font-semibold text-lg mb-2">Trusted Experience</h3>
            <p className="text-gray-600 text-sm">Reliable travel guidance and recommendations for peace of mind.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
