import { create } from 'zustand';
import axios from 'axios';

const usePhotographerStore = create((set) => ({
  photographers: [],
  total: 0,
  loading: false,
  page: 1,
  filters: { search: '', city: '', minPrice: '', maxPrice: '', rating: '', styles: [], sort: '' },
  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters },
  })),
  fetchPhotographers: async (filters, page = 1) => {
    set({ loading: true });
    try {
      const params = {
        ...filters,
        styles: filters.styles.join(','), // Convert styles array to comma-separated string
        page,
        limit: 10,
      };
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/photographers`, { params });
      set((state) => ({
        photographers: page === 1 ? response.data.photographers : [...state.photographers, ...response.data.photographers],
        total: response.data.total,
        page,
        loading: false,
      }));
    } catch (error) {
      console.error('Error fetching photographers:', error);
      set({ loading: false });
    }
  },
  fetchPhotographerById: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/photographers/${id}`);
      set({ loading: false });
      return response.data;
    } catch (error) {
      console.error('Error fetching photographer:', error);
      set({ loading: false });
      return null;
    }
  },
}));

export default usePhotographerStore;