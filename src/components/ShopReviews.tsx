
import React from 'react';

interface Review {
  id: number;
  author: string;
  date: string;
  text: string;
  rating: number;
}

interface ShopReviewsProps {
  shopId: number;
  reviews: Review[];
}

const ShopReviews: React.FC<ShopReviewsProps> = ({ shopId, reviews }) => {
  // Component intentionally left empty
  return null;
};

export default ShopReviews;
