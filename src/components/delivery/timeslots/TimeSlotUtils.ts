
import { TimeSlotData } from './TimeSlot';

// Generate time slots for delivery
export const generateDeliveryTimeSlots = (): TimeSlotData[] => {
  return [
    { id: "12-30", label: "12:30", isNearest: true },
    { id: "12-15", label: "12–15", isNearest: false },
    { id: "15-18", label: "15–18", isNearest: false }
  ];
};

// Generate time slots for pickup
export const generatePickupHourSlots = (): TimeSlotData[] => {
  return [
    { id: "12:00", label: "12:00", isNearest: true },
    { id: "13:00", label: "13:00", isNearest: false },
    { id: "14:00", label: "14:00", isNearest: false },
    { id: "15:00", label: "15:00", isNearest: false },
    { id: "16:00", label: "16:00", isNearest: false },
    { id: "17:00", label: "17:00", isNearest: false },
    { id: "18:00", label: "18:00", isNearest: false },
    { id: "19:00", label: "19:00", isNearest: false }
  ];
};
