import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import usePhotographerStore from '../store/photographerStore';
import InquiryModal from './InquiryModal';

const PhotographerProfile = () => {
  const { id } = useParams();
  const { fetchPhotographerById, loading } = usePhotographerStore();
  const [photographer, setPhotographer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadPhotographer = async () => {
      const data = await fetchPhotographerById(id);
      setPhotographer(data);
    };
    loadPhotographer();
  }, [id, fetchPhotographerById]);

  if (loading || !photographer) return <p>Loading...</p>;

  return (
    <div className="profile">
      <img src={photographer.profilePic} alt={photographer.name} className="profile-pic" />
      <h2>{photographer.name}</h2>
      <p>{photographer.location}</p>
      <p className="price">Starting at ₹{photographer.price}</p>
      <p className="rating">Rating: {photographer.rating} ★</p>
      <p className="bio">{photographer.bio}</p>
      <div className="styles">
        {photographer.styles.map((style) => (
          <span key={style} className="style">{style}</span>
        ))}
      </div>
      <div className="tags">
        {photographer.tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
      <div className="portfolio">
        <h3>Portfolio</h3>
        <div className="portfolio-grid">
          {photographer.portfolio.map((image, index) => (
            <img key={index} src={image} alt="Portfolio" />
          ))}
        </div>
      </div>
      <div className="reviews">
        <h3>Reviews</h3>
        {photographer.reviews.map((review, index) => (
          <div key={index} className="review">
            <p><strong>{review.name}</strong> - {review.rating} ★</p>
            <p>{review.comment}</p>
            <p>{review.date}</p>
          </div>
        ))}
      </div>
      <button onClick={() => setIsModalOpen(true)}>Send Inquiry</button>
      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        photographerName={photographer.name}
      />
    </div>
  );
};

export default PhotographerProfile;