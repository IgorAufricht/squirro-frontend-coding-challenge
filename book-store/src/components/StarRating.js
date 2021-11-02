import { useState } from 'react';

import './StarRating.scss';

// Borrowed from https://dev.to/michaelburrows/create-a-custom-react-star-rating-component-5o6
function StarRating(props) {
  const rating = props.rating;
  const onChange = props.onChange;

  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? 'on' : 'off'}
            onClick={() => onChange(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
}

export default StarRating;
