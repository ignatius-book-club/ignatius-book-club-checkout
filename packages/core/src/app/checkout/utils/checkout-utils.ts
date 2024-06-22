export const ibcUrl =
  process.env.NODE_ENV === 'development'
    ? 'https://localhost:3002/checkout?edit=billing'
    : 'https://www.ignatiusbookfairs.com/checkout?edit=billing';
