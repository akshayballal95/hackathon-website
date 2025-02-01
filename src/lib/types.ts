export interface Category {
  id: string;
  title: string;
  icon: string;
  description: string;
  subcategories?: { id: string; title: string }[];
}

// New
export interface Resource { 
  id: string;
  _type: string;
  name: string;
  email?: string;
  website?: string; 
  _id: string;
  phoneNumbers?: {
    number: string;
  }[];
  address?: {
    street?: string;
  };
  needToKnow?: string;
  description: string;
  logo?: string;
  source: string;
  _updatedAt: Date;
  emergencyContacts?: string[];

  operatingHours?: {
    label: string;
    hours: string;
  }[];
  requirements?: string;

}
// End

export interface EmergencyContact {
  name: string;
  number: string;
  whatsapp?: boolean;
  description: string;
}