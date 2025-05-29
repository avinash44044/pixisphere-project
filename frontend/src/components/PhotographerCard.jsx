import { useNavigate } from 'react-router-dom';

const PhotographerCard = ({ photographer }) => {
  const navigate = useNavigate();

  return (
    <div className="card">
      <img src={photographer.profilePic} alt={photographer.name} />
      <h3>{photographer.name}</h3>
      <p>{photographer.location}</p>
      <p className="price">Starting at ₹{photographer.price}</p>
      <p className="rating">Rating: {photographer.rating} ★</p>
      <div className="tags">
        {photographer.tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
      <button onClick={() => navigate(`/photographer/${photographer.id}`)}>
        View Profile
      </button>
    </div>
  );
};

export default PhotographerCard;