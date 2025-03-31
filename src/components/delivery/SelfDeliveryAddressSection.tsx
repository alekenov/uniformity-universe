
import React from 'react';
import { Separator } from '../ui/separator';
import DeliveryAddress from './DeliveryAddress';

interface SelfDeliveryAddressSectionProps {
  address: string;
  setAddress: (value: string) => void;
  apartment: string;
  setApartment: (value: string) => void;
  floor: string;
  setFloor: (value: string) => void;
  comment: string;
  setComment: (value: string) => void;
  showCourierComment: boolean;
  toggleCourierComment: () => void;
}

const SelfDeliveryAddressSection: React.FC<SelfDeliveryAddressSectionProps> = ({
  address,
  setAddress,
  apartment,
  setApartment,
  floor,
  setFloor,
  comment,
  setComment,
  showCourierComment,
  toggleCourierComment,
}) => {
  return (
    <>
      <Separator className="bg-gray-100" />
      
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <label className="text-sm font-medium">Адрес доставки</label>
          <div className="form-hint">Доставим по указанному адресу</div>
        </div>
        
        <DeliveryAddress
          address={address}
          setAddress={setAddress}
          apartment={apartment}
          setApartment={setApartment}
          floor={floor}
          setFloor={setFloor}
          courierComment={comment}
          setCourierComment={setComment}
          askRecipientForAddress={false}
          setAskRecipientForAddress={() => {}} // No-op function
          showCourierComment={showCourierComment}
          toggleCourierComment={toggleCourierComment}
          isSelfDelivery={true} // Set to true for self-delivery
        />
      </div>
    </>
  );
};

export default SelfDeliveryAddressSection;
