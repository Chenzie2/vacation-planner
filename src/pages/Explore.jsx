import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import DestinationCard from "../components/DestinationCard";
import destinationData from "../data/destinationData";

const Explore = () => {
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name-asc");
  const [categories, setCategories] = useState(["All"]);

  const sortOptions = [
    { value: "name-asc", label: "Name (A-Z)" },
    { value: "name-desc", label: "Name (Z-A)" },
  ];

  useEffect(() => {
    const uniqueCategories = ["All", ...new Set(destinationData.map((d) => d.category))];
    setCategories(uniqueCategories);
  }, []);

  const filteredDestinations = destinationData
    .filter((d) => category === "All" || d.category === category)
    .filter((d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "name-asc") return a.name.localeCompare(b.name);
      if (sortOption === "name-desc") return b.name.localeCompare(a.name);
      return 0;
    });

  return (
    <main className="page-wrap">
      <div className="text-center mb-14">
        <p className="label-caps" style={{ marginBottom: '16px' }}>Browse</p>
        <h1 className="page-title" style={{ marginBottom: '20px' }}>
          Explore <em>Destinations</em>
        </h1>
        <div className="gold-divider" />
      </div>

      <div className="filter-bar mb-10">
        <div className="flex flex-wrap justify-center gap-2 mb-5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`filter-pill${category === cat ? ' active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="search-wrap w-full md:flex-1">
            <Search size={16} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search destinations..."
              className="search-input"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Filter size={15} style={{ color: 'var(--text-faint)', flexShrink: 0 }} />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="form-select"
              style={{ width: 'auto', minWidth: '180px' }}
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>Sort: {opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredDestinations.length === 0 ? (
        <div className="empty-state">
          <p className="body-text">No destinations match your filters. Try adjusting your search or category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Explore;