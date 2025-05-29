import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import usePhotographerStore from '../store/photographerStore';
import PhotographerCard from './PhotographerCard';
import Filters from './Filters';

const CategoryListing = () => {
  const { photographers, total, page, loading, filters, fetchPhotographers } = usePhotographerStore();
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchPhotographers(filters, 1);
  }, []);

  return (
    <div className={`container ${showFilters ? 'filters-open' : ''}`}>
      <div className="filter-toggle">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="filter-button"
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>
      <div className={`filters-container ${showFilters ? 'show' : 'hide'}`}>
        {showFilters && <Filters />}
      </div>
      <div className="listing">
        <h1>Maternity Photographers</h1>
        <InfiniteScroll
          dataLength={photographers.length}
          next={() => fetchPhotographers(filters, page + 1)}
          hasMore={photographers.length < total}
          loader={<h4>Loading...</h4>}
        >
          <div className="grid">
            {photographers.map((photographer) => (
              <PhotographerCard key={photographer.id} photographer={photographer} />
            ))}
          </div>
        </InfiniteScroll>
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default CategoryListing;