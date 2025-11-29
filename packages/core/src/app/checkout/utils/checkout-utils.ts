export const IBF_URL =
  process.env.NODE_ENV === 'development'
    ? 'https://localhost:3002'
    : window.location.hostname.includes("staging")
      ? 'https://staging.store.ignatiusbookfairs.com'
      : 'https://store.ignatiusbookfairs.com';
