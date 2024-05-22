export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

export type HotelType = {
  _id: string;
  userId: string; // ID of the hotel owner
  sellerName: string; // Name of the seller
  sellerEmail: string; // Email of the seller
  sellerPhoneNumber: string; // Phone number of the seller
  sellerAddress: string; // Address of the seller
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  //furnishable: string; // Ensure this matches the form
  //area: number;
  //available: string;
  //bedrooms: string;
  //bathrooms: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerMonth: number;
  pricePerNight:number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
  bookings: BookingType[];
};

export type BookingType = {
  _id: string;
  userId: string; // ID of the user who made the booking
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalcost: number;
};

export type HotelSearchResponse = {
  data: HotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type PaymentIntentResponse = {
  paymentIntentId: string;
  clientSecret: string;
  totalcost: number;
};
// Path: app/backend/src/routes/auth.ts