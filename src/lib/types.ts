export interface Room {
  id: string;
  name: string;
  type: 'poolvilla' | 'new';
  base_price: number;
  weekend_price: number;
  peak_price: number;
  max_guests: number;
  description: string;
  images: string[];
  features: {
    pool?: boolean;
    bbq?: boolean;
    garden?: boolean;
  };
  created_at?: string;
}

export interface Reservation {
  id?: string;
  room_id: string;
  guest_name: string;
  guest_phone: string;
  check_in_date: string; // YYYY-MM-DD
  check_out_date: string; // YYYY-MM-DD
  total_price: number;
  status?: 'pending' | 'confirmed' | 'cancelled';
  portone_imp_uid?: string;
  created_at?: string;
}
