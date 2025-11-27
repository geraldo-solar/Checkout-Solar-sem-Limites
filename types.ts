export interface CustomerData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  state: string;
  email: string;
  phone: string;
  cpf: string;
  comments?: string;
  
  quantity: number; // Added quantity

  paymentMethod: 'credit_card' | 'pix';
  installments?: string;
  cardNumber?: string;
  cardHolder?: string;
  cardExpiryMonth?: string;
  cardExpiryYear?: string;
  cardCvv?: string;
}

export interface OrderState {
  status: 'idle' | 'processing' | 'success' | 'error';
  message?: string;
}

export enum Step {
  FORM = 'FORM',
  CONFIRMATION = 'CONFIRMATION'
}