import React from 'react';
import StarRatings from 'react-star-ratings';

const Stars: React.FC = () => {
  const changeRating = (newRating: number) => {
    console.log(newRating);
  };

  return (
    <StarRatings
      rating={3.5}
      starRatedColor="gold"
      changeRating={changeRating}
      numberOfStars={5}
      name="rating"
      starDimension="20px"
      starSpacing="5px"
    />
  );
};

export default Stars;