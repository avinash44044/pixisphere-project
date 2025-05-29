import { useState, useEffect } from 'react';
import usePhotographerStore from '../store/photographerStore';
import { debounce } from 'lodash';

const Filters = () => {
  const { filters, setFilters, fetchPhotographers } = usePhotographerStore();
  const [search, setSearch] = useState(filters.search);
  const cities = ['Bengaluru', 'Delhi', 'Mumbai', 'Hyderabad'];
  const styles = ['Outdoor', 'Studio', 'Candid', 'Traditional', 'Indoor'];

  const debouncedFetch = debounce(() => {
    fetchPhotographers({ ...filters, search }, 1);
  }, 500);

  useEffect(() => {
    debouncedFetch();
    return () => debouncedFetch.cancel();
  }, [search]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    fetchPhotographers({ ...filters, ...newFilters }, 1);
  };

  const handleStyleChange = (style) => {
    const newStyles = filters.styles.includes(style)
      ? filters.styles.filter((s) => s !== style)
      : [...filters.styles, style];
    handleFilterChange({ styles: newStyles });
  };

  return (
    <div className="filters">
      <h2>Filters</h2>
      <input
        type="text"
        placeholder="Search by name, location, or tag"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        value={filters.city}
        onChange={(e) => handleFilterChange({ city: e.target.value })}
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
      <div>
        <label>Price Range</label>
        <input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e) => handleFilterChange({ minPrice: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) => handleFilterChange({ maxPrice: e.target.value })}
        />
      </div>
      <div>
        <label>Rating</label>
        <select
          value={filters.rating}
          onChange={(e) => handleFilterChange({ rating: e.target.value })}
        >
          <option value="">Any</option>
          <option value="4">4+</option>
          <option value="3">3+</option>
        </select>
      </div>
      <div>
        <label>Styles</label>
        {styles.map((style) => (
          <div key={style}>
            <input
              type="checkbox"
              id={`style-${style}`}
              checked={filters.styles.includes(style)}
              onChange={() => handleStyleChange(style)}
            />
            <label htmlFor={`style-${style}`}>{style}</label>
          </div>
        ))}
      </div>
      <select
        value={filters.sort}
        onChange={(e) => handleFilterChange({ sort: e.target.value })}
      >
        <option value="">Sort By</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="ratingDesc">Rating: High to Low</option>
        <option value="recent">Recently Added</option>
      </select>
    </div>
  );
};

export default Filters;