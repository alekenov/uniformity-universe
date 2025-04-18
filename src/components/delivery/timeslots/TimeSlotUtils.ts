
import { TimeSlotData } from './TimeSlot';

// Helper function to get the next available time slot
const getNextAvailableTime = (): string => {
  const now = new Date();
  const minutes = now.getMinutes();
  // Round up to the next 30 minute interval
  const nextSlot = minutes <= 30 ? 30 : 60;
  const nextTime = new Date(now);
  nextTime.setMinutes(nextSlot);
  nextTime.setSeconds(0);
  return `${String(nextTime.getHours()).padStart(2, '0')}:${String(nextTime.getMinutes()).padStart(2, '0')}`;
};

// Generate time slots for delivery
export const generateDeliveryTimeSlots = (): TimeSlotData[] => {
  const nearestTime = getNextAvailableTime();
  
  return [
    { id: nearestTime, label: nearestTime, isNearest: true },
    { id: "12-15", label: "12–15", isNearest: false },
    { id: "15-18", label: "15–18", isNearest: false }
  ];
};

// Generate time slots for pickup
export const generatePickupTimeSlots = (): TimeSlotData[] => {
  const nearestTime = getNextAvailableTime();
  const pickupTime = new Date();
  pickupTime.setMinutes(pickupTime.getMinutes() + 30); // Pickup available in 30 minutes
  
  const nearestPickup = `${String(pickupTime.getHours()).padStart(2, '0')}:${String(pickupTime.getMinutes()).padStart(2, '0')}`;
  
  return [
    { id: nearestPickup, label: nearestPickup, isNearest: true },
    { id: "12-15", label: "12–15", isNearest: false },
    { id: "15-18", label: "15–18", isNearest: false }
  ];
};

// Generate hourly time slots for pickup
export const generatePickupHourSlots = (): TimeSlotData[] => {
  const now = new Date();
  const slots: TimeSlotData[] = [];
  const currentHour = now.getHours();
  
  // Generate slots for the next 8 hours from current time
  for (let i = 0; i < 8; i++) {
    const hour = (currentHour + i) % 24;
    const timeString = `${String(hour).padStart(2, '0')}:00`;
    slots.push({
      id: timeString,
      label: timeString,
      isNearest: i === 0
    });
  }
  
  return slots;
};
