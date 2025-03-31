
import { PickupLocation } from './PickupLocationItem';

export const isStoreOpen = (location: PickupLocation, hour: string) => {
  // Convert times to comparable numbers (e.g., "13:00" -> 1300)
  const timeToNumber = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 100 + minutes;
  };

  const selectedTimeNum = timeToNumber(hour);
  const openTimeNum = timeToNumber(location.openTime);
  const closeTimeNum = timeToNumber(location.closingTime);

  return selectedTimeNum >= openTimeNum && selectedTimeNum <= closeTimeNum;
};
