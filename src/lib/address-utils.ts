
export interface Address {
  street: string;
  city: string;
  region?: string;
  postalCode?: string;
}

/**
 * Formats an address object into a display string
 */
export function formatAddress(address: Address): string {
  const parts = [
    address.street,
    address.city,
    address.region,
    address.postalCode
  ].filter(Boolean);
  
  return parts.join(', ');
}

/**
 * Validates an address object
 */
export function isValidAddress(address: Address): boolean {
  return Boolean(address.street && address.city);
}
