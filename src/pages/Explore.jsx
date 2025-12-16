import React, { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DestinationCard from "../components/DestinationCard";

const Explore = () => {
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name-asc");
  const [destinationData, setDestinationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(["All"]);
  const navigate = useNavigate();

  const sortOptions = [
    { value: "name-asc", label: "Name (A–Z)" },
    { value: "name-desc", label: "Name (Z–A)" },
  ];

  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:3000/destinations");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setDestinationData(data);

        const uniqueCategories = ["All", ...new Set(data.map(dest => dest.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const filteredDestinations = destinationData
    .filter(dest => category === "All" || dest.category === category)
    .filter(dest =>
      dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl text-blue-500">Loading destinations...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-xl text-red-500 p-4 text-center">Error loading destinations: {error}</div>;

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-4">Explore Dream Destinations</h1>
        <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto">Find your perfect getaway. Filter by category, search by name, and sort your results.</p>

        <div className="bg-white p-4 rounded-lg shadow mb-8 sticky top-0 z-10">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category:</label>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition duration-200 ${
                    category === cat ? "bg-blue-600 text-white shadow-md" : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search destinations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter size={18} className="text-gray-500" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    Sort by: {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {filteredDestinations.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">No destinations match your current filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Explore;
