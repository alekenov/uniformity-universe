
import React from 'react';

interface StoreHeaderProps {
  storeName?: string;
  status?: string;
}

const StoreHeader: React.FC<StoreHeaderProps> = ({ storeName, status = "Открыто" }) => {
  // Return null to completely remove the header
  return null;
};

export default StoreHeader;
