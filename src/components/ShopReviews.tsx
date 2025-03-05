
import React from 'react';
import { Star, MessageCircle } from 'lucide-react';

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
  if (reviews.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        Отзывов пока нет
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {reviews.map((review) => (
        <div key={review.id} className="bg-[#F8F8F8] rounded-md p-3">
          <div className="flex justify-between items-start mb-1">
            <div>
              <div className="font-medium text-sm">{review.author}</div>
              <div className="text-xs text-gray-500">{review.date}</div>
            </div>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star 
                  key={idx} 
                  size={12} 
                  className={idx < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-700">{review.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ShopReviews;
