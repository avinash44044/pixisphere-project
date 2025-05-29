import { Routes, Route } from 'react-router-dom';
import CategoryListing from './components/CategoryListing.jsx';
import PhotographerProfile from './components/PhotographerProfile.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CategoryListing />} />
      <Route path="/photographer/:id" element={<PhotographerProfile />} />
    </Routes>
  );
}

export default App;