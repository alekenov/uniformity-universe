
import React from 'react';
import { Link } from 'react-router-dom';
import { Flower } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FlowerShopLinkProps {
  className?: string;
  children?: React.ReactNode;
  iconOnly?: boolean;
}

const FlowerShopLink: React.FC<FlowerShopLinkProps> = ({ 
  className, 
  children = "Цветочный магазин",
  iconOnly = false
}) => {
  return (
    <Link 
      to="/flower-shop" 
      className={cn(
        "inline-flex items-center gap-2 text-gray-800 hover:text-primary transition-colors", 
        className
      )}
    >
      <Flower size={iconOnly ? 20 : 16} />
      {!iconOnly && <span>{children}</span>}
    </Link>
  );
};

export default FlowerShopLink;
